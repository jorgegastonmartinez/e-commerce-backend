## Título del Proyecto

Entrega Final Curso de Backend.

## Curso

Backend 53150

## Autor

Jorge Martinez.

## Comandos

```
git clone https://github.com/jorgegastonmartinez/e-commerce-backend.git
npm start
```

## Instrucciones de uso

Descargue el proyecto, desde GitHub, con el comando git clone. Dentro del package.json modifique el  "start": "node --watch entrega-final/src/app.js". 
Corra la app con el comando npm start.


Credenciales para el Admin
mail: adminCoder@coder.com
contraseña: adminCod3r123

Dentro del archivo .env.example se encuentran todas las variables de entorno.

## Imagenes del proyecto

Método GET, para obtener los usuarios con los siguiente datos: nombre, correo y rol. desde el router.get('/api/users/', getUsers).
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.02.58 p. m..png)


Método DELETE para borrar los usuarios que no tuvieron conexión en los ultimos 2 días. desde el router.delete('/api/users/inactive', deleteInactiveUsers)
![](./entrega-final/src/public/img/)


Envío de correo electronico indicando que su cuenta fue eliminada por inactividad.
![](./entrega-final/src/public/img/)


Vista para visualizar, modificar el rol y eliminar un usuario específico desde el router del administrador. Para poder acceder se debe iniciar sessión con las credenciales del admin.
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.08.10 p. m..png)


Endpoint para eliminar un producto dentro del router del administrador del e-commerce. router.delete('/api/admin/products/:pid', isAuthenticated, isAdmin, deleteProduct).
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.28.30 p. m..png)


Si es usuario "premium", se le envía un correo en el caso de que el admin borre un producto 
![](./entrega-final/src/public/img/)


Vista de Productos.
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.47.03 p. m..png)


Vista de Carrito de usuario.
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.37.20 p. m..png)


Vista del ticket generado y envío por email
![](./entrega-final/src/public/img/Captura%20de%20pantalla%202024-09-14%20a%20la(s)%205.43.36 p. m..png)








## Contacto

Si tienes alguna pregunta o inquietud, puedes ponerte en contacto conmigo al correo: jgastonmartinez@gmail.com.