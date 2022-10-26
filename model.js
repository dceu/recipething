import {
  API,
  ALL_CATEGORIES,
  ALL_AREA,
  API_KEY,
  API_RANDOM,
  API_WITH_KEY,
  API_RANDOM_WITH_KEY,
  FILTER_BY_CATEGORY,
  ALL_INGREDIENTS,
  FILTER_BY_AREA,
  FILTER_INGREDIENT,
  SINGLE_ID,
} from "./config.js";
import { getJson, get } from "./utilities.js";

export let state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
  filter: {
    type: "",
    query: "",
    data: [],
  },
  categories: [],
  areas: [],
  ingredients: [],
};

const modelData = function (mealObj) {
  const mealObjKeys = Object.keys(mealObj);
  let meal = mealObjKeys
    .filter((key) => !!mealObj[key])
    .reduce((obj, key) => {
      obj[key] = mealObj[key];
      return obj;
    }, {});

  meal = Object.keys(meal)
    .filter((key) => key.includes("str"))
    .reduce((obj, key) => {
      obj[`${key.substring(3)}`] = meal[key];
      return obj;
    }, {});

  meal.ingredients = Object.keys(meal)
    .filter((key) => key.includes("Ingredient"))
    .reduce((arr, key, idx) => {
      arr[idx] = meal[key];
      return arr;
    }, [])
    .filter((ing) => !!ing);

  meal.measures = Object.keys(meal)
    .filter((key) => key.includes("Measure"))
    .reduce((arr, key, idx) => {
      arr[idx] = meal[key];
      return arr;
    }, [])
    .filter((mes) => !!mes);

  meal = Object.keys(meal)
    .filter((key) => !key.includes("Ingredient"))
    .filter((key) => !key.includes("Measure"))
    .reduce((obj, key) => {
      obj[key] = meal[key];
      return obj;
    }, {});

  return meal;
};

const previewData = function (mealObj) {
  return {
    title: mealObj["strMeal"],
    thumbnail: mealObj["strMealThumb"],
    id: mealObj["idMeal"],
  };
};

export const loadRandom = async function () {
  try {
    const data = await getJson(API_RANDOM);
    const [meal] = data.meals;
    // console.log(meal);
    state.recipe = modelData(meal);
    console.log(state.recipe);
    //return data;
  } catch (err) {
    throw err;
  }
};

export const loadRecipe = async function (id) {
  try {
    console.log(`getting: ${API_WITH_KEY}${SINGLE_ID(id)}`);
    const data = await getJson(`${API_WITH_KEY}${SINGLE_ID(id)}`);
    const [meal] = data.meals;
    console.log(meal);
    state.recipe = modelData(meal);
    console.log(state.recipe);
    // return data;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const firstLetter = query.charAt(0).toUpperCase();
    const slice = query.slice(1);
    const handled = firstLetter + slice;

    console.log(`searching for ${handled}`);
    const data = await getJson(
      `${API}${API_KEY}/${FILTER_BY_CATEGORY(handled)}`
    );
    state.search.results = data.meals;
  } catch (err) {
    throw err;
  }
};

export const listAllAreas = async function () {
  try {
    const url = `${API}${API_KEY}/${ALL_AREA}`;
    // console.log(`Listing all Areas via ${url}`);
    const data = await getJson(`${url}`);
    // console.log(`Loading area data:`);
    // console.log(data);
    state.areas = data.meals;
  } catch (err) {
    throw err;
  }
};
export const listAllIngredients = async function () {
  try {
    const url = `${API}${API_KEY}/${ALL_INGREDIENTS}`;
    // console.log(`Listing all ingredients via ${url}`);
    const data = await getJson(`${url}`);
    // console.log(`Loading ingredient data:`);
    // console.log(data);
    state.ingredients = data.meals;
  } catch (err) {
    throw err;
  }
};

export const listAllCategories = async function () {
  try {
    const url = `https://www.themealdb.com/api/json/v2/${API_KEY}/categories.php`;
    // console.log(`Listing all Categories via ${url}`);
    const data = await getJson(`${url}`);
    // console.log("Setting state");
    state.categories = data.categories;
  } catch (err) {
    throw err;
  }
};

export const updateFilter = async function (filter, type) {
  try {
    state.filter.type = type;
    // state.filter.query = query;
    let query;
    // Cat, Area, Ingredients
    if (type === "Cat") {
      query = `${FILTER_BY_CATEGORY(filter)}`;
    }
    if (type === "Area") {
      query = `${FILTER_BY_AREA(filter)}`;
    }
    if (type === "Ingredient") {
      query = `${FILTER_INGREDIENT(filter)}`;
    }

    state.filter.query = `${API_WITH_KEY}${query}`;

    // console.log(`State query: ${state.filter.query}`);

    const data = await getJson(`${API_WITH_KEY}${query}`);
    state.filter.data = Array.from(data.meals.map((m) => previewData(m)));
    // console.log(state.filter.data);
  } catch (err) {
    console.log(err);
  }
};
