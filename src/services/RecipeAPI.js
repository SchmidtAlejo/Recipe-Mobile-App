const API_HOST = "http://192.168.1.15:3000/api";

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
        const response = await fetch((API_HOST + '/favorites'), {
        method: 'DELETE',
        body: JSON.stringify({recipeId: recipeId}),
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
        const response = await fetch((API_HOST + '/likes'), {
        method: 'DELETE',
        body: JSON.stringify({recipeId: recipeId}),
        headers: {
            "Content-type": "application/json",
            'Authorization': token
        }
    });
    const result = response.json();
    return result;
}