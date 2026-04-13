# serializers.py
from rest_framework import serializers
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings
from .models import (
    CustomUser,
    PerfilAlumno,
    PerfilProfesor,
    Colegios,
    PadronAlumnos,
    PadronProfesores,
    SolicitudAcceso,
    ProfesorGrados,
    ContactoMensaje,
)
from .services import ValidacionPadronService

User = get_user_model()


# ==================== SERIALIZERS DE MODELOS BASE ====================


class ColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegios
        fields = ["id_colegio", "nombre_colegio", "codigo_dane", "ubicacion_sede"]


# ==================== SERIALIZERS DE PERFILES ====================


class PerfilAlumnoSerializer(serializers.ModelSerializer):
    colegio = ColegioSerializer(source="id_colegio", read_only=True)
    nombre_completo = serializers.SerializerMethodField()

    class Meta:
        model = PerfilAlumno
        fields = [
            "tipo_doc",
            "nombre",
            "apellido1",
            "apellido2",
            "nombre_completo",
            "fecha_nacimiento",
            "fecha_expedicion",
            "departamento",
            "municipio",
            "telefono",
            "grado_actual",
            "anio_vigencia",
            "estado_alumno",
            "colegio",
        ]

    def get_nombre_completo(self, obj):
        nombre_completo = f"{obj.nombre} {obj.apellido1}"
        if obj.apellido2:
            nombre_completo += f" {obj.apellido2}"
        return nombre_completo


class PerfilProfesorSerializer(serializers.ModelSerializer):
    colegio = ColegioSerializer(source="id_colegio", read_only=True)
    nombre_completo = serializers.SerializerMethodField()
    grados = serializers.SerializerMethodField()

    class Meta:
        model = PerfilProfesor
        fields = [
            "tipo_doc",
            "nombres",
            "apellido1",
            "apellido2",
            "nombre_completo",
            "fecha_nacimiento",
            "fecha_expedicion",
            "telefono",
            "estado_acc_profe",
            "colegio",
            "grados",
        ]

    def get_nombre_completo(self, obj):
        nombre_completo = f"{obj.nombres} {obj.apellido1}"
        if obj.apellido2:
            nombre_completo += f" {obj.apellido2}"
        return nombre_completo

    def get_grados(self, obj):
        grados = ProfesorGrados.objects.filter(profesor=obj).values(
            "grado_asignado", "anio_lectivo"
        )
        return list(grados)


# ==================== SERIALIZERS DE USUARIO ====================


class UserSerializer(serializers.ModelSerializer):
    """Serializer básico del usuario"""

    perfil_alumno = PerfilAlumnoSerializer(read_only=True)
    perfil_profesor = PerfilProfesorSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "num_documento",
            "user_type",
            "is_active",
            "date_joined",
            "perfil_alumno",
            "perfil_profesor",
        ]
        read_only_fields = ["id", "date_joined"]


class UserDetailSerializer(serializers.ModelSerializer):
    """Serializer detallado del usuario con toda la información"""

    perfil = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "num_documento",
            "user_type",
            "is_active",
            "date_joined",
            "perfil",
        ]

    def get_perfil(self, obj):
        if obj.user_type == "alumno" and hasattr(obj, "perfil_alumno"):
            return PerfilAlumnoSerializer(obj.perfil_alumno).data
        elif obj.user_type == "profesor" and hasattr(obj, "perfil_profesor"):
            return PerfilProfesorSerializer(obj.perfil_profesor).data
        return None


# ==================== SERIALIZERS DE AUTENTICACIÓN ====================


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError(
                {"non_field_errors": "Email y contraseña son requeridos"}
            )

        user = User.objects.filter(email=email).first()

        if not user:
            # Usuario no existe → error genérico, sin revelar que el correo no está registrado
            raise serializers.ValidationError(
                {
                    "non_field_errors": "Correo o contraseña incorrectos",
                    "error_type": "email_not_found",  # Campo interno para el frontend
                }
            )

        if not user.check_password(password):
            # Contraseña incorrecta → error específico en el campo password
            raise serializers.ValidationError(
                {
                    "password": ["Contraseña incorrecta"],
                    "error_type": "password_incorrect",
                }
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {"non_field_errors": "Usuario inactivo", "error_type": "inactive"}
            )

        attrs["user"] = user
        return attrs


