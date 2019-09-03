import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearloader } from "./views/base";

//global state
const state = {};

const controlSearch = async () => {
  //get a query from view
  const query = searchView.getInput();

  if (query) {
    // add new search object to state
    state.search = new Search(query);

    //preparing for result
    searchView.inputClear();
    searchView.resultClear();
    renderLoader(elements.searchResults);
    //search for recipe
    await state.search.getResult();

    clearloader();
    searchView.renderResult(state.search.result);

    //   try {
    //     await state.search.getResult();

    //     clearloader();
    //     searchView.renderResult(state.search.result);
    //   } catch (err) {
    //     alert("Something went wrong ...");
    //     clearloader();
    //   }
    // }
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.resultClear();
    searchView.renderResult(state.search.result, goToPage);
  }
});
