# Clothing C&E — E-commerce de indumentaria

Aplicación web de comercio electrónico desarrollada para una tienda de indumentaria, con catálogo de productos, gestión de pedidos y un panel administrativo para administrar el contenido de la tienda.

El proyecto busca integrar una experiencia de compra sencilla con herramientas de administración, autenticación de usuarios y persistencia de datos en la nube.

## 🚀 Demo

- **Aplicación:** [Ver demo online](https://clothingcye.netlify.app/)
- **Repositorio:** [Ver código fuente](https://github.com/ezequielDiLeo/clothing-page)

## 📸 Capturas de pantalla

> Más adelante agregare con tiempo imagenes para que visualicen la página sin necesidad de entrar jeje :p .

Las capturas permiten ver la interfaz y las funcionalidades principales sin necesidad de ejecutar el proyecto.

## ✨ Funcionalidades

### 🛍️ Tienda online

- Visualización del catálogo de productos.
- Organización de productos por categorías.
- Presentación de imágenes, precios, descripciones y características.
- Visualización de stock y descuentos.
- Aplicación de promociones configurables.
- Flujo de compra integrado con la gestión de pedidos.

### 🔐 Autenticación y usuarios

- Integración con Firebase Authentication.
- Gestión del estado de autenticación.
- Diferenciación entre usuarios y administradores.
- Acceso al panel administrativo sujeto a validación de permisos.

### ⚙️ Panel de administración

- Alta, edición y eliminación de productos.
- Gestión de precios, categorías, imágenes, stock y descuentos.
- Configuración de promociones globales.
- Consulta de pedidos y actualización de sus estados.
- Consulta de información de usuarios.
- Sincronización de datos con Firestore.

### 📦 Gestión de pedidos

El panel permite trabajar con distintos estados del pedido:

- Pendiente
- Preparando
- Enviado
- Entregado
- Cancelado

Esto permite representar el ciclo de vida de una compra y administrar su evolución desde el panel.

## 🧰 Tecnologías utilizadas

| Tecnología | Aplicación en el proyecto |
|---|---|
| React | Desarrollo de interfaces mediante componentes reutilizables. |
| JavaScript (ES6+) | Lógica de negocio, manejo de eventos y operaciones asíncronas. |
| React Router | Navegación entre vistas de la aplicación. |
| Firebase Authentication | Autenticación de usuarios. |
| Cloud Firestore | Persistencia y consulta de productos, pedidos, usuarios y promociones. |
| Firebase SDK | Integración del frontend con los servicios de Firebase. |
| Lucide React | Iconografía de la interfaz. |
| CSS / SCSS | Estilos y presentación visual, según los módulos implementados. |
| Vite | Herramientas de desarrollo y compilación, si se utiliza en la configuración del proyecto. |

## 🏗️ Implementación técnica

### Componentes y organización

La aplicación está desarrollada con React, separando la interfaz de usuario de la lógica necesaria para consultar y modificar los datos.

El panel administrativo concentra las operaciones de gestión y utiliza componentes, hooks y funciones de Firestore para mantener actualizada la información.

### Integración con Firestore

El proyecto utiliza Cloud Firestore para almacenar y consultar información de la aplicación.

Entre las operaciones implementadas se encuentran:

- **Create:** creación de productos y registros.
- **Read:** consulta y visualización de información.
- **Update:** edición de productos y actualización de pedidos.
- **Delete:** eliminación de productos.

También se utilizan consultas ordenadas y listeners en tiempo real para recibir actualizaciones de las colecciones utilizadas por el panel.

### Seguridad y permisos

La aplicación incorpora una distinción entre usuarios y administradores. Los permisos sobre los datos deben aplicarse mediante reglas de seguridad de Firestore, además de las validaciones realizadas en la interfaz.

Las credenciales y la configuración del entorno se gestionan mediante variables de entorno, evitando publicar secretos en el repositorio.

## 💻 Instalación y ejecución

### Requisitos

- Node.js
- npm
- Un proyecto configurado en Firebase
- Firebase Authentication y Cloud Firestore habilitados

### 1. Clonar el repositorio

```bash
git clone URL_DE_TU_REPOSITORIO
cd NOMBRE_DE_LA_CARPETA
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y completar las variables correspondientes al proyecto de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

Utilizar los valores correspondientes a tu propio proyecto de Firebase. No subir credenciales privadas ni archivos `.env` con secretos al repositorio.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El comando puede variar según los scripts definidos en `package.json`.

## 📚 Aprendizajes y objetivos técnicos

Este proyecto me permitió trabajar en aspectos importantes del desarrollo frontend:

- Construcción de interfaces y componentes reutilizables con React.
- Integración de una aplicación web con servicios backend administrados mediante Firebase.
- Manejo de autenticación y estado de usuario.
- Implementación de operaciones CRUD sobre una base de datos NoSQL.
- Gestión de productos, promociones y pedidos.
- Organización de funcionalidades administrativas.
- Manejo de operaciones asíncronas, estados de carga y errores.
- Configuración de variables de entorno y reglas de acceso a los datos.

## 🔮 Posibles mejoras

- Incorporar pruebas automatizadas para componentes y flujos críticos.
- Mejorar la validación de datos y el manejo de errores.
- Reforzar las reglas de seguridad y las validaciones del lado del servidor.
- Optimizar el rendimiento y la experiencia en dispositivos móviles.
- Integrar una pasarela de pagos y seguimiento de pedidos, si no forman parte de la versión actual.

## 👨‍💻 Autor

**Ezequiel Di Leo**

Frontend Developer interesado en construir aplicaciones web funcionales, mantenibles y con buenas prácticas de desarrollo.

- [GitHub](https://github.com/ezequielDiLeo)
- [Portfolio](https://ezequieldileo.vercel.app)
- [LinkedIn](PEGAR_URL_DE_TU_LINKEDIN)
