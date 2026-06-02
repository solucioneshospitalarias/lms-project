# DESCRIPCIÓN TÉCNICA DE PROCEDIMIENTOS Y ARQUITECTURA DE SOFTWARE
## PROYECTO: RUTAS DEL SABER
### Registro de Soporte de Software - Dirección Nacional de Derecho de Autor (DNDA), Colombia

Este documento proporciona una radiografía lógica y arquitectónica detallada del software **Rutas del Saber**, explicando sus componentes, flujos de datos, seguridad, integración de base de datos e interfaces de programación de aplicaciones (APIs). Está diseñado para permitir a un evaluador técnico comprender integralmente el funcionamiento interno de la obra sin necesidad de ejecutarla.

---

## 1. OBJETIVO DEL SOFTWARE

**Rutas del Saber** es un Sistema de Gestión de Aprendizaje (LMS - Learning Management System) y plataforma educativa interactiva enfocada en el fortalecimiento académico escolar. Sus objetivos principales son:
*   Facilitar la interacción virtual entre alumnos y profesores de diversas sedes educativas en Colombia.
*   Automatizar y validar el registro de usuarios a través de un padrón o padrón oficial del colegio (evitando que usuarios externos a la institución educativa creen cuentas).
*   Ofrecer herramientas de visualización de notas, calendarios, cursos, y estadísticas de desempeño estudiantil a través de una interfaz moderna y gamificada.

---

## 2. ARQUITECTURA GENERAL Y PILA TECNOLÓGICA (STACK)

El software está implementado bajo un modelo de arquitectura desacoplada de tipo **Cliente-Servidor**, estructurado de la siguiente manera:

```
[ Cliente: React SPA / Vite ] <==== Peticiones HTTP (JSON) ====> [ Servidor: Django REST Framework ]
                                                                       ||
                                                                       || ORM / MySQL Driver
                                                                       \/
                                                           [( Base de Datos: MySQL 8.0 )]
```

### 2.1. Frontend (Cliente)
*   **Tecnología Núcleo:** React.js (v19.2.0) montado sobre Vite (v8.0.0) como empaquetador y entorno de ejecución rápido.
*   **Enrutamiento:** React Router DOM (v7.13.0) para definir rutas públicas y control dinámico de rutas protegidas mediante roles (alumnos y profesores).
*   **Estilos y UX:** CSS Puro (Vanilla CSS) y CSS Modules para garantizar un diseño modular, de alto rendimiento y libre de dependencias pesadas.
*   **Animaciones y Gamificación:** Framer Motion (v12.34.2) y Canvas Confetti (v1.9.4) para proporcionar retroalimentación visual al usuario en hitos de aprendizaje.
*   **Cliente HTTP:** Axios (v1.13.6) implementando interceptores globales para el adjunto automático del token JWT y la renovación transparente de la sesión.
*   **Optimización SEO:** React Helmet Async (v3.0.0) para la inserción y manejo dinámico de etiquetas `<head>` (títulos, descripciones y metadatos) por página.

### 2.2. Backend (Servidor)
*   **Tecnología Núcleo:** Python (v3.11) con el framework Django (v5.2.12).
*   **API REST:** Django REST Framework (DRF v3.17.0) para la serialización de datos y exposición de endpoints JSON públicos y privados.
*   **Autenticación y Seguridad:** Django REST Framework SimpleJWT (v5.5.1) para la emisión y validación de tokens web JSON (JWT).
*   **Acceso a Base de Datos:** Driver `mysqlclient` (v2.2.4) acoplado al ORM nativo de Django.
*   **CORS y Cabeceras:** `django-cors-headers` (v4.9.0) para autorizar accesos controlados desde orígenes permitidos.

### 2.3. Base de Datos
*   **Motor:** MySQL (v8.0) que garantiza transacciones seguras (ACID), almacenamiento optimizado para perfiles académicos e índices de búsqueda eficientes.

### 2.4. Contenerización y Despliegue
*   **Docker & Docker Compose:** Modularización de los servicios de base de datos (`db`) y de servidor backend (`backend`) bajo entornos aislados que reducen inconsistencias de configuración de software.

