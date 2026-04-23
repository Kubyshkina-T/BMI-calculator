import "../css/style.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputHeight = document.querySelector("#user-height");
const inputWeight = document.querySelector("#user-weight");
const form = document.querySelector(".calculator-form");

const modal = document.querySelector(".modal-overlay");
const modalBMI = document.querySelector(".modal-bmi");
const modalText = document.querySelector(".modal-text");
const modalClose = document.querySelector(".modal-close");

if (form) {
  form.addEventListener("submit", onSubmit);
}

if (modalClose) {
  modalClose.addEventListener("click", toggleModal);
}

if (modal) {
  modal.addEventListener("click", onOverlayClick);
}

document.addEventListener("keydown", onEscPress);

function onSubmit(event) {
  event.preventDefault();

  const weight = Number(inputWeight.value);
  const heightCM = Number(inputHeight.value);

  if (!validator(weight, heightCM)) return;

  const heightM = heightCM / 100;
  const bmi = calculateBMI(weight, heightM);

  modalBMI.textContent = `BMI: ${bmi.toFixed(1)}`;

  let resultText = "";
  let link = "";

  if (bmi < 18.5) {
    resultText = "Your BMI indicates underweight.";
    link = "./page-under.html";
  } else if (bmi < 25) {
    resultText = "Your BMI indicates normal weight.";
    link = "./page-norm.html";
  } else if (bmi < 30) {
    resultText = "Your BMI indicates overweight.";
    link = "./page-over.html";
  } else {
    resultText =
      "Your BMI indicates obesity. Professional advice is recommended.";
    link = "./page-over.html";
  }

  modalText.innerHTML = `
    ${resultText}
    <br>
    <a href="${link}" class="modal-link">More information</a>
  `;

  modal.classList.remove("hidden");
  form.reset();
}

function calculateBMI(weightKg, heightM) {
  return weightKg / (heightM * heightM);
}

function toggleModal() {
  modal.classList.add("hidden");
}

function onOverlayClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

function onEscPress(event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    toggleModal();
  }
}

function validator(weight, height) {
  if (!weight || Number.isNaN(weight)) {
    iziToast.error({
      message: "Please enter your weight",
    });
    return false;
  }

  if (weight < 30) {
    iziToast.error({
      message: "Weight must be at least 30 kg",
    });
    return false;
  }

  if (weight > 250) {
    iziToast.error({
      message: "Weight must be no more than 250 kg",
    });
    return false;
  }

  if (!height || Number.isNaN(height)) {
    iziToast.error({
      message: "Please enter your height",
    });
    return false;
  }

  if (height < 100) {
    iziToast.error({
      message: "Height must be at least 100 cm",
    });
    return false;
  }

  if (height > 250) {
    iziToast.error({
      message: "Height must be no more than 250 cm",
    });
    return false;
  }

  return true;
}