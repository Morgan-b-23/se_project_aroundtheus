export default class Card {
  constructor({ name, link }, cardSelector, data, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getTemplate();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => {
        this.handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardImageEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__image")
      .cloneNode(true);
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._element = this._cardElement;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
  }
}
