# 🛒 E-commerce React - Proyecto Final Coderhouse

Una aplicación web de comercio electrónico tipo Single Page Application (SPA) desarrollada como proyecto final para el curso de React en Coderhouse. Este proyecto demuestra la implementación de un flujo de compras completo, desde la exploración del catálogo hasta la generación de órdenes, aplicando buenas prácticas de desarrollo, lógica modular y arquitectura de componentes.

## 🚀 Funcionalidades Destacadas

*   **Navegación Dinámica:** Ruteo fluido entre el inicio, el listado de productos filtrado por categorías y la vista detallada de cada ítem.
*   **Gestión del Carrito de Compras:** Capacidad de agregar, visualizar, modificar cantidades y vaciar el carrito, manteniendo un estado global persistente y sincronizado a través de React Context.
*   **Sincronización en la Nube:** Consumo de datos reales (catálogo de productos) alojados y estructurados en Firebase/Firestore.
*   **Checkout y Generación de Órdenes:** Formulario de finalización de compra con captura de datos del cliente, validación y generación automática de tickets/órdenes de compra en la base de datos.
*   **UI/UX Responsiva y Modular:** Interfaz estructurada y estilizada utilizando SASS mediante una arquitectura de *partials*, garantizando código CSS limpio, escalable y adaptable a distintos dispositivos.
*   **Feedback Visual:** Implementación de componentes de carga (`LoadingComponent`) y manejo de errores (`Error`) para mejorar la experiencia del usuario.

## 🛠️ Stack Tecnológico y Arquitectura

*   **Librería Principal:** React JS (entorno inicializado con Vite para mayor rendimiento).
*   **Estilos:** SASS (Implementación de partials, variables y anidamiento).
*   **Base de Datos (BaaS):** Firebase (Cloud Firestore).
*   **Manejo de Estado Global:** Context API (`CartContext`).
*   **Lógica Modular:** Creación y uso de Custom Hooks (`useProductos`, `useUnProducto`) para abstraer la comunicación con la base de datos y mantener limpios los componentes de presentación.

## ⚙️ Instalación y Configuración Local

Para visualizar y trabajar sobre este proyecto en un entorno local, ejecutar los siguientes comandos en la terminal:

```bash
# Clonar el repositorio
git clone [URL_DE_TU_REPOSITORIO]

# Ingresar a la carpeta del proyecto
cd [NOMBRE_DE_LA_CARPETA]

# Instalar todas las dependencias necesarias
npm install

# Iniciar el entorno de desarrollo local
npm run dev