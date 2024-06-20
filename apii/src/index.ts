import { Elysia } from "elysia";

const app = new Elysia()

.group('/api', app => {
  return app
  .get('/informacion/:correo', ({ params }) => 'correo: ${params.correo}')
  .post('/registrar', '')
  .post('/bloquear', '')
  .post('/marcarcorreo', '')
  .delete('/desmarcarcorreo', '')
})

.get('/', () => 'Mi primer elysia!! que emocion!!')
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
