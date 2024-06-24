import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const bloquear = new Elysia();

bloquear.post('/api/bloquear', async ({body}) => {
    console.log("se ha recibido una petición bloquear");
    //Revisa si el body esta vacio
    if(!body){
        return {
          "estado": 400,
          "error": 'No se han ingresado datos'
        }
    }
    const {correo_marcador, correo_marcado} = body;
    console.log(correo_marcador);
    console.log(correo_marcado);
    //Revisa si el correo_marcador o el correo_marcado estan vacios
    if(!correo_marcador || !correo_marcado){
        return {
            "estado": 400,
            "error": 'Falta la contraseña o el correo'
        }
    }
    //Busca al usuario que quiere bloquear
    const marcador = await prisma.usuarios.findUnique({
        where:{
            direccion_correo: correo_marcador
        }
    });
    //Si el usuario no existe, se manda un error
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
                usuario_bloqueadoId: marcado.id,
                direccion_bloqueada: marcado.direccion_correo
            }
        });
        console.log("Peticion del tipo bloquear ha finalizado con exito");
        return {
            "estado": 200,
            "mensaje": 'Usuario bloqueado con éxito'
        }
    }catch(e){
        console.log("El usuario ya esta bloqueado");
        return {
            "estado": 500,
            "error": 'El usuario ya esta bloqueado'
        }
        
    }

});