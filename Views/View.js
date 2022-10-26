export default class View {
  _parentHtml = "";
  _data = "";
  _progressionParent = document.querySelector(".progress");
  _clear() {
    this._parentHtml.innerHTML = "";
  }

  // _progressionMarkup = `<div class="indeterminate"></div>`;
  // _fullyLoaded = `<div class="determinate" style="width:100%"></div>`;

  // renderProgression() {
  //   this._progressionParent.innerHTML = "";
  //   this._progressionParent.insertAdjacentHTML(
  //     "afterbegin",
  //     this._progressionMarkup
  //   );
  // }

  render = function (data) {
    this._data = data;
    // console.log(this._data);
    const markup = this._generateMarkup();
    this._clear();
    this._parentHtml.insertAdjacentHTML("afterbegin", markup);
    // this._progressionParent.innerHTML = "";
    // this._progressionParent.insertAdjacentHTML("afterbegin", this._fullyLoaded);
  };
}
