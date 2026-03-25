import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class CustomPasswordValidator:

    def validate(self, password, user=None):
        errores = []

        if len(password) < 8:
            errores.append("Debe tener al menos 8 caracteres.")

        if not re.search(r'[A-Z]', password):
            errores.append("Debe tener al menos una letra mayúscula.")

        if not re.search(r'[a-z]', password):
            errores.append("Debe tener al menos una letra minúscula.")

        if not re.search(r'\d', password):
            errores.append("Debe tener al menos un número.")

        if not re.search(r'[!@#$%^&*(),.?\":{}|<>]', password):
            errores.append("Debe tener al menos un carácter especial.")

        if errores:
            raise ValidationError(errores)

    def get_help_text(self):
        return _(
            "Tu contraseña debe tener mínimo 8 caracteres, incluir mayúscula, "
            "minúscula, número y carácter especial."
        )