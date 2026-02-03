// Enunciado 3: (Búsqueda específica de información)
// Un usuario del sistema desea consultar información puntual sobre una publicación
// específica y conocer si existe interacción asociada a ella.
// Requerimientos:
// • Consultar todas las publicaciones.
// • Buscar una publicación específica por su identificador.
// • Consultar los comentarios relacionados con esa publicación.
// • Validar si existen o no comentarios asociados.

// Datos de entrada:

// • ID de la publicación a consultar
// • Endpoint de publicaciones (posts)
// • Endpoint de comentarios (comments)
// Datos de salida:
// • Información detallada de la publicación:
// o Título
// o Contenido
// o Número de comentarios asociados



const busquedaEspecifica = async (postId) => {

    // Consultar todas las publicaciones
    const listarPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const publicaciones = await listarPublicaciones.json(); 

    // Buscar la publicación específica por su identificador
    let publicacionEncontrada = null;
    for (let i = 0; i < publicaciones.length; i++) {
        if (Number(publicaciones[i].id) === Number(postId)) {
            publicacionEncontrada = publicaciones[i];
            break;
        }
    }

    if (publicacionEncontrada === null) {
        console.log("Publicación no encontrada");
        return { error: "Publicación no encontrada" };
    }

    // Consultar los comentarios relacionados con esa publicación
    const listarComentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const comentarios = await listarComentarios.json();

    const informacionPublicacion = {
        titulo: publicacionEncontrada.title,
        contenido: publicacionEncontrada.body,
        numeroComentarios: comentarios.length
    };

    console.log("Información de la publicación específica: ");
    console.log(informacionPublicacion);

    if (informacionPublicacion.numeroComentarios > 0) {
        console.log("Existen comentarios asociados a esta publicación.");
    } else {
        console.log("No existen comentarios asociados a esta publicación.");
    }

    return informacionPublicacion;
}

busquedaEspecifica(1);