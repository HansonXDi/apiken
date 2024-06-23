import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const informacion = new Elysia({});

informacion.get('/api/informacion', async ({body}) => {
    console.log("se ha recibido una petición de informacion");
    if(!body){
        return {
          "estado": 404,
          "error": 'No se han ingresado datos'
        }
    }
    const {correo} = body;
    if(!correo){
        return {
          "estado": 404,
          "error": 'Falta la contraseña o el correo'
        }
    }
    try{
        const usuario_buscado = await prisma.usuarios.findUnique({
            where: {
                direccion_correo: correo
            },
            select:{
              nombre: true,
              direccion_correo: true,
              descripcion: true,
              contrasena: false,
              id: false,
              fecha_creacion: true,
            }
        });
        if(!usuario_buscado){
            return {
                "estado": 404,
                "error": 'No se ha encontrado un usuario con ese correo'
            }
        }
        console.log("Peticion del tipo informacion/usuario ha finalizado con exito");
        return {
            "estado": 200,
            "data": usuario
        }
    }catch(error){
        console.log("Error al buscar informacion del usuario");
        return {
            "estado": 500,
            "error": 'Error al buscar la información del usuario'
        }
        
    }});
