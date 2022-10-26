import View from "./View.js";

class FilterView extends View {
  _parentHtml = document.querySelector(".main-view");
  _filters = document.querySelector(".filters");
  _filter = document.querySelector(".filter");

  addHandlerFilterClick(handler) {
    this._filters.addEventListener("click", (e) => {
      const filter = e.target.closest(".filter");
      if (!filter) return;
      const type = filter.dataset["type"];
      console.log(`type: ${type}`);

      // console.log(`${e.target.dataset["cat"]}`);
      handler(e.target.dataset["cat"], type);

      // if (!e.target.classList.contains("filter")) return;
      // else console.log(e.target.dataset["cat"]);
    });
  }

  addHandlerRecipeClick(handler) {
    const previews = document.querySelectorAll(".preview-card");
    previews.forEach((pre) => {
      pre.addEventListener("click", (e) => {
        handler(e.target.closest(".preview-card").id);
      });
    });
  }

  _generateTitle(title) {
    return title.length > 20
      ? `<h5 class="">${title.slice(0, 15)}...</h5>`
      : `<h4 class="flow-text">${title}</h4>`;
  }

  _generateThumbnail(thumb, title) {
    var http = new XMLHttpRequest();
    http.open("HEAD", `${thumb}/preview`, false);
    http.send();
    if (http.status == 404) {
      return `<img src="/recipething/images/placeholder.png" alt="${title}"/>`;
    } else {
      return `
          <img src="${thumb}/preview" alt=${title}"/>
          `;
    }
  }

  //<img class="activator" src="${i.thumbnail}/preview" alt="${i.title}"/>

  _generateMarkup() {
    console.log(`generating results ${this._data}`);
    return `${this._data
      .map(
        (i, idx) => `
        
        <div class="card col s3 m2 l3 small preview-card" id="${i.id}" href="#${
          i.id
        }">
        <div class="card-image waves-effect waves-block waves-light">
        ${this._generateThumbnail(i.thumbnail, i.title)}
        </div>
        <div class="card-detail">
        <span class="card-title flow-text">${this._generateTitle(
          i.title
        )}</span>
        </div>
        </div>
        
        
        `
      )
      .join("")}`;
  }
}

export default new FilterView();
