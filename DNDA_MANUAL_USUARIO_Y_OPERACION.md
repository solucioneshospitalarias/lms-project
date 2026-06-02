# MANUAL DE INSTALACIÓN, OPERACIÓN Y GUÍA DE USUARIO
## PROYECTO: RUTAS DEL SABER
### Registro de Soporte de Software - Dirección Nacional de Derecho de Autor (DNDA), Colombia

Este documento actúa como material auxiliar descriptivo del software **Rutas del Saber**. Contiene la guía completa para la instalación técnica y puesta en marcha del sistema, así como los manuales operacionales paso a paso para los diferentes roles de usuario (Alumnos y Profesores) y administradores del sistema.

---

## SECCIÓN 1: MANUAL DE INSTALACIÓN Y CONFIGURACIÓN TÉCNICA

### 1. Requisitos de Sistema y Dependencias
Para ejecutar o instalar la plataforma Rutas del Saber en un entorno local o de producción, el host debe cumplir con las siguientes herramientas instaladas:
*   **Docker** (v20.10 o superior) y **Docker Compose** (v2.0 o superior) para la orquestación automatizada de servicios y contenedores.
*   **Node.js** (v18.0 o superior) y **npm** (v9.0 o superior) para el desarrollo, compilación y empaquetamiento de la interfaz React.
*   **Git** (para control de versiones y descarga de archivos).

---

### 2. Estructura de Directorios del Código Fuente
El código de autoría está organizado en dos componentes principales integrados:
*   `/backend`: Contiene la aplicación Django REST Framework, configuraciones, base de datos relacional y dockerfiles.
*   `/frontend`: Contiene el cliente SPA en React, hojas de estilo CSS y configuraciones de construcción Vite.

---

### 3. Configuración de Variables de Entorno
Antes de levantar los servicios, es obligatorio crear archivos `.env` con las configuraciones operativas del sistema.

#### A. Variables de Entorno del Backend (Ubicación: `backend/.env`)
Crear un archivo `.env` dentro de la carpeta `backend/` con las siguientes llaves:
```env
# Clave secreta interna de Django
SECRET_KEY=tu_clave_secreta_segura

# Configuración de Base de Datos relacional
DB_NAME=lms_database
DB_USER=lms_admin
DB_PASSWORD=clave_segura_mysql
DB_ROOT_PASSWORD=clave_root_segura
DB_HOST=db
DB_PORT=3306

# Ajustes de URLs y Red
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8005
FRONTEND_URL_PRODUCTIVO=https://rutasdelsaber.com
BACKEND_URL_PRODUCTIVO=https://api.rutasdelsaber.com
SITE_URL=http://localhost:5173

# Parámetros del Servidor SMTP de Correo
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_SSL=False
EMAIL_HOST_USER=tu_correo@rutasdelsaber.com
EMAIL_HOST_PASSWORD=tu_contraseña_aplicacion_smtp
DEFAULT_FROM_EMAIL=soporte@rutasdelsaber.com
```

#### B. Variables de Entorno del Frontend (Ubicación: `frontend/.env`)
Crear un archivo `.env` en la raíz de la carpeta `frontend/` indicando la ruta del servidor API:
```env
VITE_API_URL=http://localhost:8005/api
```

---

### 4. Puesta en Marcha y Despliegue de los Servicios

#### Paso 4.1. Construir y Levantar Contenedores de Base de Datos y Backend
Desde una terminal situada en el directorio `backend/`, ejecute el comando para construir las imágenes del dockerfile e iniciar los contenedores de MySQL y Django en segundo plano:
```bash
docker-compose up --build -d
```
*Este comando descarga la imagen de MySQL 8.0, configura la base de datos relacional inicial (`lms_database`), descarga la imagen ligera de Python 3.11-slim, instala todas las dependencias del sistema y de Python (`requirements.txt`), y expone la API en el puerto **8005**.*

#### Paso 4.2. Ejecutar Migraciones Relacionales de Base de Datos
Para generar la estructura de tablas relacionales (incluyendo las tablas de usuarios, perfiles, colegios, padrón y solicitudes de acceso), ejecute:
```bash
docker-compose exec backend python manage.py migrate
```

#### Paso 4.3. Cargar Datos del Padrón y Colegios (Ejemplo semilla)
Si se requiere registrar a los primeros estudiantes o profesores, se debe poblar la base de datos con los colegios oficiales y listas de padrones autorizados. Esto puede realizarse importando un dump SQL o utilizando comandos interactivos:
```bash
docker-compose exec backend python manage.py shell
```

