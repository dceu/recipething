import View from "./View.js";

class CategoriesView extends View {
  _parentHtml = document.querySelector(".categories");
  _markup;

  addHandleRenderer(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup = function () {
    // console.log(this._data);

    return `
    ${this._data
      .map(
        (cat) => `
        <li class="collection-item">
        <a href="#filter?${cat.strCategory}">
        <span class="title filter" data-type="Cat" data-cat="${cat.strCategory}">${cat.strCategory}</span>

        </a>
        </li>
        `
      )
      .join("")}
        `;
  };
}

// <img class="circle" src="${cat.strCategoryThumb}" alt="${cat.strCategoryDescription}"/>
export default new CategoriesView();
