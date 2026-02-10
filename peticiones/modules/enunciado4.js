export const getPostById = async (id) => {
    const response = await fetch(`http://localhost:3000/posts?id=${id}`);
    return await response.json();
}; 

export const getCommentsByPostId = async (postId) => {
    const response = await fetch(`http://localhost:3000/comments?postId=${postId}`)
    return await response.json();
}

export const elimarPostById = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE"
    });
    return await response.json();
}