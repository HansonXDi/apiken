import { PrismaClient } from '@prisma/client';
import { Elysia } from "elysia";

const prisma = new PrismaClient();
export const desmarcarcorreo = new Elysia();

desmarcarcorreo.post('/api/desmarcarcorreo', async (body) => {
    console.log("se ha recibido una petición desmarcarcorreos");
    if (!body) {
        return {
            "estado": 404,
            "error": 'No se han ingresado datos' 
        };
    }
    const {correo_marcador, correo_marcado} = body;
    if (!correo_marcador || !correo_marcado) {
        return { 
            "Estado": 404, 
            "Error" :'Falta la contraseña o el correo'
        };
    }
    const marcador = await prisma.usuarios.findUnique({
        where: {
            direccion_correo: correo_marcador
        }
    });
    if (!marcador) {
        return {
            "estado": 404, 
            "error": 'Tu usuario no ha sido encontrado' 
        };
    }
    const marcado = await prisma.usuarios.findUnique({
        where: {
            direccion_correo: correo_marcado
        }
    });
    
    if (!marcado) {
        return { 
            "estado": 404,
            "error": 'El usuario que quiere agregar como favorito no ha sido encontrado' 
        };
    }
    const relacion_favorito = await prisma.direcciones_Favoritas.findUnique({
        where: {
            usuario_favoritadorId: marcador.id,
            usuario_favoritoId: marcado.id
        }
    });
    if (!relacion_favorito) {
        return { 
            "estado": 404,
            "error": 'Correo marcador no marcado' 
        };
    }
    try {
        await prisma.direcciones_Favoritas.delete({
            where: {
                id: relacion_favorito.id
            }
        });
        console.log("Peticion del tipo desmarcar ha finalizado con exito");
        return {
            "estado": 200, 
            "message": 'Correo desmarcado' 
        };
    } catch (error) {
        console.log("Error al desmarcado al usuario");
        return { 
            "estado": 500,
            error: 'Error al desmarcar correo' 
        };
        
    }
});