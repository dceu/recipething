// API Constants
// www.themealdb.com/api/json/v1/1/random.php
// export const API_KEY = `I-TDKXWBL9FJ8J`;
export const API_KEY = `9973533`;
// export const API_KEY = `1`;
export const API_WITH_KEY = `https://www.themealdb.com/api/json/v2/${API_KEY}/`;
export const API = `https://www.themealdb.com/api/json/v2/`;

// Random
export const API_RANDOM = `https://www.themealdb.com/api/json/v1/1/random.php`;
export const API_RANDOM_WITH_KEY = `https://www.themealdb.com/api/json/v2/${API_KEY}/random.php`;
// Search
export const SEARCH_FIRSTLETTER = (a) => `search.php?f=${a}`;
export const SEARCH_BYNAME = (name) => `search.php?s=${name}`;

// Full Recipe
export const SINGLE_ID = (id) => `lookup.php?i=${id}`;

// Lists and Alls
export const ALL_CATEGORIES = `/categories.php`;
export const LATEST = `/latest.php`;

export const ALL_INGREDIENTS = `list.php?i=list`;
export const ALL_AREA = `list.php?a=list`;

// Filters
export const FILTER_INGREDIENT = (ingredient) => `filter.php?i=${ingredient}`;
export const FILTER_MULTI_INGREDIENT = (...ingredients) =>
  `filter.php?i=${ingredients}`;
export const FILTER_BY_CATEGORY = (cat) => `filter.php?c=${cat}`;
export const FILTER_BY_AREA = (area) => `filter.php?a=${area}`;
