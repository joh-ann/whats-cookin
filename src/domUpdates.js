import { returnListOfUniqueTags } from "../src/functions.js";

const recipeDisplay = document.querySelector(".recipes");
const tagButtons = document.querySelector(".tag-buttons");

export function displayRecipes(array, innerText) {
  let recipeHTML = "";
  array.forEach((recipeEl) => {
    recipeHTML += `<div class="recipe-card"><div class="title-recipe" id=${recipeEl.id}>${recipeEl.name}</div>
    <img
      src="${recipeEl.image}"
      alt="recipe-img"
      id=${recipeEl.id}
    />
    <button class="save-recipe-btn">${innerText}</button>
   </div>`;
  });
  recipeDisplay.innerHTML = recipeHTML;
}

export function displayTags(array) {
  const tagsArray = returnListOfUniqueTags(array);
  let tagsHtml = "";
  tagsArray.forEach((tagEl) => {
    tagsHtml += `<div><button class="btn" id="${tagEl}"></button><p>${tagEl}</p></div>
    `;
  });
  tagButtons.innerHTML = tagsHtml;
}
