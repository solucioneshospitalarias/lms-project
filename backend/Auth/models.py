# models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

# ==================== TABLAS EXISTENTES (No modificar) ====================

class Colegios(models.Model):
    id_colegio = models.AutoField(primary_key=True)
    nombre_colegio = models.CharField(max_length=255)
    codigo_dane = models.CharField(unique=True, max_length=20, blank=True, null=True)
    ubicacion_sede = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'colegios'
    
    def __str__(self):
        return self.nombre_colegio


class PadronAlumnos(models.Model):
    """Tabla maestra de alumnos autorizados"""
    num_documento = models.CharField(primary_key=True, max_length=20)
    tipo_doc = models.CharField(max_length=10)
    nombre_alumno = models.CharField(max_length=255)
    id_colegio = models.ForeignKey(Colegios, models.DO_NOTHING, db_column='id_colegio')
    grado_actual = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'padron_alumnos'
    
    def __str__(self):
        return f"{self.nombre_alumno} - {self.num_documento}"


class PadronProfesores(models.Model):
    """Tabla maestra de profesores autorizados"""
    num_doc = models.CharField(primary_key=True, max_length=20)
    tipo_doc = models.CharField(max_length=10)
    nombre_completo = models.CharField(max_length=255)
    id_colegio = models.ForeignKey(Colegios, models.DO_NOTHING, db_column='id_colegio')

    class Meta:
        managed = False
        db_table = 'padron_profesores'
    
    def __str__(self):
        return f"{self.nombre_completo} - {self.num_doc}"


# ==================== NUEVO SISTEMA DE AUTENTICACIÓN ====================

class CustomUserManager(BaseUserManager):
    """Manager personalizado para el modelo de usuario"""
    
    def create_user(self, email, num_documento, user_type, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        if not num_documento:
            raise ValueError('El usuario debe tener un número de documento')
        
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            num_documento=num_documento,
            user_type=user_type,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, num_documento, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('user_type', 'admin')
        
        return self.create_user(email, num_documento, 'admin', password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Modelo de usuario unificado que maneja tanto alumnos como profesores.
    Este será el modelo principal de autenticación de Django.
    """
    USER_TYPE_CHOICES = [
        ('alumno', 'Alumno'),
        ('profesor', 'Profesor'),
        ('admin', 'Administrador'),
    ]
    
    # Campos principales
    email = models.EmailField(unique=True, verbose_name='Correo electrónico')
    num_documento = models.CharField(max_length=20, unique=True, verbose_name='Número de documento')
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, verbose_name='Tipo de usuario')
    
    # Campos de Django Auth
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    
    # Campos adicionales
    fecha_ultima_actualizacion = models.DateTimeField(auto_now=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['num_documento']
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        db_table = 'auth_users'  # Nueva tabla para autenticación
    
    def __str__(self):
        return f"{self.email} ({self.get_user_type_display()})"
    
    @property
    def profile(self):
        """Retorna el perfil específico según el tipo de usuario"""
        if self.user_type == 'alumno':
            return getattr(self, 'perfil_alumno', None)
        elif self.user_type == 'profesor':
            return getattr(self, 'perfil_profesor', None)
        return None


class PerfilAlumno(models.Model):
    """Perfil extendido para alumnos - Reemplaza UsuariosPlataforma"""
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        primary_key=True,
        related_name='perfil_alumno'
    )
    
    # Datos personales
    tipo_doc = models.CharField(max_length=10)
    nombre = models.CharField(max_length=100)
    apellido1 = models.CharField(max_length=100)
    apellido2 = models.CharField(max_length=100, blank=True, null=True)
    fecha_nacimiento = models.DateField()
    fecha_expedicion = models.DateField()
    email = models.CharField(max_length=100)
    
    # Ubicación
    departamento = models.CharField(max_length=100)
    municipio = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    
    # Datos académicos
    id_colegio = models.ForeignKey(Colegios, on_delete=models.PROTECT)
    grado_actual = models.IntegerField()
    anio_vigencia = models.IntegerField()
    
    # Estado
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('suspendido', 'Suspendido'),
    ]
    estado_alumno = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    
    # Referencia al padrón
    padron = models.ForeignKey(
        PadronAlumnos, 
        on_delete=models.PROTECT, 
        db_column='num_documento',
        to_field='num_documento'
    )
    
    class Meta:
        verbose_name = 'Perfil de Alumno'
        verbose_name_plural = 'Perfiles de Alumnos'
        db_table = 'perfiles_alumnos'
    
    def __str__(self):
        return f"{self.nombre} {self.apellido1}"


class PerfilProfesor(models.Model):
    """Perfil extendido para profesores - Reemplaza UsuariosProfesores"""
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        primary_key=True,
        related_name='perfil_profesor'
    )
    
    # Datos personales
    tipo_doc = models.CharField(max_length=10)
    nombres = models.CharField(max_length=100)
    apellido1 = models.CharField(max_length=100)
    apellido2 = models.CharField(max_length=100, blank=True, null=True)
    fecha_nacimiento = models.DateField()
    fecha_expedicion = models.DateField()
    telefono = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(max_length=100)
    
    # Datos institucionales
    id_colegio = models.ForeignKey(Colegios, on_delete=models.PROTECT)
    
    # Estado
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('suspendido', 'Suspendido'),
    ]
    estado_acc_profe = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    
    # Referencia al padrón
    padron = models.ForeignKey(
        PadronProfesores, 
        on_delete=models.PROTECT, 
        db_column='num_doc',
        to_field='num_doc'
    )
    
    class Meta:
        verbose_name = 'Perfil de Profesor'
        verbose_name_plural = 'Perfiles de Profesores'
        db_table = 'perfiles_profesores'
    
    def __str__(self):
        return f"{self.nombres} {self.apellido1}"


class ProfesorGrados(models.Model):
    """Relación entre profesores y grados asignados"""
    id_relacion = models.AutoField(primary_key=True)
    profesor = models.ForeignKey(
        PerfilProfesor, 
        on_delete=models.CASCADE,
        related_name='grados_asignados'
    )
    grado_asignado = models.IntegerField()
    anio_lectivo = models.IntegerField()

    class Meta:
        db_table = 'profesor_grados'
        unique_together = [['profesor', 'grado_asignado', 'anio_lectivo']]
    
    def __str__(self):
        return f"{self.profesor} - Grado {self.grado_asignado} ({self.anio_lectivo})"


class SolicitudAcceso(models.Model):
    """Modelo para gestionar solicitudes de acceso pendientes"""
    TIPO_USUARIO_CHOICES = [
        ('alumno', 'Alumno'),
        ('profesor', 'Profesor'),
    ]
    
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
    ]
    
    # Datos de la solicitud
    tipo_usuario = models.CharField(max_length=10, choices=TIPO_USUARIO_CHOICES)
    num_documento = models.CharField(max_length=20)
    tipo_doc = models.CharField(max_length=10)
    email = models.EmailField()
    
    # Datos adicionales del solicitante
    nombre_completo = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    
    # Validación contra padrón
    validado_contra_padron = models.BooleanField(default=False)
    
    # Estado
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    fecha_solicitud = models.DateTimeField(auto_now_add=True)
    fecha_procesamiento = models.DateTimeField(null=True, blank=True)
    
    # Observaciones
    motivo_rechazo = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Solicitud de Acceso'
        verbose_name_plural = 'Solicitudes de Acceso'
        db_table = 'solicitudes_acceso'
        ordering = ['-fecha_solicitud']
    
    def __str__(self):
        return f"{self.num_documento} - {self.get_estado_display()}"