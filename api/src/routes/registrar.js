import { PrismaClient } from '@prisma/client'
import { Elysia } from "elysia";

const prisma = new PrismaClient()
export const registrar = new Elysia({});
// Ruta para registrar un usuario
registrar.post("/api/registrar",async ({body}) => {
    try{
        await prisma.usuarios.create({
            data:{
                nombre: body.nombre,
                direccion_correo: body.direccion_correo,
                contrasena: body.contrasena,
                descripcion: body.descripcion,
            }
        })
        return{
            "estado": 200,
            "mensaje": "Usuario registrado correctamente"
        }
    }
    catch{
        return{
            "estado": 500,
            "error": "El usuario ya esta registrado"
        }
    }
})