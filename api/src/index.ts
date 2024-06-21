import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const app = new Elysia()
const prisma = new PrismaClient();



//Endpoints
.group("/api", app => {
  return app
  .post("/registrar",)
  .post("/bloquear",)
  .get("/informacion/:correo",)
  .post("/marcarcorreo",)
  .delete("/desmarcarcorreo",)
  .post("/buscar_usuario",)
  .get("/favoritos",)
})


.listen(3000); //Corre en el puerto 3000

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
