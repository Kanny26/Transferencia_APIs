// Enunciado 4: (Eliminación lógica y validación de datos)
// Antes de eliminar una publicación, el sistema debe validar si dicha publicación tiene
// comentarios asociados. Si tiene comentarios, no debe eliminarse; de lo contrario, puede
// proceder.
// Requerimientos:
// • Consultar las publicaciones.
// • Consultar los comentarios.
// • Verificar si una publicación específica tiene comentarios.
// • Si no tiene comentarios, ejecutar la eliminación.
// • Validar el resultado mediante una nueva consulta.
// Datos de entrada:
// • ID de la publicación
// • Endpoint de publicaciones (posts)
// • Endpoint de comentarios (comments)
// Datos de salida:
// • Mensaje de resultado:
// o “Publicación eliminada correctamente”
// o “No se puede eliminar la publicación porque tiene comentarios”

const eliminarPublicacion = async (postId) => {
    const listarPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const publicaciones = await listarPublicaciones.json();

    let publicacionExistente = false;
    for (let i = 0; i < publicaciones.length; i++) {
        if (Number(publicaciones[i].id) === Number(postId)) {
            publicacionExistente = true;
            break;
        }
    }

    if (publicacionExistente === false) {
        console.log(`la publicación con ID ${postId} no existe.`);
        return { error: `la publicación con ID ${postId} no existe.` };
    }

    const listarComentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const comentarios = await listarComentarios.json();

    if(comentarios.length > 0){
        console.log("No se puede eliminar la publicación porque tiene comentarios");
        return { mensaje: "No se puede eliminar la publicación porque tiene comentarios" };
    }

    const eliminar = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const verificarEliminacion = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(verificarEliminacion.status === 404){
        console.log("Publicación eliminada correctamente");
        return { mensaje: "Publicación eliminada correctamente" };
    } else {
        console.log("Error al eliminar la publicación");
        return { error: "Error al eliminar la publicación" };
    }   
}

eliminarPublicacion(9);