---

## 3. MODELADO DE DATOS Y CONEXIÓN A LA BASE DE DATOS

### 3.1. Configuración de la Conexión
La comunicación con la base de datos MySQL se define en `backend/lmsBack/settings.py` utilizando el adaptador de base de datos de Django:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
        "OPTIONS": {
            "ssl": {
                "disabled": True
            },
        },
    }
}
```
Las credenciales del sistema se cargan dinámicamente utilizando `django-environ` desde un archivo seguro de configuración ambiental `.env`, el cual no se incluye en el código fuente con el fin de proteger la seguridad del software.

### 3.2. Estructura de Entidades (Modelos de Base de Datos)
El sistema gestiona la persistencia de datos mediante las siguientes tablas fundamentales:

#### A. Colegios (Tabla: `colegios`)
Almacena las instituciones educativas adscritas a la plataforma.
*   `id_colegio` (AutoField, PK): Identificador único del colegio.
*   `nombre_colegio` (CharField): Nombre oficial de la sede.
*   `codigo_dane` (CharField, Unique): Código de identificación único asignado por el Departamento Administrativo Nacional de Estadística (DANE) en Colombia.
*   `ubicacion_sede` (TextField): Dirección o coordenadas físicas de la sede.

#### B. Padrón de Alumnos (Tabla: `padron_alumnos`)
Tabla maestra precargada por los administradores con el listado oficial de alumnos autorizados para registrarse.
*   `num_documento` (CharField, PK): Número de identificación del alumno.
*   `tipo_doc` (CharField): Tipo de documento (TI, CC, CE).
*   `nombre_alumno` (CharField): Nombre del estudiante según el registro escolar.
*   `id_colegio` (ForeignKey): Relación con el colegio al que pertenece.
*   `grado_actual` (IntegerField): Grado escolar actual matriculado (ej. 6, 7, 8, 9, 10, 11).

#### C. Padrón de Profesores (Tabla: `padron_profesores`)
Tabla maestra precargada con el listado oficial de profesores autorizados para dictar clases y administrar notas.
*   `num_doc` (CharField, PK): Número de identificación del profesor.
*   `tipo_doc` (CharField): Tipo de documento (CC, CE).
*   `nombre_completo` (CharField): Nombre y apellidos completos del docente.
*   `id_colegio` (ForeignKey): Relación con el colegio adscrito.

#### D. Usuarios del Sistema (Tabla: `auth_users`)
Modelo personalizado de usuario (`CustomUser`) que extiende `AbstractBaseUser` y `PermissionsMixin` de Django, sirviendo como núcleo de autenticación.
*   `id` (AutoField, PK): Identificador secuencial de usuario.
*   `email` (EmailField, Unique): Dirección de correo electrónico (utilizado como `USERNAME_FIELD` para el inicio de sesión).
*   `num_documento` (CharField, Unique): Documento de identidad del usuario.
*   `user_type` (CharField): Tipo de usuario en la plataforma (`alumno`, `profesor`, `admin`).
*   `is_active` (BooleanField): Estado de habilitación de la cuenta.
*   `is_staff` (BooleanField): Permiso de acceso al panel de administración.
*   `date_joined` (DateTimeField): Fecha de creación del usuario.

#### E. Perfil de Alumno (Tabla: `perfiles_alumnos`)
Extiende la información de `CustomUser` de tipo alumno mediante una relación uno a uno (`OneToOneField`).
*   `user_id` (ForeignKey/OneToOne, PK): Enlace directo al usuario de autenticación.
*   `tipo_doc` (CharField): Tipo de documento oficial.
*   `nombre` (CharField): Nombres del alumno.
*   `apellido1` (CharField): Primer apellido.
*   `apellido2` (CharField): Segundo apellido (opcional).
*   `fecha_nacimiento` / `fecha_expedicion` (DateField): Fechas personales de control.
*   `departamento` / `municipio` (CharField): Datos geográficos de residencia.
*   `telefono` (CharField): Teléfono de contacto.
*   `id_colegio` (ForeignKey): Vinculación al colegio asignado.
*   `grado_actual` (IntegerField): Grado del alumno en el año lectivo.
*   `anio_vigencia` (IntegerField): Año escolar actual en curso.
*   `estado_alumno` (CharField): Estado escolar (`activo`, `inactivo`, `suspendido`).
*   `padron` (ForeignKey): Llave foránea que enlaza directamente con el registro original de `PadronAlumnos` para control de trazabilidad.

#### F. Perfil de Profesor (Tabla: `perfiles_profesores`)
Extiende la información de `CustomUser` de tipo profesor mediante relación uno a uno (`OneToOneField`).
*   `user_id` (ForeignKey/OneToOne, PK): Enlace directo al usuario.
*   `tipo_doc` (CharField): Tipo de documento de identidad.
*   `nombres` (CharField): Nombres del docente.
*   `apellido1` / `apellido2` (CharField): Apellidos del docente.
*   `fecha_nacimiento` / `fecha_expedicion` (DateField): Fechas de control personal.
*   `telefono` (CharField): Teléfono de contacto.
*   `id_colegio` (ForeignKey): Colegio en el que labora.
*   `estado_acc_profe` (CharField): Estado del acceso del profesor (`activo`, `inactivo`).
*   `padron` (ForeignKey): Enlace al padrón maestro de profesores.

#### G. Grados del Profesor (Tabla: `profesor_grados`)
Mapea los grados y cursos específicos asignados a un docente en un periodo académico.
*   `id_relacion` (AutoField, PK): Identificador único de relación.
*   `profesor` (ForeignKey): Enlace al perfil de profesor.
*   `grado_asignado` (IntegerField): Grado asignado (ej. 10).
*   `anio_lectivo` (IntegerField): Año lectivo de la asignación.
*   *Restricción:* Índice único compuesto (`unique_together`) para evitar asignaciones duplicadas de un docente a un mismo grado en el mismo año.

---

## 4. DETALLE DE PETICIONES HTTP Y ENDPOINTS DEL BACKEND (API REST)

La API expone endpoints específicos para gestionar el flujo operativo de la plataforma. La URL base está definida por la variable de entorno `${API_BASE_URL}`.

### 4.1. Módulo de Autenticación y Cuentas (`/api/auth/`)

| Endpoint | Método | Seguridad | Entrada (JSON) | Salida Exitosa (200 OK / 201 Created) | Descripción |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/auth/login/` | `POST` | Pública | `{"email", "password", "user_type"}` | `{"message", "user": {...}, "tokens": {"refresh", "access"}}` | Inicia sesión del usuario, validando el rol esperado (`alumno` o `profesor`) para prevenir accesos cruzados. |
| `/auth/logout/` | `POST` | Privada (JWT) | `{"refresh_token"}` | `{"message": "Logout exitoso. Sesión cerrada."}` | Finaliza la sesión actual del usuario. El cliente destruye localmente los tokens JWT. |
| `/auth/token/refresh/` | `POST` | Pública | `{"refresh"}` | `{"access": "<new_jwt_access_token>"}` | Genera un nuevo token de acceso a partir de un token de refresco válido y no vencido. |
| `/auth/me/` | `GET` | Privada (JWT) | Ninguna (Envía Bearer Token) | `{"id", "email", "num_documento", "user_type", "perfil": {...}}` | Retorna los detalles completos de la cuenta del usuario autenticado en la sesión. |
| `/auth/validar-padron/` | `POST` | Pública | `{"tipo_usuario", "num_documento", "tipo_doc", "nombre_completo"}` | `{"valido": true, "mensaje": "...", "datos": {"nombre", "colegio", "grado"}}` | Valida si un documento de identidad se encuentra registrado en el padrón maestro del colegio. |
| `/auth/registro/alumno/` | `POST` | Pública | Formulario de datos personales, académicos y contraseñas. | `{"message": "Registro exitoso", "user": {...}, "tokens": {...}}` | Crea una cuenta de usuario `CustomUser` y su respectivo `PerfilAlumno` si pasa la validación del padrón. |
| `/auth/registro/profesor/` | `POST` | Pública | Formulario de datos de profesor y contraseñas. | `{"message": "Registro exitoso", "user": {...}, "tokens": {...}}` | Registra una cuenta de profesor en el sistema y crea su `PerfilProfesor`. |
| `/auth/request-reset/` | `POST` | Pública | `{"email", "tipo_usuario"}` | `{"message": "Contraseña enviada"}` | Genera una contraseña temporal robusta y la envía al correo del usuario junto al enlace de ingreso correspondiente. |
| `/auth/change-password/` | `POST` | Privada (JWT) | `{"current_password", "new_password", "confirm_password"}` | `{"message": "Contraseña actualizada correctamente..."}` | Permite a un usuario autenticado cambiar su contraseña, validándola con reglas de complejidad. |
| `/auth/enviar/` | `POST` | Pública | `{"nombre_completo", "email", "asunto", "mensaje"}` | `{"success": true, "message": "..."}` | Recibe el formulario de contacto público, lo guarda en la base de datos y despacha un correo HTML al administrador. |

