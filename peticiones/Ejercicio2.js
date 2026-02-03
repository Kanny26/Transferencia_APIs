// Enunciado 2: (Publicaciones con y sin comentarios)
// El área de contenido necesita identificar qué publicaciones han generado interacción y
// cuáles no. Para ello, se requiere analizar las publicaciones y sus comentarios asociados.

// Función asíncrona que clasifica publicaciones según tengan o no comentarios
const conYsinComentarios = async () => {
    
    // Realizar petición GET para obtener todas las publicaciones desde la API
    const listarPublicaciones = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Convertir la respuesta de publicaciones a formato JSON
    const publicaciones = await listarPublicaciones.json();

    // Realizar petición GET para obtener todos los comentarios desde la API
    const listarComentarios = await fetch(`http://localhost:3000/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Convertir la respuesta de comentarios a formato JSON
    const comentarios = await listarComentarios.json();

    // Crear array vacío para almacenar el resultado final
    const resultadoPublicaciones = [];

    // Recorrer cada publicación para contar sus comentarios
    for (let i = 0; i < publicaciones.length; i++) {
        const publicacion = publicaciones[i];
        // Inicializar contador de comentarios en 0
        let numComentarios = 0;

        // Recorrer todos los comentarios para contar los que pertenecen a la publicación actual
        for (let j = 0; j < comentarios.length; j++) {
            // Comparar el postId del comentario con el id de la publicación (convertido a número)
            if (comentarios[j].postId === Number(publicacion.id)) {
                numComentarios++;
            }
        }

        // Determinar el estado según la cantidad de comentarios
        let estado = "";
        if (numComentarios > 0) {
            estado = "Con comentarios";
        } else {
            estado = "Sin comentarios";
        }

        // Agregar la publicación con su información al array de resultados
        resultadoPublicaciones.push({
            titulo: publicacion.title,
            numeroComentarios: numComentarios,
            estado: estado
        });
    }

    // Mostrar encabezado en consola
    console.log("Listado de publicaciones con y sin comentarios:");
    // Recorrer e imprimir cada publicación con su número de comentarios y estado
    for (let i = 0; i < resultadoPublicaciones.length; i++) {
        console.log(`Título: ${resultadoPublicaciones[i].titulo} - Número de comentarios: ${resultadoPublicaciones[i].numeroComentarios} - Estado: ${resultadoPublicaciones[i].estado}`);
    }

    // Retornar el array con los resultados
    return resultadoPublicaciones;
}

// Ejecutar la función principal
conYsinComentarios();