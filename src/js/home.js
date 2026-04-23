import '../style.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputHeight = document.querySelector("#user-height");
const inputWeight = document.querySelector("#user-weight");
const form = document.querySelector(".form-calculator");

const modal = document.querySelector(".modal-overlay");
const modalBMI = document.querySelector(".modal-bmi");
const modalText = document.querySelector(".modal-text");
const modalClose = document.querySelector(".modal-close");

form.addEventListener("submit", onSubmit);
modalClose.addEventListener("click", toggleModal);

function onSubmit(event) {
    event.preventDefault();
    console.log("submit works");

  const weight = Number(inputWeight.value);
  const heightCM = Number(inputHeight.value);

  if (!validator(weight, heightCM)) return;

  const heightM = heightCM / 100;
  const bmi = calculateBMI(weight, heightM);

  modalBMI.textContent = `BMI: ${bmi.toFixed(1)}`;

  let resultText = "";

  if (bmi < 18.5) {
    resultText = "Your BMI indicates underweight.";
  } else if (bmi < 24.9) {
    resultText = `
      Your BMI indicates normal weight.
      <br>
      <a href="page-norm.html" class="modal-link">More information</a>
    `;
  } else if (bmi < 30) {
    resultText = `
      Your BMI indicates overweight.
      <br>
      <a href="page-over.html" class="modal-link">More information</a>
    `;
  } else {
    resultText = `
      Your BMI indicates obesity. Professional advice is recommended.
      <br>
      <a href="page-over.html" class="modal-link">More information</a>
    `;
  }

  modalText.innerHTML = resultText;
  modal.classList.remove("hidden");
  form.reset();
}

function calculateBMI(kg, m) {
  return kg / (m * m);
}

function toggleModal() {
  modal.classList.add("hidden");
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