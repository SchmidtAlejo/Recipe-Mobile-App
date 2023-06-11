const API_HOST = "http://192.168.1.10:3000/api";

export async function getIngridients(token, query) {
    const response = await fetch(`${API_HOST}/recipes/?ingridientSearch=${query}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getRecipes(token, ingridient) {
    const response = await fetch(`${API_HOST}/recipes/?ingridient=${ingridient}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getRecipeDetails(token, idIngridient) {
    const response = await fetch(`${API_HOST}/recipes/${idIngridient}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getUser(token) {

    const response = await fetch(`${API_HOST}/users`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function registerUser(email, username, password) {
    const nuevoUsuario = { email: email, password: password , username: username}

    const response = await fetch((API_HOST + '/users'), {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: {
            "Content-type": "application/json"
        }
    });
    const result = response.json();
    return result;
}

export async function loginUser(email, password) {
    const userLogin = { email: email, password: password };
    const response = await fetch(`${API_HOST}/users/login`, {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
            "Content-type": "application/json"
        }
    });
    const result = response.json();
    return result;
}

export async function getFavoritesRecipes(token) {
    const response = await fetch(`${API_HOST}/favorites`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getFavoritesRecipe(token, recipeId) {
    const response = await fetch(`${API_HOST}/favorites/${recipeId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function addFavorite(token, recipeId) {
    const response = await fetch((API_HOST + '/favorites'), {
        method: 'POST',
        body: JSON.stringify({recipeId: recipeId}),
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function removeFavorite(token, recipeId) {
        const response = await fetch((API_HOST + '/favorites/'+recipeId), {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getLikes(token, recipeId) {
    const response = await fetch(`${API_HOST}/likes/${recipeId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function addLike(token, recipeId) {
    const response = await fetch((API_HOST + '/likes'), {
        method: 'POST',
        body: JSON.stringify({recipeId: recipeId}),
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function removeLike(token, recipeId) {
        const response = await fetch((API_HOST + '/likes/'+ recipeId), {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getComments(token, recipeId) {
    const response = await fetch(`${API_HOST}/comments/${recipeId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function addComment(token, recipeId, text) {
    const response = await fetch((API_HOST + '/comments'), {
        method: 'POST',
        body: JSON.stringify({recipeId: recipeId, text: text}),
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function removeComment(token, commentId) {
        const response = await fetch((API_HOST + `/comments/${commentId}`), {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function getCommentLike(token, commentId) {
    const response = await fetch(`${API_HOST}/likeComments/${commentId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function addCommentLike(token, commentId) {
    const response = await fetch((API_HOST + '/likeComments'), {
        method: 'POST',
        body: JSON.stringify({commentId: commentId}),
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}

export async function removeCommentLike(token, commentLikeId) {
        const response = await fetch((API_HOST + `/likeComments/${commentLikeId}`), {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}