import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader } from "./views/base";

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
    renderLoader();
    //search for recipe
    await state.search.getResult();

    searchView.renderResult(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
