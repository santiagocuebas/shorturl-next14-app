# NJShort
NJShort es un acortador de urls basado en [este projecto de pheralb](https://github.com/pheralb/slug).

## Variables
### Cliente
- `NEXT_PUBLIC_DIR`, la dirección http del servidor.
- `NEXT_PUBLIC_GOOGLE_ID`, id de una OAuth App de Google.
- `NEXT_PUBLIC_GITHUB_ID`, id de una OAuth App de Github.
### Servidor
- `PORT`, el puerto del servidor, por default es `4200`.
- `ORIGIN`, la dirección http del cliente.
- `SECRET`, la clave JWT secreta.
- `DB_URI`, la dirección de postgreSQL.
- `GITHUB_URI`, OAuth App de Github. Debe contener el id y el secreto del cliente.
- `GOOGLE_URI`, OAuth App de Google. Debe contener el id y el secreto del cliente.

## Instalación Manual
```
git clone https://github.com/santiagocuebas/shorturl-nextjs14-app
cd shorturl-nextjs14-app
pnpm run todo

git clone https://github.com/santiagocuebas/nodejs-shorturl-api 
cd nodejs-shorturl-api 
pnpm run todo
```

## Recursos
- Node.js
- Express
- PostgreSQL
- TypeScript
- Next.js
- React.js
- Styled-Components
