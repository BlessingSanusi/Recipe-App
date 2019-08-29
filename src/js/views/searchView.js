import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const inputClear = () => {
  elements.searchInput.value = "";
};

export const resultClear = () => {
  elements.searchResults.innerHTML = "";
};

const recipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return result
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const htmlMarkup = `
<li>
<a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
       <img src="${recipe.image_url}" alt="${recipe.title}">
    </figure>
    <div class="results__data">
        <h4 class="results__name">${recipeTitle(recipe.title)}</h4>
        <p class="results__author">${recipe.publisher}</p>
    </div>
</a>
</li>

`;
  elements.searchResults.insertAdjacentHTML("beforeend", htmlMarkup);
};

export const renderResult = recipes => {
  recipes.forEach(renderRecipe);
};
