### KonectaFrontend

## Requisitos de instalación

## 1. Clonar el repositorio

``` bash
git clone https://github.com/jako12287/konectaFrontend.git

```

## 2. Navegar hasta la carpeta del proyecto

``` bash
cd konectaFrontend

```

## 3. Instalación de las dependencias necesarias

``` bash
npm install

```

## 4. Configurar Docker Desktop

Puedes descargar Docker Desktop desde el siguiente enlace:

[Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 5. Construir la imagen de Docker con el siguiente comando

```bash
docker build -t konectafrontend .

```

## 6. Ejecutar el contenedor

```bash
docker run -p 5173:5173 konectafrontend

```

### Mejores Prácticas

## React Hook Form para formularios
Utilicé React Hook Form para optimizar el manejo de formularios, validación y errores, mejorando el rendimiento y la experiencia del usuario.

## Autorización según roles
Protejo las rutas basadas en el rol del usuario, asegurando que solo los usuarios autorizados accedan a las secciones correspondientes.

## Context API para gestión de datos
Uso el Context API para centralizar las peticiones a la API, facilitando la organización y el flujo de datos entre componentes.

## Componentes reutilizables
Los componentes son modulares y reutilizables, lo que facilita la extensión y mantenimiento de la aplicación.


### Seguridad

## Protección de rutas y roles
La autenticación y autorización por roles asegura que solo los usuarios con los permisos correctos accedan a ciertas rutas.

## Encriptación de contraseñas y JWT
Las contraseñas se encriptan con bcryptjs, y utilizo tokens JWT para validar la identidad del usuario de manera segura.

## Comunicación segura (HTTPS)
Uso HTTPS para cifrar las peticiones a la API, protegiendo los datos durante la transmisión.

## Validación y manejo de errores
Valido los formularios antes de enviarlos para evitar vulnerabilidades y proteger contra inyecciones de código.

## Protección contra XSS
Implementé medidas contra XSS, como sanitización de entradas, para proteger la aplicación de ataques maliciosos.

## Gracias por tomarte el tiempo de leer este Readme y probar mi codigo