### 4.2. Módulo de Colegios (`/api/colegios/`)

*   `GET /colegios/`: Retorna la lista total de colegios configurados.
*   `GET /colegios/{id}/`: Detalle de un colegio en específico.
*   `GET /colegios/buscar/?q={termino}`: Busca sedes educativas por coincidencia de nombre o código DANE.

### 4.3. Módulo de Usuarios (`/api/users/`)

*   `GET /users/` (Solo Administradores): Retorna el listado completo de usuarios registrados.
*   `GET /users/{id}/`: Permite consultar los detalles específicos de un usuario (los usuarios comunes solo tienen permitido consultarse a sí mismos).
*   `GET /users/perfil/` (Privado JWT): Obtiene directamente la información del perfil del usuario en sesión.

---

## 5. DESCRIPCIÓN DETALLADA DE PROCEDIMIENTOS CLAVE (FLUJOS LÓGICOS)

### 5.1. Procedimiento de Login y Validación de Rol Cruzado
Este flujo lógico asegura que un usuario no pueda usar credenciales válidas en la interfaz de un rol diferente al suyo:
1.  **Petición de Login:** El cliente React envía una solicitud `POST` a `/api/auth/login/` con el correo, contraseña y tipo de rol esperado (`alumno` o `profesor`).
2.  **Búsqueda en Base de Datos:** El backend busca al usuario por correo en la tabla `auth_users`.
    *   *Si no existe:* Lanza un error HTTP 400 genérico.
