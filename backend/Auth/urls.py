# tu_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (LoginView, LogoutView, CurrentUserView, validar_padron, solicitar_acceso_alumno, solicitar_acceso_profesor, UserViewSet, ColegioViewSet, RequestPasswordReset, ChangePasswordView, ContactoCreateView)

# Configurar el router para los ViewSets
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'colegios', ColegioViewSet, basename='colegio')

# URL Patterns
urlpatterns = [
    # ==================== AUTENTICACIÓN ====================
    # Login
    path('login/', LoginView.as_view(), name='login'),
    
    # Logout
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # Refresh Token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Usuario actual
    path('me/', CurrentUserView.as_view(), name='current-user'),
    
    # ==================== VALIDACIÓN Y REGISTRO ====================
    # Validar si existe en padrón
    path('validar-padron/', validar_padron, name='validar-padron'),
    
    # Registro de alumnos
    path('registro/alumno/', solicitar_acceso_alumno, name='registro-alumno'),
    
    # Registro de profesores
    path('registro/profesor/', solicitar_acceso_profesor, name='registro-profesor'),

    path('request-reset/', RequestPasswordReset.as_view(), name='cambiar-contraseña'),

    # Restablecer contraseña dentro del panel estudiante
    path('change-password/', ChangePasswordView.as_view(), name='restablecer-contraseña'),

    # Formulario de Contacto
    path('enviar/', ContactoCreateView.as_view(), name='enviar-contacto'),

]
