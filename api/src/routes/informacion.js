import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const informacion = new Elysia({});
// Ruta para obtener la información de un usuario
informacion.get('/api/informacion', async ({query}) => {
    // Se verifica que se haya ingresado un correo y llegue correctamente
    console.log("se ha recibido una petición de informacion");
    if(query.direccion_correo === undefined){
        console.log("Error al buscar informacion del usuario1");
        return {
          "estado": 404,
          "error": 'No se han ingresado datos'
        }
    }
    try{
        // Se busca la información del usuario
        const usuario_buscado = await prisma.usuarios.findUnique({
            where: {
                direccion_correo: query.direccion_correo
            },
            // Se seleccionan los campos que se desean obtener
            select:{
              nombre: true,
              direccion_correo: true,
              descripcion: true,
              contrasena: false,
              id: false,
              fecha_creacion: true,
            }
        });
        // Se verifica que se haya encontrado la información
        if(!usuario_buscado){
            console.log("Error al buscar informacion del usuario2");
            return {
                "estado": 404,
                "error": 'No se ha encontrado un usuario con ese correo'
            }
        }
        console.log("Peticion del tipo informacion/usuario ha finalizado con exito");
        // Se retorna la información del usuario
        return {
            "estado": 200,
            "mensaje": 'Usuario encontrado',
            "nombre": usuario_buscado.nombre,
            "direccion_correo": usuario_buscado.direccion_correo,
            "descripcion": usuario_buscado.descripcion,
        };
    }catch(error){
        // Se maneja el error en caso de que haya ocurrido un problema
        console.log("Error al buscar informacion del usuario3");
        return {
            "estado": 500,
            "error": 'Error al buscar la información del usuario'
        }
        
    }});
