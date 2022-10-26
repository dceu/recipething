import View from "./View.js";

class IngredientsView extends View {
  _parentHtml = document.querySelector(".ingredients");
  _markup;

  addHandleRenderer(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup = function () {
    // console.log(`IngredientsView Data: ${this._data}`);

    return `
    ${this._data
      .map(
        (cat) => `
        <li class="collection-item">
        <a href="#filter?${cat.strIngredient ? cat.strIngredient : ""}">
        <span class="title filter" data-cat="${
          cat.strIngredient
        }" data-type="Ingredient">${cat.strIngredient}</span>
        </a>
        </li>
        `
      )
      .join("")}
        `;
  };
}

// <img class="circle" src="${cat.strCategoryThumb}" alt="${cat.strCategoryDescription}"/>
export default new IngredientsView();