# ==================== SERIALIZERS DE SOLICITUD DE ACCESO ====================


class ValidarPadronSerializer(serializers.Serializer):
    """Serializer para validar si un usuario existe en el padrón"""

    tipo_usuario = serializers.ChoiceField(choices=["alumno", "profesor"])
    num_documento = serializers.CharField(max_length=20)
    tipo_doc = serializers.CharField(max_length=10)
    nombre_completo = serializers.CharField(max_length=255, required=False)

    def validate(self, attrs):
        tipo_usuario = attrs["tipo_usuario"]
        num_documento = attrs["num_documento"]
        tipo_doc = attrs["tipo_doc"]
        nombre_completo = attrs.get("nombre_completo")

        # Validar contra padrón
        if tipo_usuario == "alumno":
            existe, padron, errores = ValidacionPadronService.validar_alumno(
                num_documento, tipo_doc, nombre_completo
            )
        else:
            existe, padron, errores = ValidacionPadronService.validar_profesor(
                num_documento, tipo_doc, nombre_completo
            )

        if not existe:
            raise serializers.ValidationError({"padron": errores})

        # Verificar que no exista ya un usuario con este documento
        if User.objects.filter(num_documento=num_documento).exists():
            raise serializers.ValidationError(
                {"num_documento": "Ya existe un usuario registrado con este documento"}
            )

        attrs["padron"] = padron
        return attrs


class SolicitudAccesoAlumnoSerializer(serializers.Serializer):
    """Serializer para solicitud de acceso de alumno"""

    # Datos de autenticación
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirmar_password = serializers.CharField(write_only=True, min_length=8)

    # Datos del documento
    tipo_doc = serializers.ChoiceField(
        choices=[
            ("TI", "Tarjeta de Identidad"),
            ("CC", "Cédula de Ciudadanía"),
            ("CE", "Cédula de Extranjería"),
        ]
    )
    num_documento = serializers.CharField(max_length=20)

    # Datos personales
    nombre = serializers.CharField(max_length=100)
    apellido1 = serializers.CharField(max_length=100)
    apellido2 = serializers.CharField(max_length=100, required=False, allow_blank=True)
    fecha_nacimiento = serializers.DateField()
    fecha_expedicion = serializers.DateField()

    # Ubicación
    departamento = serializers.CharField(max_length=100)
    municipio = serializers.CharField(max_length=100)
    telefono = serializers.CharField(max_length=15, required=False, allow_blank=True)

    # Términos
    aceptar_terminos = serializers.BooleanField()

    def validate_aceptar_terminos(self, value):
        if not value:
            raise serializers.ValidationError("Debe aceptar los términos y condiciones")
        return value

    def validate(self, attrs):
        # Validar contraseñas
        if attrs["password"] != attrs["confirmar_password"]:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden"}
            )

        # Validar password
        validate_password(attrs["password"])

        # Verificar que el email no esté en uso
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"email": "Este correo electrónico ya está registrado"}
            )

        # Verificar que el documento no esté en uso
        if User.objects.filter(num_documento=attrs["num_documento"]).exists():
            raise serializers.ValidationError(
                {"num_documento": "Ya existe un usuario con este número de documento"}
            )

        # Construir nombre completo
        nombre_completo = f"{attrs['nombre']} {attrs['apellido1']}"
        if attrs.get("apellido2"):
            nombre_completo += f" {attrs['apellido2']}"

        # Validar contra padrón
        existe, padron, errores = ValidacionPadronService.validar_alumno(
            attrs["num_documento"], attrs["tipo_doc"], nombre_completo
        )

        if not existe:
            raise serializers.ValidationError({"padron": errores})

        attrs["padron"] = padron
        return attrs


