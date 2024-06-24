import { PrismaClient } from '@prisma/client'
import { Elysia } from "elysia";

const prisma = new PrismaClient()
export const marcarcorreo = new Elysia({});
//Ruta para marcar un correo como favorito
marcarcorreo.post('/api/marcarcorreo', async ({body}) => {
  console.log("se ha recibido una peticion marcarcorreo");
  if (!body) {
    console.log("Error1");
      return {
        "estado": 404,
        "error": 'No se han ingresado datos'
      }
  }
  //Se obtienen los datos del cuerpo de la petición
  const {correo_marcador, correo_marcado} = body;
  if (!correo_marcador || !correo_marcado) {
    console.log("Error2");
      return {
        "estado": 404,
        "error": 'Falta la contraseña o el correo'
      }
  }
  //Se busca el usuario que quiere marcar como favorito a otro
  const marcador = await prisma.usuarios.findUnique({
    where: {
        direccion_correo: correo_marcador
    }
});
//Se verifica si el usuario que quiere marcar como favorito existe
if (!marcador) {
    console.log("Tu usuario no ha sido encontrado");
    return {
        "estado": 404, 
        "error": 'Tu usuario no ha sido encontrado' 
    };
}
//Se busca el usuario que se quiere marcar como favorito
const marcado = await prisma.usuarios.findUnique({
    where: {
        direccion_correo: correo_marcado
    }
});
//Se verifica si el usuario que se quiere marcar como favorito existe
if (!marcado) {
    console.log("El usuario que quiere marcar como favorito no ha sido encontrado");
    return { 
        "estado": 404,
        "error": 'El usuario que quiere marcar como favorito no ha sido encontrado' 
    };
}
//Se verifica si el usuario ya ha sido marcado como favorito
  const esta_Favorito = await prisma.direcciones_Favoritas.findUnique({
    where: {
      usuario_favoritadorId_usuario_favoritadoId: {
        usuario_favoritadorId: marcador.id,
        usuario_favoritadoId: marcado.id
      }
    }
});
//Si el usuario ya ha sido marcado como favorito se envía un mensaje de error
if (esta_Favorito) {
    console.log("El usuario ya ha sido marcado como favorito");
    return { 
        "estado": 400 ,
        "error": "El usuario ya ha sido marcado como favorito"
    };
}

try {
    //Se crea la petición para marcar como favorito al usuario
    await prisma.direcciones_Favoritas.create({
        data: {
            usuario_favoritadorId: marcador.id,
            usuario_favoritadoId: marcado.id,
            direccion_favorita: marcado.direccion_correo
        }
    });
    //En caso de que la petición se haya realizado correctamente
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
        "error": "Ha existido un error al realizar la petición"
    };
    
}
});