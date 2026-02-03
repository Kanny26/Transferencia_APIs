// Enunciado 3: (Búsqueda específica de información)
// Un usuario del sistema desea consultar información puntual sobre una publicación
// específica y conocer si existe interacción asociada a ella.

// Función asíncrona que busca información detallada de una publicación específica
const busquedaEspecifica = async (postId) => {

    // Realizar petición GET para obtener todas las publicaciones desde la API
    const listarPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Convertir la respuesta de publicaciones a formato JSON
    const publicaciones = await listarPublicaciones.json(); 

    // Variable para almacenar la publicación encontrada
    let publicacionEncontrada = null;
    // Recorrer todas las publicaciones para buscar la que coincida con el ID proporcionado
    for (let i = 0; i < publicaciones.length; i++) {
        // Comparar el ID de la publicación actual con el ID buscado (ambos convertidos a número)
        if (Number(publicaciones[i].id) === Number(postId)) {
            publicacionEncontrada = publicaciones[i];
            // Detener el ciclo una vez encontrada la publicación
            break;
        }
    }

    // Validar si la publicación fue encontrada
    if (publicacionEncontrada === null) {
        console.log("Publicación no encontrada");
        return { error: "Publicación no encontrada" };
    }

    // Realizar petición GET para obtener los comentarios asociados a la publicación específica
    const listarComentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Convertir la respuesta de comentarios a formato JSON
    const comentarios = await listarComentarios.json();

    // Crear objeto con la información detallada de la publicación
    const informacionPublicacion = {
        titulo: publicacionEncontrada.title,
        contenido: publicacionEncontrada.body,
        numeroComentarios: comentarios.length
    };

    // Mostrar encabezado en consola
    console.log("Información de la publicación específica: ");
    // Mostrar el objeto completo con la información de la publicación
    console.log(informacionPublicacion);

    // Validar y mostrar si existen comentarios asociados
    if (informacionPublicacion.numeroComentarios > 0) {
        console.log("Existen comentarios asociados a esta publicación.");
    } else {
        console.log("No existen comentarios asociados a esta publicación.");
    }

    // Retornar el objeto con la información de la publicación
    return informacionPublicacion;
}

// Ejecutar la función buscando la publicación con ID 1
busquedaEspecifica(1);