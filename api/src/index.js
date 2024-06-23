import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { api } from "./routes/api";

const prisma = new PrismaClient();
const app = new Elysia()

.use(api)

.listen(3000); //Corre en el puerto 3000

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