3.  **Verificación de Contraseña:** Compara el hash bcrypt/pbkdf2 de la base de datos con la contraseña suministrada.
    *   *Si no coincide:* Retorna error HTTP 400 específico en el campo password.
4.  **Validación Cruzada de Roles:** El backend comprueba si `user.user_type` es exactamente igual al `user_type` suministrado por la interfaz del frontend.
    *   *Si difiere:* Lanza un error HTTP 403 Forbidden indicando acceso denegado por rol no coincidente. Esto previene secuestros de interfaz escolar.
5.  **Despacho de Tokens:** Genera los tokens SimpleJWT y los retorna junto con el perfil detallado del usuario.

### 5.2. Procedimiento de Registro Escolar Validado contra Padrón (Matrícula Protegida)
Previene que personas ajenas a los colegios inscritos creen cuentas falsas. El proceso sigue la siguiente lógica:
1.  **Petición de Validación de Padrón:** El usuario (ej. Estudiante) introduce su documento de identidad y tipo de documento en el formulario de registro del frontend. Este envía un `POST` a `/api/auth/validar-padron/`.
2.  **Consulta Maestra:** El backend ejecuta `ValidacionPadronService.validar_alumno()`, el cual consulta la tabla `padron_alumnos` (datos cargados previamente de forma interna por la administración académica).
    *   *Si no existe:* Se retorna un error indicando que el documento no está autorizado en las listas escolares.
    *   *Si existe:* Se verifica que ese número de documento no tenga ya un usuario creado en la tabla `auth_users` para evitar registros duplicados.
    *   *Resultado:* Si pasa las pruebas, retorna los datos cargados en el padrón (nombre, colegio y grado).
