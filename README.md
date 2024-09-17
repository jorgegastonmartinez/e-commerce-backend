## Título del Proyecto

Entrega Final Curso de Backend.

## Curso

Backend 53150

## Autor

Jorge Martinez.


## Descripción

Este proyecto es un backend para una aplicación de e-commerce, construido con Node.js, Express y almacenamiento de datos en MongoDB. Cuenta con el despligue del aplicativo en Railway. Proporciona una serie de funcionalidades esenciales para el funcionamiento de una tienda en línea, gestionando usuarios, productos, carritos de compras, y el flujo completo de compra. Además, incluye un sistema de chat entre los usuarios y el administrador, así como notificaciones por email al finalizar una compra.

## Funcionalidades

### 🔑 Gestión de usuarios
El sistema admite tres tipos de usuarios:

- **👤 Usuario regular:** Deberá completar todos los datos del registro correctamente para poder entrar al sitio. La contraseña debe tener al menos 6 caracteres, debe ser mayor de 18 años de edad, el email debe ser con un formato válido y no puede repetirse si un usuario ya se registró con ese email. Si el usuario olvidó su contraseña, podrá solicitar el restablecimiento de la misma mediante un enlace al email.
- **⭐ Usuario premium:** Tiene beneficios adicionales, como subir un producto al e-commerce.
- **🛠️ Administrador:** Gestiona los productos, responde al chat de los usuarios, supervisa las compras y elimina usuarios inactivos.

### 🛒 Carrito de compras
- Agregar productos a su carrito.
- Eliminar productos de su carrito.
- Finalizar la compra.

### 💬 Chat en tiempo real
- Los usuarios pueden chatear directamente con el administrador del e-commerce para resolver dudas o solicitar soporte.

### ✅  Flujo de compra completo
- Los usuarios pueden seleccionar productos y agregarlos al carrito.
- Al finalizar la compra, se genera un **ticket** con los detalles de la transacción.
- Se envía al usuario un email con el ticket de confirmación del pedido.

### ✉️ Envío de tickets por email
- Después de completar la compra, el sistema envía un correo electrónico al usuario con un resumen de su compra y un ticket de confirmación.


## Instrucciones de uso

Haz click en el enlace para poder usar la app
```
URL DE RAILWAY
```

Para ejecutar el proyecto en su ordenador, descargue el proyecto, desde GitHub y copie los comandos proporcionados mas abajo.

Dentro del archivo .env.example se encuentran todas las variables de entorno necesarias.

Credenciales para el usuario con el rol de Admin
```
email: adminCoder@coder.com
contraseña: adminCod3r123
```

## Comandos

1. Clonar el repositorio desde Github
```
git clone https://github.com/jorgegastonmartinez/e-commerce-backend.git
```
2. Instalar las dependencias
```
npm install
```
3. Correr el servidor
```
npm run start
```


## Imagenes del proyecto

### Método GET, para obtener los usuarios con los siguiente datos: nombre, correo y rol. Desde el router.get('/api/users/', getUsers)
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.02.58 p. m..png)

### Método DELETE para borrar los usuarios que no tuvieron conexión en los ultimos 2 días. Desde el router.delete('/api/users/inactive', deleteInactiveUsers)
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-16%20a%20la(s)%204.16.00 p. m..png)

### Envío de correo electronico indicando que su cuenta fue eliminada por inactividad
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-16%20a%20la(s)%204.19.34 p. m..png)

### Vista para visualizar, modificar el rol y eliminar un usuario específico desde el router del administrador. Para poder acceder se debe iniciar sessión con las credenciales del admin
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.08.10 p. m..png)

### Endpoint para eliminar un producto dentro del router del administrador del e-commerce. router.delete('/api/admin/products/:pid', isAuthenticated, isAdmin, deleteProduct)
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.28.30 p. m..png)

### Vista de Productos
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.47.03 p. m..png)

### Vista de Carrito de usuario
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.37.20 p. m..png)

### Vista del ticket generado y envío por email
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.43.36 p. m..png)

## Contacto

Si tienes alguna pregunta o inquietud, puedes ponerte en contacto conmigo
- Correo jgastonmartinez@gmail.com
- Github https://github.com/jorgegastonmartinez