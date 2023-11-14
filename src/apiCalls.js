// Your fetch requests will live here!
export function fetchCurrenciesCode() {
  return fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching currencies code:", error);
      throw error;
    });
}

export function fetchCurrencies() {
  return fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching currencies:", error);
      throw error;
    });
}

export const fetchUsers = fetch("https://whats-cookin-api-jd.vercel.app/api/v1/users")
  .then((response) => {
    if(!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data.users;
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    throw error;
  });

export const fetchIngredients = fetch(
  "http://localhost:3001/api/v1/ingredients"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data.ingredients;
  })
  .catch((error) => {
    console.error("Error fetching ingredients:", error);
    throw error;
  })

  export const fetchRecipes = fetch("https://whats-cookin-api-jd.vercel.app/api/v1/recipes")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data.recipes;
  })
  .catch((error) => {
    console.error("Error fetching recipes:", error);
    throw error;
  });

export function sendPostRequest(currentUser, clickedRecipe) {
  return fetch("https://whats-cookin-api-jd.vercel.app/api/v1/usersRecipes", {
    method: 'POST',
    body: JSON.stringify({
      userID: currentUser.id,
      recipeID: clickedRecipe
    }),
    headers: {
       'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw newError(`Response failed with status: ${response.status}`);
    }
    return response.json()
  })
  .then(json => console.log(json))
  .catch((error) => {
    console.error("Error sending POST request:", error);
    throw error;
  });
}

export function sendDeleteRequest(currentUser, clickedRecipe) {
  return fetch("https://whats-cookin-api-jd.vercel.app/api/v1/usersRecipes", {
    method: 'DELETE',
    body: JSON.stringify({
      userID: currentUser.id,
      recipeID: clickedRecipe
    }),
    headers: {
       'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then(json => console.log(json))
  .catch((error) => {
    console.error("Error sending DELETE request:", error);
    throw error;
  });
}