#### Paso 4.4. Arrancar la Interfaz del Frontend (React Client)
Desde una nueva terminal situada en el directorio `frontend/`, ejecute los siguientes comandos:
```bash
# Instalar módulos de Node.js locales
npm install

# Iniciar servidor de desarrollo local de Vite
npm run dev
```
*La interfaz estará disponible en la dirección web: [http://localhost:5173](http://localhost:5173).*

---

## SECCIÓN 2: MANUAL DE OPERACIÓN DE ADMINISTRACIÓN (BACK-OFFICE)

La administración general de la plataforma se realiza mediante el gestor administrativo nativo de Django, el cual opera como panel de back-office centralizado.

### 1. Crear Usuario Administrador de Control
Ejecute el siguiente comando en la consola del backend docker para registrar al superusuario inicial de control:
```bash
docker-compose exec backend python manage.py createsuperuser
```
Siga las instrucciones en consola ingresando el correo administrativo, número de documento y contraseña del administrador.

### 2. Acceso al Panel de Administración
1.  Abra su navegador de internet y diríjase a: `http://localhost:8005/admin/`.
2.  Introduzca las credenciales creadas en el paso anterior.
3.  **Módulos del Administrador:**
    *   **Colegios:** Permite crear, modificar o eliminar sedes escolares y sus códigos DANE correspondientes.
    *   **Padron Alumnos / Padron Profesores:** Listados maestros de los estudiantes y profesores oficiales del ciclo escolar. Es indispensable registrar previamente la cédula o tarjeta de identidad del alumno aquí antes de que este intente crear su cuenta.
    *   **Usuarios / Perfiles:** Permite supervisar las cuentas de alumnos y profesores registradas, cambiar permisos, e inactivar usuarios.
    *   **Mensajes de Contacto:** Visualización de solicitudes o preguntas enviadas desde el formulario de contacto público.

---

## SECCIÓN 3: MANUAL DE USUARIO - ALUMNOS (AULA VIRTUAL)

### Paso 1: Ingreso a la Plataforma Educativa
El estudiante ingresa a la página principal pública de Rutas del Saber. En la barra de navegación superior, hace clic en el botón **Ingresar Estudiante** o accede directamente a la ruta `/login`.

### Paso 2: Registro Inicial de Alumno (Validación en Padrón)
Si el estudiante no tiene una cuenta creada, debe proceder de la siguiente manera:
1.  Hacer clic en el enlace **Regístrate** en la parte inferior de la caja de login (redirige a `/register`).
2.  Completar el **Paso 1 del Asistente:**
    *   Seleccionar el Tipo de Documento (Tarjeta de Identidad, Cédula, etc.).
    *   Escribir el Número de Documento oficial.
    *   Hacer clic en **Validar Documento**.
    *   *Detrás de escena:* El sistema consulta la base de datos para corroborar si el alumno está matriculado oficialmente. Si no se encuentra en el padrón, el asistente bloquea el registro indicando que debe comunicarse con el colegio.
3.  Completar el **Paso 2 del Asistente:**
    *   Si el padrón es válido, el sistema autocompleta su Nombre, Colegio y Grado actual.
    *   El alumno debe ingresar su correo electrónico, número telefónico, departamento/municipio de residencia y definir una contraseña segura (mínimo 8 caracteres, con números, letras mayúsculas y minúsculas).
    *   Leer y marcar la casilla de aceptación de los Términos y Condiciones y Tratamiento de Datos Personales.
    *   Hacer clic en **Finalizar Registro**.
    *   *Retroalimentación:* Tras el registro exitoso, el sistema muestra una animación de confeti dinámico y lo ingresa directamente a su Aula Virtual.

### Paso 3: Acceso al Aula Virtual (Dashboard del Estudiante)
En visitas posteriores, el alumno inicia sesión con su correo y contraseña en la pantalla `/login`. Una vez autenticado, accede al Aula Virtual (`/aula-virtual`):
1.  **Dashboard / Inicio:** Mensaje de bienvenida personalizado con su nombre y grado escolar. Visualiza avisos importantes de sus profesores.
2.  **Mi Perfil:** Visualización de su ficha académica (colegio, código dane, grado escolar, datos de contacto).
3.  **Mis Cursos:** Listado de asignaturas activas de su grado escolar en donde puede ingresar a las lecciones interactivas y leer libros educativos en formato "PageFlip" (páginas con simulación de libro físico).
4.  **Desempeños (Notas):** Gráficos analíticos construidos mediante Recharts que detallan sus calificaciones acumuladas por materia, rendimiento general del periodo y áreas a fortalecer.
5.  **Calendario Escolar:** Vista interactiva de entregas de tareas, exámenes y eventos institucionales.
6.  **Configuración de Cuenta:** Permite actualizar datos personales o realizar un cambio seguro de contraseña previa comprobación de su contraseña actual.

---

## SECCIÓN 4: MANUAL DE USUARIO - PROFESORES (PANEL DOCENTE)

### Paso 1: Registro de Docente
1.  El profesor accede a la ruta `/register-profesor` desde el sitio web público.
2.  Introduce su Tipo de Documento y Cédula de Ciudadanía.
3.  El sistema valida contra la base de datos de profesores autorizados en el padrón docente del colegio.
4.  Al ser exitosa la validación, el profesor ingresa su correo electrónico institucional, teléfono, nombres y apellidos, y define una clave de seguridad que cumpla con los estándares obligatorios de la plataforma.
5.  Hace clic en **Enviar Solicitud**.

### Paso 2: Inicio de Sesión Docente
El docente accede a `/login-profesor`. Introduce su correo y contraseña. El backend valida su rol `profesor` y lo redirige al **Panel del Profesor** (`/panel-profesor`).

### Paso 3: Operación del Panel Docente
Desde el panel administrativo de clases, el profesor tiene acceso a:
1.  **Gestión de Grados Asignados:** Visualización de las aulas de clase y grados que tiene programados en el año lectivo en curso.
2.  **Ficha de Alumnos:** Lista de estudiantes matriculados en sus respectivos cursos.
3.  **Visor de Notas (`/visor-notas`):**
    *   El profesor selecciona la materia y el grado correspondiente.
    *   Aparece una cuadrícula o planilla de calificaciones electrónica.
    *   El profesor puede ingresar o modificar los valores numéricos correspondientes al desempeño de cada alumno en las diferentes actividades y periodos académicos.
    *   Al guardar los cambios, la base de datos se actualiza de inmediato mediante peticiones HTTP asíncronas y el alumno puede ver de forma instantánea el cambio reflejado en sus gráficos de desempeño del Aula Virtual.
4.  **Cierre de Sesión:** Permite salir de manera segura del sistema limpiando las credenciales de la memoria del navegador.