class SolicitudAccesoProfesorSerializer(serializers.Serializer):
    """Serializer para solicitud de acceso de profesor"""

    # Datos de autenticación
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirmar_password = serializers.CharField(write_only=True, min_length=8)

    # Datos del documento
    tipo_doc = serializers.ChoiceField(
        choices=[
            ("CC", "Cédula de Ciudadanía"),
            ("CE", "Cédula de Extranjería"),
            ("PAS", "Pasaporte"),
        ]
    )
    num_documento = serializers.CharField(max_length=20)

    # Datos personales
    nombres = serializers.CharField(max_length=100)
    apellido1 = serializers.CharField(max_length=100)
    apellido2 = serializers.CharField(max_length=100, required=False, allow_blank=True)
    fecha_nacimiento = serializers.DateField()
    fecha_expedicion = serializers.DateField()
    telefono = serializers.CharField(max_length=15, required=False, allow_blank=True)

    # Términos
    aceptar_terminos = serializers.BooleanField()

    def validate_aceptar_terminos(self, value):
        if not value:
            raise serializers.ValidationError("Debe aceptar los términos y condiciones")
        return value

    def validate(self, attrs):
        # Validar contraseñas
        if attrs["password"] != attrs["confirmar_password"]:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden"}
            )

        # Validar password
        validate_password(attrs["password"])

        # Verificar email
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"email": "Este correo electrónico ya está registrado"}
            )

        # Verificar documento
        if User.objects.filter(num_documento=attrs["num_documento"]).exists():
            raise serializers.ValidationError(
                {"num_documento": "Ya existe un usuario con este número de documento"}
            )

        # Construir nombre completo
        nombre_completo = f"{attrs['nombres']} {attrs['apellido1']}"
        if attrs.get("apellido2"):
            nombre_completo += f" {attrs['apellido2']}"

        # Validar contra padrón
        existe, padron, errores = ValidacionPadronService.validar_profesor(
            attrs["num_documento"], attrs["tipo_doc"], nombre_completo
        )

        if not existe:
            raise serializers.ValidationError({"padron": errores})

        attrs["padron"] = padron
        return attrs


class SolicitudAccesoListSerializer(serializers.ModelSerializer):
    """Serializer para listar solicitudes de acceso"""

    tipo_usuario_display = serializers.CharField(
        source="get_tipo_usuario_display", read_only=True
    )
    estado_display = serializers.CharField(source="get_estado_display", read_only=True)

    class Meta:
        model = SolicitudAcceso
        fields = [
            "id",
            "tipo_usuario",
            "tipo_usuario_display",
            "num_documento",
            "tipo_doc",
            "email",
            "nombre_completo",
            "estado",
            "estado_display",
            "validado_contra_padron",
            "fecha_solicitud",
            "fecha_procesamiento",
        ]


class SolicitudAccesoDetailSerializer(serializers.ModelSerializer):
    """Serializer detallado de solicitud de acceso"""

    tipo_usuario_display = serializers.CharField(
        source="get_tipo_usuario_display", read_only=True
    )
    estado_display = serializers.CharField(source="get_estado_display", read_only=True)

    class Meta:
        model = SolicitudAcceso
        fields = "__all__"


class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactoMensaje
        fields = ["nombre_completo", "email", "asunto", "mensaje"]

    def create(self, validated_data):
        # 1. Guardar el registro en la base de datos
        contacto = ContactoMensaje.objects.create(**validated_data)

        # 2. Preparar los datos para la plantilla HTML
        # Asegúrate de que las llaves coincidan con {{ nombre }}, {{ email }}, etc. en tu HTML
        context = {
            "nombre": validated_data.get("nombre_completo"),
            "email": validated_data.get("email"),
            "asunto": validated_data.get("asunto"),
            "mensaje": validated_data.get("mensaje"),
        }

        # 3. Renderizar el HTML
        # IMPORTANTE: Usamos la ruta completa dentro de Auth/templates/
        try:
            html_content = render_to_string("emails/email_contacto.html", context)
            text_content = strip_tags(
                html_content
            )  # Versión de respaldo en texto plano

            # 4. Configurar el correo con soporte HTML
            subject = f"Nuevo contacto: {validated_data.get('asunto')}"
            from_email = settings.DEFAULT_FROM_EMAIL
            to_email = ["contactos@rutasdelsaber.com"]  # Tu correo de destino

            email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
            email.attach_alternative(html_content, "text/html")  # Inyecta el HTML

            # 5. Enviar
            email.send()

        except Exception as e:
            # Imprime el error en la consola de Docker para que puedas verlo
            print(f"❌ Error enviando el correo: {str(e)}")

        return contacto
