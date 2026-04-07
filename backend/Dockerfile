# Usamos slim para reducir el tamaño de ~500MB a ~150MB
FROM python:3.11-slim

# Evita que Python genere archivos .pyc y permite ver logs en tiempo real
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV TZ=America/Bogota

WORKDIR /app

# Instalamos dependencias del sistema necesarias para mysqlclient y compilación
# Usamos un solo RUN para reducir las capas de la imagen
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    default-mysql-client \
    pkg-config \
    tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Cache de dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copiar el código del proyecto
COPY . .

EXPOSE 8005

# Usamos el puerto 8005 que definiste en el CMD
CMD ["python", "manage.py", "runserver", "0.0.0.0:8005"]