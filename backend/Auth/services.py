# services.py
from .models import PadronAlumnos, PadronProfesores, SolicitudAcceso

class ValidacionPadronService:
    """Servicio para validar usuarios contra el padrón"""
    
    @staticmethod
    def validar_alumno(num_documento, tipo_doc, nombre_completo=None):
        """
        Valida si un alumno existe en el padrón
        Retorna: (existe, datos_padron, errores)
        """
        try:
            padron = PadronAlumnos.objects.get(
                num_documento=num_documento,
                tipo_doc=tipo_doc
            )
            
            return True, padron, []
            
        except PadronAlumnos.DoesNotExist:
            return False, None, ["No se encontró el documento en el padrón de alumnos"]
    
    @staticmethod
    def validar_profesor(num_doc, tipo_doc, nombre_completo=None):
        """
        Valida si un profesor existe en el padrón
        Retorna: (existe, datos_padron, errores)
        """
        try:
            padron = PadronProfesores.objects.get(
                num_doc=num_doc,
                tipo_doc=tipo_doc
            )
            
            return True, padron, []
            
        except PadronProfesores.DoesNotExist:
            return False, None, ["No se encontró el documento en el padrón de profesores"]
    
    @staticmethod
    def crear_solicitud_acceso(tipo_usuario, datos_formulario):
        """
        Crea una solicitud de acceso después de validar contra padrón
        """
        num_documento = datos_formulario['num_documento']
        tipo_doc = datos_formulario['tipo_doc']
        nombre_completo = datos_formulario.get('nombre_completo', '')
        
        # Validar según tipo
        if tipo_usuario == 'alumno':
            existe, padron, errores = ValidacionPadronService.validar_alumno(
                num_documento, tipo_doc
            )
        else:
            existe, padron, errores = ValidacionPadronService.validar_profesor(
                num_documento, tipo_doc
            )
        
        if not existe:
            return None, errores
        
        # Crear solicitud
        solicitud = SolicitudAcceso.objects.create(
            tipo_usuario=tipo_usuario,
            num_documento=num_documento,
            tipo_doc=tipo_doc,
            email=datos_formulario['email'],
            nombre_completo=nombre_completo,
            telefono=datos_formulario.get('telefono', ''),
            validado_contra_padron=True
        )
        
        return solicitud, []