import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const desmarcarcorreo = new Elysia();

desmarcarcorreo.delete('/api/desmarcarcorreo', async ({ query }) => {
    console.log("se ha recibido una peticion desmarcarcorreo");
    //se revisa que el correo_marcador y el correo_marcado no lleguen bien definidos
    if(query.correo_marcador === undefined) {
        console.log("falta informacion");
        return {
                "estado": 400,
                "error": 'Falta su correo'
        }
    }
    if (query.correo_marcado === undefined) {
        console.log("falta informacion");
        return {
            "estado": 400,
            "error": 'Falta el correo del usuario que quiere desmarcar como favorito'
        }
    }
    //se busca el usuario que quiere marcar como favorito
    const marcador = await prisma.usuarios.findUnique({
        where: {
            direccion_correo: query.correo_marcador
        }
    });
    //se revisa que el usuario que quiere marcar a alguien como favorito exista
    if (!marcador) {
        console.log("Tu usuario no ha sido encontrado");
        return {
            "estado": 404, 
            "error": 'Tu usuario no ha sido encontrado' 
        };
    }
    //se busca el usuario que se quiere marcar como favorito
    const marcado = await prisma.usuarios.findUnique({
        where: {
            direccion_correo: query.correo_marcado
        }
    });
    //se revisa que el usuario que se quiere marcar como favorito exista
    if (!marcado) {
        console.log("El usuario que quiere desmarcar como favorito no ha sido encontrado");
        return { 
            "estado": 404,
            "error": 'El usuario que quiere desmarcar como favorito no ha sido encontrado' 
        };
    }
    try {
        //se elimina la relacion de favorito entre los dos usuarios
        await prisma.direcciones_Favoritas.delete({
            where: {
                usuario_favoritadorId_usuario_favoritadoId: {
                    usuario_favoritadorId: marcador.id,
                    usuario_favoritadoId: marcado.id
                }
            }
        });
        console.log("Correo desmarcado correctamente");
        return {
            "estado": 200,
            "mensaje": 'Correo desmarcado correctamente'
        };
    } catch (error) {
        //en caso de error se regresa un mensaje de error
        console.log("El correo no esta marcado como favorito");
        return {
            "estado": 500,
            "error": 'El correo no esta marcado como favorito'
        };
    }
    
});    
