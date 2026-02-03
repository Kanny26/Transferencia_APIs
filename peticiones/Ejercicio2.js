// 1. Enunciado 2: (Publicaciones con y sin comentarios)
// El área de contenido necesita identificar qué publicaciones han generado interacción y
// cuáles no. Para ello, se requiere analizar las publicaciones y sus comentarios asociados.

// Requerimientos:
// • Consultar todas las publicaciones.
// • Consultar todos los comentarios.
// • Relacionar comentarios con sus publicaciones.
// • Identificar publicaciones sin comentarios.
// • Clasificar publicaciones según tengan o no comentarios.
// Datos de entrada:

// • Endpoint de publicaciones (posts)
// • Endpoint de comentarios (comments)
// • Identificador de la publicación (postId)
// Datos de salida:

// • Listado de publicaciones con:
// o Título
// o Número de comentarios
// o Estado: “Con comentarios” o “Sin comentarios”


const conYsinComentarios = async () => {
    // Consultar todas las publicaciones

    const listarPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const publicaciones = await listarPublicaciones.json();

    // Consultar todos los comentarios
    const listarComentarios = await fetch(`http://localhost:3000/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const comentarios = await listarComentarios.json();

    const resultadoPublicaciones = [];

    for (let i = 0; i < publicaciones.length; i++) {
        const publicacion = publicaciones[i];
        let numComentarios = 0;

        for (let j = 0; j < comentarios.length; j++) {
            // Convertir el id de la publicación a número para comparar
            if (comentarios[j].postId === Number(publicacion.id)) {
                numComentarios++;
            }
        }

        let estado = "";
        if(numComentarios > 0){
            estado = "Con comentarios";
        } else {
            estado = "Sin comentarios";
        }

        resultadoPublicaciones.push({
            titulo: publicacion.title,
            numeroComentarios: numComentarios,
            estado: estado
        });
    }

    //ver resultado 
    console.log("Listado de publicaciones con y sin comentarios:");
    for (let i = 0; i < resultadoPublicaciones.length; i++) {
        console.log(`Título: ${resultadoPublicaciones[i].titulo} - Número de comentarios: ${resultadoPublicaciones[i].numeroComentarios} - Estado: ${resultadoPublicaciones[i].estado}`);
    }

    return resultadoPublicaciones;
}

conYsinComentarios();