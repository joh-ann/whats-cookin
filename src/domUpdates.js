//NOTE: Your DOM manipulation will occur in this file

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
// function exampleFunction1(person) {
//   console.log(`oh hi there ${person}`)
// }

// function exampleFunction2(person) {
//   console.log(`bye now ${person}`)
// }

// export {
//   exampleFunction1,
//   exampleFunction2,
// }
import {
  createFunction,
  returnFilteredListName,
  returnIngredientNames,
  returnFilteredTag,
  returnRecipeCost,
  returnRecipeDirections,
  returnRecipeTitle,
  returnRecipeTags,
  returnRecipeImgUrl,
  returnListOfUniqueTags,
  returnFilteredRecipeArrayByTagID,
  findRecipeByIngredient,
  findRecipeByName,
  getUserInput,
} from "../src/scripts.js";

import ingredientsData from "../src/data/ingredients.js";

import recipeData from "../src/data/recipes.js";

import usersData from "../src/data/users.js";

const recipeDisplay = document.querySelector(".recipes");

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".modal-overlay");
const modalTitle = document.querySelector(".modal-title");
const modalTags = document.querySelector(".modal-tags");
const modalDirections = document.querySelector(".modal-directions-list");
const modalCost = document.querySelector(".modal-cost");
const modalIngredients = document.querySelector(".modal-ingredients-list");
const closeBtn = document.querySelector(".close-btn");
const tagButtons = document.querySelector(".tag-buttons");
const inputName = document.querySelector(".input-name");
const inputIngredient = document.querySelector(".input-ingredient");

//ON PAGE LOAD
document.addEventListener("DOMContentLoaded", (event) => {
  displayRecipes(recipeData);
  displayTags();
});

function displayRecipes(array) {
  let recipeHTML = "";
  array.forEach((recipeEl) => {
    recipeHTML += `<div class="recipe-card">
    <div class="title-recipe" id=${recipeEl.id}>${recipeEl.name}</div>
    <img
      src="${recipeEl.image}"
      alt="recipe-img"
      id=${recipeEl.id}
    />
    <button class="save-recipe-btn">Save Recipe</button>
   </div>`;
  });
  recipeDisplay.innerHTML = recipeHTML;
}

function displayTags() {
  const tagsArray = returnListOfUniqueTags(recipeData);
  let tagsHtml = "";
  tagsArray.forEach((tagEl) => {
    tagsHtml += `<button class="btn" id="${tagEl}">${tagEl}</button>
    `;
  });
  tagButtons.innerHTML = tagsHtml;
}

//SEARCHING FOR A RECIPE BY NAME
// input.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     const inputValue = input.value;
//     const recipeSearch = returnFilteredListName(recipeData, inputValue);
//     displayRecipes(recipeSearch);
//   }
// });

inputName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const userInput = getUserInput(".input-name");
    const recipeIdsByName = findRecipeByName(userInput, recipeData);
    displayRecipes(recipeIdsByName);
  }
});

inputIngredient.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const userInput = getUserInput(".input-ingredient");
    console.log(userInput);
    const recipeIdsByIngredient = findRecipeByIngredient(
      userInput,
      ingredientsData,
      recipeData
    );
    displayRecipes(recipeIdsByIngredient);
  }
});

// const displayRecipeByIds = (recipeIds) => {
//   const recipesToDisplay = recipeData.filter((recipe) => {
//     return recipeIds.includes(recipe.id);
//   });
//   let recipeHTML = "";

//   recipesToDisplay.forEach((recipeEl) => {
//     recipeHTML += `<div class="recipe-card">
//       <img
//         src="${recipeEl.image}"
//         alt="recipe-img"
//         id=${recipeEl.id}
//       />
//       <button class="save-recipe-btn">Save Recipe</button>
//     </div>`;
//   });
// ​
//   recipeDisplay.innerHTML = recipeHTML;
// }
//CLICKING A TAG ELEMENT
tagButtons.addEventListener("click", (event) => {
  let tagClicked;
  tagClicked = event.target.id;
  const filteredRecipeIDByTag = returnFilteredTag(recipeData, tagClicked);
  const filteredArrayByTagID = returnFilteredRecipeArrayByTagID(
    filteredRecipeIDByTag,
    recipeData
  );
  displayRecipes(filteredArrayByTagID);
});

// CLICKING A RECIPE OR A RECIPE NAME

recipeDisplay.addEventListener("click", (event) => {
  let idClicked;
  idClicked = event.target.id;
  if (idClicked.length === 6) {
    const directions = returnRecipeDirections(recipeData, idClicked);
    const cost = returnRecipeCost(recipeData, ingredientsData, idClicked);
    modalCost.innerText = `Estimated Cost of Ingredients: $${cost}`;
    const ingredients = returnIngredientNames(
      recipeData,
      ingredientsData,
      idClicked
    );
    const title = returnRecipeTitle(recipeData, idClicked);
    modalTitle.innerHTML = title;

    const tags = returnRecipeTags(recipeData, idClicked);
    const url = returnRecipeImgUrl(recipeData, idClicked);

    let directionsHtml = "";
    directions.forEach((directionsEl, index) => {
      let stepNumber = index + 1;
      directionsHtml += `<li>Step ${stepNumber}: ${directionsEl}</li>`;
    });
    modalDirections.innerHTML = directionsHtml;

    let ingredientsHtml = "";
    ingredients.forEach((ingredientEl) => {
      ingredientsHtml += `<li>${ingredientEl}</li>`;
    });
    modalIngredients.innerHTML = ingredientsHtml;

    let tagsHtml = "";
    tags.forEach((tagsEl) => {
      tagsHtml += `<li>${tagsEl}</li>`;
    });
    modalTags.innerHTML = tagsHtml;

    modalOverlay.classList.add("open-modal");

    modalContainer.style.backgroundImage = `linear-gradient(
      rgba(15, 15, 15, 0.7),
      rgba(15, 15, 15, 0.7)
    ), url(${url})`;
  }
});

closeBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("open-modal");
});

export { displayRecipes };
