# views.py
import secrets
import string
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from .models import ( CustomUser, PerfilAlumno, PerfilProfesor, Colegios, PadronAlumnos, PadronProfesores, SolicitudAcceso )
from .serializers import ( UserSerializer, UserDetailSerializer, LoginSerializer, ValidarPadronSerializer, SolicitudAccesoAlumnoSerializer, SolicitudAccesoProfesorSerializer, SolicitudAccesoListSerializer, SolicitudAccesoDetailSerializer, PerfilAlumnoSerializer, PerfilProfesorSerializer, ColegioSerializer )
from .services import ValidacionPadronService
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

User = get_user_model()

# ==================== AUTENTICACIÓN ====================

class LoginView(generics.GenericAPIView):
    """
    Vista para login de usuarios
    POST /api/auth/login/
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        # Obtener datos del usuario
        user_serializer = UserDetailSerializer(user)
        
        return Response({
            'message': 'Login exitoso',
            'user': user_serializer.data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)


class LogoutView(generics.GenericAPIView):
    """
    Vista para logout
    POST /api/auth/logout/
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return Response({
                'message': 'Logout exitoso'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Token inválido'
            }, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(generics.RetrieveAPIView):
    """
    Vista para obtener el usuario actual
    GET /api/auth/me/
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer
    
    def get_object(self):
        return self.request.user


# ==================== VALIDACIÓN DE PADRÓN ====================

@api_view(['POST'])
@permission_classes([AllowAny])
def validar_padron(request):
    """
    Endpoint para validar si un usuario existe en el padrón
    POST /api/auth/validar-padron/
    """
    serializer = ValidarPadronSerializer(data=request.data)
    
    if serializer.is_valid():
        padron = serializer.validated_data['padron']
        tipo_usuario = serializer.validated_data['tipo_usuario']
        
        if tipo_usuario == 'alumno':
            return Response({
                'valido': True,
                'mensaje': 'Documento encontrado en el padrón',
                'datos': {
                    'nombre': padron.nombre_alumno,
                    'colegio': padron.id_colegio.nombre_colegio,
                    'grado': padron.grado_actual
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'valido': True,
                'mensaje': 'Documento encontrado en el padrón',
                'datos': {
                    'nombre': padron.nombre_completo,
                    'colegio': padron.id_colegio.nombre_colegio,
                }
            }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ==================== REGISTRO / SOLICITUDES DE ACCESO ====================

@api_view(['POST'])
@permission_classes([AllowAny])
def solicitar_acceso_alumno(request):
    """
    Endpoint para que un alumno solicite acceso
    POST /api/auth/registro/alumno/
    """
    serializer = SolicitudAccesoAlumnoSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        with transaction.atomic():
            data = serializer.validated_data
            padron = data['padron']

            try:
                validate_password(data['password'])
            except ValidationError as e:
                return Response({
                    'password': e.messages
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Crear usuario
            user = User.objects.create_user(
                email=data['email'],
                num_documento=data['num_documento'],
                user_type='alumno',
                password=data['password']
            )
            
            # Crear perfil de alumno
            perfil = PerfilAlumno.objects.create(
                user=user,
                tipo_doc=data['tipo_doc'],
                nombre=data['nombre'],
                apellido1=data['apellido1'],
                apellido2=data.get('apellido2', ''),
                fecha_nacimiento=data['fecha_nacimiento'],
                fecha_expedicion=data['fecha_expedicion'],
                departamento=data['departamento'],
                municipio=data['municipio'],
                telefono=data.get('telefono', ''),
                id_colegio=padron.id_colegio,
                grado_actual=padron.grado_actual,
                anio_vigencia=timezone.now().year,
                estado_alumno='activo',
                padron=padron
            )
            
            # Generar tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'Registro exitoso',
                'user': UserDetailSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
            
    except Exception as e:
        return Response({
            'error': f'Error al crear usuario: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def solicitar_acceso_profesor(request):
    """
    Endpoint para que un profesor solicite acceso
    POST /api/auth/registro/profesor/
    """
    serializer = SolicitudAccesoProfesorSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        with transaction.atomic():
            data = serializer.validated_data
            padron = data['padron']
            
            # Crear usuario
            user = User.objects.create_user(
                email=data['email'],
                num_documento=data['num_documento'],
                user_type='profesor',
                password=data['password']
            )
            
            # Crear perfil de profesor
            perfil = PerfilProfesor.objects.create(
                user=user,
                tipo_doc=data['tipo_doc'],
                nombres=data['nombres'],
                apellido1=data['apellido1'],
                apellido2=data.get('apellido2', ''),
                fecha_nacimiento=data['fecha_nacimiento'],
                fecha_expedicion=data['fecha_expedicion'],
                telefono=data.get('telefono', ''),
                id_colegio=padron.id_colegio,
                estado_acc_profe='activo',
                padron=padron
            )
            
            # Generar tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'Registro exitoso',
                'user': UserDetailSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
            
    except Exception as e:
        return Response({
            'error': f'Error al crear usuario: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ==================== GESTIÓN DE USUARIOS ====================

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para gestión de usuarios (solo lectura para usuarios normales)
    GET /api/users/
    GET /api/users/{id}/
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        # Administradores pueden ver todos
        if user.is_staff:
            return User.objects.all()
        
        # Usuarios normales solo se ven a sí mismos
        return User.objects.filter(id=user.id)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserDetailSerializer
        return UserSerializer
    
    @action(detail=False, methods=['get'])
    def perfil(self, request):
        """
        Endpoint para obtener el perfil del usuario actual
        GET /api/users/perfil/
        """
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)


# ==================== COLEGIOS ====================

class ColegioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para consultar colegios
    GET /api/colegios/
    GET /api/colegios/{id}/
    """
    permission_classes = [AllowAny]
    queryset = Colegios.objects.all()
    serializer_class = ColegioSerializer
    
    @action(detail=False, methods=['get'])
    def buscar(self, request):
        """
        Buscar colegio por código DANE o nombre
        GET /api/colegios/buscar/?q=termino
        """
        termino = request.query_params.get('q', '')
        
        if not termino:
            return Response({
                'error': 'Debe proporcionar un término de búsqueda'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        colegios = Colegios.objects.filter(
            models.Q(nombre_colegio__icontains=termino) |
            models.Q(codigo_dane__icontains=termino)
        )
        
        serializer = self.get_serializer(colegios, many=True)
        return Response(serializer.data)
    
# ==================== Cambio contraseña ====================

@method_decorator(csrf_exempt, name='dispatch')
class RequestPasswordReset(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user:
            # Generar contraseña segura
            alphabet = string.ascii_letters + string.digits + "!@#$%"
            while True:
                temp_pass = ''.join(secrets.choice(alphabet) for _ in range(10))
                if (
                    any(c.islower() for c in temp_pass) and
                    any(c.isupper() for c in temp_pass) and
                    any(c.isdigit() for c in temp_pass)
                ):
                    break
            
            user.set_password(temp_pass)
            user.save()

            # 🔥 Renderizar HTML
            html_content = render_to_string(
                'emails/reset_password.html',
                {
                    'temp_password': temp_pass,
                    'user': user
                }
            )

            # Versión texto plano (fallback)
            text_content = strip_tags(html_content)

            # 📧 Crear email
            email_message = EmailMultiAlternatives(
                subject='Tu nueva contraseña temporal - Rutas del Saber',
                body=text_content,
                from_email='soporte@rutasdelsaber.com',
                to=[email]
            )

            email_message.attach_alternative(html_content, "text/html")
            email_message.send()

            return Response(
                {"message": "Contraseña enviada"},
                status=status.HTTP_200_OK
            )
        
        return Response(
            {"error": "No encontramos una cuenta asociada a este correo."},
            status=status.HTTP_404_NOT_FOUND
        )