3.  **Diligenciamiento de Datos Adicionales:** La interfaz del frontend desbloquea los campos restantes (correo, contraseña, fecha de nacimiento, municipio de residencia) y los autocompleta con los datos institucionales recuperados del padrón.
4.  **Confirmación y Creación Atómica:** El usuario envía el formulario completo. El backend invoca a `/api/auth/registro/alumno/` ejecutando el proceso bajo una transacción de base de datos segura (`transaction.atomic()`):
    *   Valida la complejidad de la contraseña (número, minúsculas, mayúsculas, longitud >= 8).
    *   Crea el registro de autenticación `CustomUser` ligando el correo y el documento de identidad.
    *   Crea el perfil `PerfilAlumno` extrayendo el grado escolar y colegio del padrón del alumno validado en el paso anterior.
    *   *Control de Fallos:* Si alguna de las operaciones falla o la contraseña no es segura, se realiza un rollback automático de la base de datos para no dejar registros huérfanos.
    *   *Respuesta:* Retorna los tokens de acceso inicial y el estado completo del usuario registrado.

### 5.3. Renovación de Sesión Transparente (Manejo de Expiración JWT en el Cliente)
El frontend implementa una estrategia de token de refresco automático a través de interceptores de Axios en `frontend/src/services/api.js`:
1.  **Petición Ordinaria:** El usuario interactúa con la plataforma. Axios agrega el token de acceso en las cabeceras de cada petición HTTP saliente:
    `config.headers.Authorization = 'Bearer <accessToken>'`
2.  **Expiración detectada (HTTP 401):** Si el token de acceso ha expirado, el servidor backend retorna un error HTTP 401 (Unauthorized).
3.  **Intercepción y Reintentos Silenciosos:** El interceptor de respuestas de Axios detecta el código de estado 401 y valida que no se trate de una petición que ya haya reintentado refrescarse (`!originalRequest._retry`).
4.  **Petición de Refresh:** Axios pausa la petición original, marca la petición como reintentada (`originalRequest._retry = true`), lee el `refreshToken` almacenado en el almacenamiento local (`localStorage`) y envía un `POST` en segundo plano a `${API_BASE_URL}/auth/token/refresh/`.
5.  **Recepción y Re-envío:**
    *   *Si el Refresh es exitoso:* El backend responde con un nuevo token de acceso de corta duración. Axios guarda el nuevo token en el `localStorage`, actualiza la cabecera `Authorization` de la petición original pausada y vuelve a lanzarla. El estudiante o docente continúa navegando sin notar interrupciones.
    *   *Si el Refresh falla (ej. expiraron los 7 días de inactividad):* Se eliminan por completo los tokens del almacenamiento local del navegador (`localStorage.removeItem()`) y se redirige automáticamente al usuario a la pantalla de inicio de sesión (`/login`).

---

## 6. SEGURIDAD Y PROTECCIÓN DE DATOS

1.  **Cifrado de Contraseñas:** Las contraseñas se almacenan en la tabla `auth_users` cifradas mediante el algoritmo de derivación de clave seguro por defecto de Django (`PBKDF2` con hash `SHA256`). Nunca se almacenan contraseñas en texto plano en la base de datos.
2.  **Políticas de Contraseñas Robustas:** La clase `CustomPasswordValidator` en `backend/Auth/validators.py` exige que cualquier contraseña contenga una mezcla de letras mayúsculas, minúsculas, números y caracteres especiales, previniendo ataques de fuerza bruta.
3.  **Transacciones Atómicas:** Las operaciones sensibles del backend (registro de usuarios y perfiles) se ejecutan bajo `@transaction.atomic` para garantizar la consistencia relacional y evitar registros corruptos o a medias.
4.  **Control de Acceso Basado en Roles (RBAC):** Las vistas y componentes del frontend están protegidos con el componente `ProtectedRoute` que analiza los claims decodificados del token JWT del usuario, bloqueando el acceso al Aula Virtual si no es de tipo `alumno`, o bloqueando el Panel Docente si no es de tipo `profesor`. En el backend, las clases `IsAuthenticated` e `IsAdminUser` restringen el acceso a los datos a nivel de controlador.
