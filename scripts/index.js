import Card from "./Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const priviewImageModal = document.querySelector("#priview-image-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const priviewImageModalCloseButton = priviewImageModal.querySelector(
  "#modal-close-button"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#form-name-input");
const profileDescriptionInput = document.querySelector(
  "#form-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleinput = addCardFormElement.querySelector("#form-title-input");
const cardUrlinput = addCardFormElement.querySelector("#form-url-input");
const priviewImage = document.querySelector(".priview__image");
const priviewTitle = document.querySelector(".priview__title");

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__button");
  //const deltebutton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });

  //deltebutton.addEventListener("click", () => {
  // cardElement.remove();
  // });

  cardImageEl.addEventListener("click", () => {
    priviewImage.src = cardData.link;
    priviewImage.alt = cardData.name;
    priviewTitle.textContent = cardData.name;
    openModal(priviewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleinput.value;
  const link = cardUrlinput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardModal.querySelector(".modal__form").reset();
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function remoteClickClose(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("#modal-close-button")
  ) {
    closeModal(evt.target);
  }
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeOnEscape);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

modalCloseButton.addEventListener("click", () => closeModal(profileEditModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

priviewImageModalCloseButton.addEventListener("click", () =>
  closeModal(priviewImageModal)
);

priviewImageModal.addEventListener("mousedown", remoteClickClose);

addCardModal.addEventListener("mousedown", remoteClickClose);

profileEditModal.addEventListener("mousedown", remoteClickClose);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
