// Your fetch requests will live here!

export const fetchUsers = fetch(
  "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users"
)
  .then((response) => response.json())
  .then((data) => {
    return data.users;
  });

export const fetchIngredients = fetch(
  "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients"
)
  .then((response) => response.json())
  .then((data) => {
    return data.ingredients;
  });

export const fetchRecipes = fetch(
  " https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes"
)
  .then((response) => response.json())
  .then((data) => {
    return data.recipes;
  });
