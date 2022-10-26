import View from "./View.js";

class RecipeView extends View {
  _parentHtml = document.querySelector(".main-view");
  _markup;

  titleMarkup = function (recipe) {
    return recipe.Meal.split(" ").length > 3
      ? `<h4 class='right-align'>${recipe.Meal}</h4>`
      : `<h2 class='right-align'>${recipe.Meal}</h2>`;
  };

  addHandleRenderer(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup = function () {
    const ingredients = [...this._data.ingredients];
    const measures = [...this._data.measures];

    const instructions = [...this._data.Instructions.split(".")];

    const thumbMarkup = `<img class="responsive-img src="${this._data.MealThumb}">`;

    return `
    <div class="card">
    <div class="card-image">
      <img class="responsive-img"src="${this._data.MealThumb}" alt = "${
      this._data.Meal
    }" />
      <span class="card-title darken-1">
        <div class="col s5 recipe-title">
          ${this.titleMarkup(this._data)}
        </div>
        <div class="col s7 recipe-description">
        <blockquote>
          <h2>${this._data.Category}</h2>
          <h6><i>${this._data.Area}</i></h6>
          <h6>${!this._data.Tags ? " " : this._data.Tags}</h6>
        </blockquote></div>
      </span>
    </div>
    

    <!--
    
    <div class="row recipe-header">
        <div class="center-align">
        </div>
    </div>
    <div class="row recipe-details">
    </div>
    -->
        <div class="card-content row recipe-details">
          <div  class="col s5 recipe-ingredients left-align">
          <ul class="right-align" list-style="none">
              ${ingredients
                .map((ing, idx) => `<li>${measures[idx]} <b>${ing}</b> </li>`)
                .join("")}
          </ul>
          
          </div>
          <div class="col s7 recipe-instructions-container">
              <ul list-style="none">
              ${instructions.map((ins) => `<li><p >${ins}</p></li>`).join("")}
              </ul>
              
          </div>
        </div>
        </div>
    
        `;
  };
}

export default new RecipeView();
