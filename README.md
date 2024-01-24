# Saleh-Gds-Electronica

## Instalacion de paquetes

```sh
apt install git postgresql curl openjdk-17-jdk supervisor
```

## Crear usuario de base de datos

Reemplazar la contraseña
```sh
su postgres -c "psql -c \"CREATE USER facturacion WITH PASSWORD 'contrasena';\""
su postgres -c "psql -c \"CREATE DATABASE facturacionp WITH OWNER facturacion;\""
```

## Clonar el backend

Crear usuario saleh e ingresar comonusuario al home
```sh
adduser saleh
su saleh
cd ~
```

Instalar nvm
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
```

Instalar node
```sh
nvm install node 12
```

Clonar backend
```sh
git clone https://github.com/albertoinch/Saleh-Gds-Electronica.git
cd Saleh-Gds-Electronica
npm install
```

## Base de Datos

Configurar base de satos
```sh
cp src/config/config-example.js src/config/config.js
cp src/config/config-example.json src/config/config.json
nano src/config/config.json
```

Establecer usuario y contraseña
```
  "production": {
    "username": "facturacion",
    "password": "contrasena",
    "database": "facturacionp",
    "host": "127.0.0.1",
    "port": 5432, 
    "dialect": "postgres",
    "pool": {
      "max": 15,
      "min": 0,
      "idle": 10000
    }
  }
```

Crear base de datos
```sh
NODE_ENV=production npm run setup
```

## Configuración de servicios

Editar el archivo
```sh
nano src/config/config.js
```

Establecer el token de impuestos, código de sistema, certificado de firma digital y otros.

## Inicio con el sistema

Editar el archivo
```sh
sudo nano /etc/supervisor/conf.d/facturacion-backend.conf
```

Con el contenido
```sh
[program:facturacion-backend]
environment=NODE_ENV=production
command=npm start 
directory=/home/saleh/Saleh-Gds-Electronica
process_name=facturacion-backend
autostart=true
autorestart=true 
stopasgroup=true
stopsignal=KILL 
stdout_logfile=/home/saleh/logs/facturacion-backend-out.log 
stderr_logfile=/home/saleh/logs/facturacion-backend-error.log 
user=saleh
```
