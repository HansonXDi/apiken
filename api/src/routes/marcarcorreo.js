import { PrismaClient } from '@prisma/client'
import { Elysia } from "elysia";

const prisma = new PrismaClient()
export const marcarcorreo = new Elysia({});

marcarcorreo.post('/api/marcarcorreo', async ({body}) => {
  console.log("se ha recibido una peticion marcarcorreo");
  if (!body) {
      return {
        "estado": 404,
        "error": 'No se han ingresado datos'
      }
  }

  const {correo_marcador, correo_marcado} = body;

  if (!correo_marcador || !correo_marcado) {
      return {
        "estado": 404,
        "error": 'Falta la contraseña o el correo'
      }
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
        "error": 'El usuario que quiere marcar como favorito no ha sido encontrado' 
    };
}

  const esta_Favorito = await prisma.direcciones_Favoritas.findUnique({
    where: {
      usuario_favoritadorId_usuario_favoritadoId: {
        usuario_favoritadorId: marcador.id,
        usuario_favoritadoId: marcado.id
      }
    }
});
if (esta_Favorito) {
    return { 
        "estado": 400 ,
        "mensaje": "El usuario ya ha marcado como favorito"
    };
}

try {
    await prisma.direcciones_Favoritas.create({
        data: {
            usuario_favoritadorId: marcador.id,
            usuario_favoritadoId: marcado.id
        }
    });
    console.log("Peticion del tipo favorito ha finalizada con exito");
    return {
        "estado": 200,
        "mensaje": "Se realizó la petición correctamente"
    };
} catch (error) {
    //En caso de que ocurra un error durante la consulta
    console.log("Error al marcar correo del usuario");
    return { 
        "estado": 500 ,
        "mensaje": "Ha existido un error al realizar la petición"
    };
    
}
});