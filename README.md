# Voley Journal - Instrucciones para Desplegar con Contenedores (Docker)

Este proyecto utiliza una arquitectura de **frontend** (React), **backend** (Node.js/Express) y **MongoDB** como base de datos, además de Cloudinary para gestión de imágenes.  
A continuación, se detallan los pasos para desplegar todo el proyecto usando **Docker Desktop** y contenedores.

---

## Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado en tu equipo.
- Cuenta y credenciales de [Cloudinary](https://cloudinary.com/).

---

## 1. Clona el Repositorio

```sh
git clone https://github.com/tu-usuario/voley-journal.git
cd voley-journal
```

---

## 2. Configura las Variables de Entorno

Crea un archivo `.env` dentro de la carpeta `Back-end` con el siguiente contenido (ajusta los valores):

```
MONGODB_URI=mongodb://mongo:27017/voley-journal
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
PORT=5000
```

---

## 3. Crea los Dockerfile

### Backend (`Back-end/Dockerfile`):

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

### Frontend (`Front-end/Dockerfile`):

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 4. Crea el archivo `docker-compose.yml` en la raíz del proyecto

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:6
    container_name: voley-mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./Back-end
    container_name: voley-backend
    restart: always
    ports:
      - "5000:5000"
    env_file:
      - ./Back-end/.env
    depends_on:
      - mongo

  frontend:
    build: ./Front-end
    container_name: voley-frontend
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## 5. Levanta los Contenedores

Desde la raíz del proyecto, ejecuta:

```sh
docker-compose up --build
```

Esto construirá y levantará los contenedores de MongoDB, backend y frontend.

---

## 6. Accede a la Aplicación

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend/API:** [http://localhost:5000](http://localhost:5000)

---

## 7. Detener los Contenedores

Para detener y eliminar los contenedores, ejecuta:

```sh
docker-compose down
```

---

## Notas

- Los datos de MongoDB se almacenan en el volumen `mongo_data` y persistirán aunque detengas los contenedores.
- Asegúrate de que tus variables de entorno sean correctas y que tus rutas de frontend apunten al backend en `localhost:5000`.
- Si cambias el código fuente, puedes reconstruir los contenedores con `docker-compose up --build`.

---

¡Listo! Ahora tienes Voley Journal corriendo en contenedores Docker de forma local.

Enlace Web del proyecto: https://voley-journal-1.onrender.com
