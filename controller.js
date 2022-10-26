// Controller
import recipeView from "./Views/recipeView.js";
import sidebarView from "./Views/categoriesView.js";
import {
  state,
  loadRandom,
  listAllCategories,
  listAllAreas,
  loadSearchResults,
  listAllIngredients,
  updateFilter,
  loadRecipe,
} from "./model.js";
import categoriesView from "./Views/categoriesView.js";
import ingredientsView from "./Views/ingredientsView.js";
import resultsView from "./Views/filterView.js";
import searchView from "./Views/searchView.js";
import areaView from "./Views/areaView.js";
import randomView from "./Views/randomView.js";
import filterView from "./Views/filterView.js";

const controlCategory = async function () {
  try {
    // Load Random
    await listAllCategories();
    categoriesView.render(state.categories);
  } catch (err) {
    console.log(err);
  }
};

const controlArea = async function () {
  try {
    await listAllAreas();
    areaView.render(state.areas);
  } catch (err) {
    console.log(err);
  }
};
const controlIngredient = async function () {
  try {
    await listAllIngredients();
    ingredientsView.render(state.ingredients);
  } catch (err) {
    console.log(err);
  }
};

const controlRandom = async function () {
  try {
    // Load Random
    // randomView.renderProgression();
    await loadRandom();
    // console.log(data);

    // Render
    // console.log(state.recipe);
    randomView.render(state.recipe);
  } catch (err) {
    console.log(err);
  }
};

const controlFilter = async function (filter, type) {
  // filterView.renderProgression();
  await updateFilter(filter, type);
  console.log(state.filter.data);
  // console.log(`updated control filter: ${state.filter.data}`);
  filterView.render([...state.filter.data]);
  // add listener for each recipe
  filterView.addHandlerRecipeClick(controlRecipe);
};

const controlRecipe = async function (id) {
  try {
    // recipeView.renderProgression();
    await loadRecipe(id);
    // console.log(state.recipe);
    recipeView.render(state.recipe);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  //recipeView.addHandleRenderer(controlRandom);
  categoriesView.addHandleRenderer(controlCategory);
  areaView.addHandleRenderer(controlArea);
  ingredientsView.addHandleRenderer(controlIngredient);
  //searchView.addHandlerSearch(controlResults);
  randomView.addHandleRenderer(controlRandom);
  filterView.addHandlerFilterClick(controlFilter);
  //controlRecipe("52952");
  M.AutoInit();
};

init();
// const controlResults = async function () {
//   try {
//     // console.log("results control");
//     // 1 Get Search Query
//     const query = searchView.getQuery();

//     if (!query) return;

//     //2 Load Search Results
//     await loadSearchResults(query);

//     //3 Render Results
//     resultsView.render(model.search.results);

//     //4 Render Initial Pagination Buttons
//   } catch (err) {}
// };
