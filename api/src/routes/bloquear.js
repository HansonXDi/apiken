import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const bloquear = new Elysia();

bloquear.post('/api/bloquear', async (body) => {
    console.log("se ha recibido una petición bloquear");
    if(!body){
        return {
          "estado": 400,
          "error": 'No se han ingresado datos'
        }
    }
    const {correo_marcador, correo_marcado} = body;
    if(!correo_marcador || !correo_marcado){
        return {
            "estado": 400,
            "error": 'Falta la contraseña o el correo'
        }
    }
    const marcador = await prisma.usuarios.findUnique({
        where:{
            direccion_correo: correo_marcador
        }
    });
    if(!marcador){
        console.log("Peticion del tipo bloquear fallida");
        return {
            "estado": 404,
            "error": 'El usuario no existe'
        }
    }
    const marcado = await prisma.usuarios.findUnique({
        where:{
            direccion_correo: correo_marcado
        }
    });
    if(!marcado){
        console.log("Peticion del tipo bloquear fallida");
        return {
            
            "estado": 404,
            "error": 'El usuario a bloquear no existe'
        }
    }

    try{
        await prisma.direcciones_Bloqueadas.create({
            data:{
                usuario_bloqueadorId: marcador.id,
                usuario_bloqueadoId: marcado.id
            }
        });
        console.log("Peticion del tipo bloquear ha finalizado con exito");
        return {
            "estado": 200,
            "mensaje": 'Usuario bloqueado con éxito'
        }
    }catch(e){
        console.log("Error al bloquear al usuario");
        return {
            "estado": 500,
            "error": 'Error al bloquear al usuario'
        }
        
    }

});