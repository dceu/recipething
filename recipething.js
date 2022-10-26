// 'use strict'


// Selectors
const recipeCard = document.querySelector('.recipe-card');


// API Constants
// www.themealdb.com/api/json/v1/1/random.php
const API_RANDOM = `http://www.themealdb.com/api/json/v1/1/random.php`;


// Utility Functions
const getJson = async function(url) {
    try {
        const res = await fetch(url);
            // console.log(res);
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
}

// Model 
let state = {
    recipe: {},
}

const modelData = function (mealObj) {
    const mealObjKeys = Object.keys(mealObj);
    let meal = mealObjKeys.filter(
        key => !!mealObj[key]
    ).reduce(
        (obj,key) => {
            obj[key] = mealObj[key]
            return obj;
        }, {}
        );

    meal = Object.keys(meal)
            .filter(key => key.includes('str'))
            .reduce(
                (obj, key) =>{
                    obj[`${key.substring(3)}`] = meal[key]
                    return obj
                }, {}
            );
        
    meal.ingredients = Object.keys(meal)
        .filter(
            key => key.includes('Ingredient')
            )
        .reduce(
            (arr, key, idx) => {
                arr[idx] = (meal[key])
                return arr;
            }, []
            ).filter(
                ing => !!ing
                );
                
    meal.measures = Object.keys(meal)
        .filter(
            key => key.includes('Measure')
        ).reduce(
            (arr, key, idx) => {
                arr[idx] = (meal[key])
                return arr;
            }, [] 
        ).filter(
            mes => !!mes
        );
    
    
        
    meal = Object.keys(meal)
        .filter(key => !key.includes('Ingredient'))
        .filter(key => !key.includes('Measure'))
        .reduce(
            (obj, key) => {
                obj[key] = meal[key]
                return obj
            }, {}
            );
    
    return meal;
    
}

const loadRandom = async function(){
    try{
        const data = await getJson(API_RANDOM);
        const [meal] = data.meals;
    // console.log(meal);
        state.recipe = modelData(meal);
        console.log(state.recipe);
        //return data;
    } catch (err) {
        throw err;
    }
}


// View
class RecipeView {
    recipeMarkup = 
    `
        <div class="row recipe-header">
            <div class="col s5 recipe-title"></div>
            <div class="col s7 recipe-description"></div>
        </div>
    
        <div class="row recipe-details">
            <div class="col s5 recipe-ingredients"></div>
            <div class="col s7 recipe-instructions-container">
                <ul class="col s7 recipe-instructions-list">
                  
                </ul>
            </div>
        </div>
    `
    titleMarkup = function(recipe) {
        return (recipe.Meal.split(' ').length > 3) ? `<h4 class='right-align'>${recipe.Meal}</h4>` : `<h2 class='right-align'>${recipe.Meal}</h2>`
    }



    renderRecipe = function(recipe) {
        const ingredients = [...recipe.ingredients]
        const measures = [...recipe.measures]
        
        const instructions = [...recipe.Instructions.split('.')];
        //console.log(recipe.Instructions);
        
        console.log(recipe);

        

        const thumbMarkup = `<img class="responsive-img src="${recipe.MealThumb}">`
        
        const markup = `
        
        <div class="row recipe-header">
            <div class="center-align">
            <img src="${recipe.MealThumb}" alt = "${recipe.Meal}"/>
            </div>
            <div class="col s5 recipe-title">
            ${this.titleMarkup(recipe)}
            </div>
            <div class="col s7 recipe-description"><blockquote>
            <h2>${recipe.Category}</h2>
            <h6><i>${recipe.Area}</i></h6>
            <h6>${(!recipe.Tags) ? ' ' : recipe.Tags}</h6>
            </blockquote></div>
        </div>
    
        <div class="row recipe-details">
            <div  class="col s5 recipe-ingredients left-align">
            <ul class="right-align" list-style="none">
                ${ingredients.map((ing, idx) => `<li>${measures[idx]} <b>${ing}</b> </li>`)
                .join('')}
            </ul>
            
            </div>
            <div class="col s7 recipe-instructions-container">
                <ul list-style="none">
                ${instructions.map((ins) => `<li><p >${ins}</p></li>`)
                .join('')}
                </ul>
                
            </div>
        </div>
        `
        recipeCard.innerHTML = '';
        recipeCard.insertAdjacentHTML('afterbegin', markup);
    }

}

// Controller
const recipeView = new RecipeView();

const recipeControl = async function() {
    try{

    // Load Random
    await loadRandom();
    // console.log(data);
    
    
    // Render
    // console.log(state.recipe);
    recipeView.renderRecipe(state.recipe);
    
    }
    catch(err){
        console.log(err)
    }
}





recipeControl();