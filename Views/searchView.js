import View from "./View.js";

class SearchView extends View {
  _parentHtml = document.querySelector(".search-bar");

  getQuery() {
    const query = this._parentHtml.querySelector("#search").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentHtml.querySelector("#search").value = "";
  }

  addHandlerSearch(handler) {
    this._parentHtml.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
