# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

e commerce de tienda de ropa, cantidad, calidad y y filtrado de cada producto.

## Panel de administración

El panel está disponible en `/admin` para la cuenta autorizada `ezemr1996@gmail.com`.
La cuenta debe existir en Firebase Authentication y tener el correo verificado. Si
todavía no existe, registrala desde la tienda y confirmá el mensaje que Firebase envía.

Antes de usar el panel, seleccioná el proyecto Firebase correcto y desplegá las reglas
de seguridad incluidas:

```sh
firebase deploy --only firestore:rules --project ID_DEL_PROYECTO
```

Las reglas dejan leer el catálogo y la promoción general desde la tienda, pero solo
permiten a la cuenta administradora modificar productos, promociones y pedidos, o
consultar los perfiles de clientes. Las cuentas registradas se guardan en `users`;
el panel muestra las que se registren después de habilitar esta función. Los descuentos
por producto reemplazan, y no se acumulan con, el descuento general. Se guardan en
`discountPercent` y en `promotions/global`, respectivamente.

El checkout existente descuenta inventario desde el navegador. Las reglas exigen que
cualquier decremento de stock esté vinculado, en la misma transacción, a un pedido
nuevo del usuario. Para procesar pagos o calcular importes con una fuente confiable
hace falta integrar un backend y un proveedor de pagos.