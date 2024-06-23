import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const login = new Elysia();

login.post('/api/login', async (body) => {
    console.log("Se ha recibido una peticion login");
    if(!body){
      console.log("Error al iniciar sesion1");
        return {
          "estado": 400,
          "error": 'No se han ingresado datos'
        }
    }
    const { correo, contrasena } = body;
    console.log(correo);
    console.log(contrasena);
    if (!correo || !contrasena) {
      console.log("Error al iniciar sesion2");
        return {
          "estado": 400,
          "error": 'Falta la contraseña o el correo'
        }
    }
    try {
        const usuario = await prisma.usuarios.findUnique({
            where: {
                direcion_correo: correo,
                contrasena: contrasena
            }
        });
        if (!usuario) {
          console.log("Error al iniciar sesion3");
            return {
              "estado": 404,
              "error": 'Usuario no encontrado'
            }
        }
        console.log("Peticion del tipo login ha finalizado con exito");
        return {
          "estado": 200,
          "mensaje": 'Sesion iniciada correctamente'
        }
    } catch (error) {      
        console.log("Error al iniciar sesion4");
        return {
          "estado": 500,
          "error": 'Error en el servidor'
        }
        
    }
});