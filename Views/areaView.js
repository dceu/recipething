import View from "./View.js";

class AreaView extends View {
  _parentHtml = document.querySelector(".area");
  _markup;

  addHandleRenderer(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup = function () {
    return `
    ${this._data
      .map(
        (cat) => `
        <li class="collection-item">
        <a href="#filter?${cat.strArea ? cat.strArea : ""}">
        <span class="title filter" data-cat="${cat.strArea}" data-type="Area">${
          cat.strArea
        }</span>
        </a>
        </li>
        `
      )
      .join("")}
        `;
  };
}

// <img class="circle" src="${cat.strCategoryThumb}" alt="${cat.strCategoryDescription}"/>
export default new AreaView();
