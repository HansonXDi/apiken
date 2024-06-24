import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { informacion } from "./informacion";
import { marcarcorreo } from "./marcarcorreo";
import { desmarcarcorreo } from "./desmarcarcorreo";
import { verfavoritos } from "./verfavoritos";
import { bloquear } from "./bloquear";
import { login } from "./login";
import{ registrar } from "./registrar";

const prisma = new PrismaClient();
export const api = new Elysia({})

.use(informacion)
.use(marcarcorreo)
.use(desmarcarcorreo)
.use(verfavoritos)
.use(bloquear)
.use(login)
.use(registrar)