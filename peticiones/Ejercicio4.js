import { getPostById, getCommentsByPostId, elimarPostById } from "./modules/enunciado4.js";
const eliminarPublicacion = async (postId) => {
    const [post] = await getPostById(postId);
    if (!post ) return console.log("No se encontró la publicación con el ID registrado.");

    const comments = await getCommentsByPostId(postId);
    if (comments.length > 0) return console.log("No se puede eliminar la publicación porque tiene comentarios asociados.");

    await elimarPostById(postId);

    const validarEliminacion = await getPostById(postId);
    if (!validarEliminacion.length) return console.log("Publicación eliminada exitosamente.");
}

await eliminarPublicacion(5);