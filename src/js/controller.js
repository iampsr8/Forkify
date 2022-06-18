import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// console.log('prateeks in');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //loading recipe
    await model.loadRecipe(id);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

//getting the search results----------------------------------------
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search query
    await model.loadSearchResults(query);

    //render search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(error);
  }
};

//subscriber-publisher pattern of linking functions b/w controller and view-------------------

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
