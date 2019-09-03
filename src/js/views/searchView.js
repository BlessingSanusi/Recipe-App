import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const inputClear = () => {
  elements.searchInput.value = "";
};

export const resultClear = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResultPages.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 22) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + newTitle.length + 4 + cur.length <= limit) {
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
  const markup = `
      <li>
          <a class="results__link" href="#${recipe.recipe_id}">
              <figure class="results__fig">
                  <img src="${recipe.image_url}" alt="${recipe.title}">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${limitRecipeTitle(
                    recipe.title
                  )}</h4>
                  <p class="results__author">${recipe.publisher}</p>
              </div>
          </a>
      </li>
  `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createBtn = (page, type) =>
  `
<button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
      type === "prev" ? "left" : "right"
    }"></use>
</svg>

</button>

`;

const renderBtns = (page, numResults, resultPerPage) => {
  const pages = Math.ceil(numResults / resultPerPage);
  let button;

  if (page === 1 && pages > 1) {
    button = createBtn(page, "next");
  } else if (page < pages) {
    button = `
  ${createBtn(page, "prev")}
  ${createBtn(page, "next")}
  `;
  } else if (page === pages && pages > 1) {
    button = createBtn(page, "next");
  }
  elements.searchResultPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResult = (recipes, page = 1, resultPerPage = 10) => {
  //rendering result of current page
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  renderBtns(page, recipes.length, resultPerPage);
};
