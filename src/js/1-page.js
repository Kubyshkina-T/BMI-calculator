const inputHeight = document.querySelector("#user-height");
const inputWeigth = document.querySelector("#user-weight");
const btn = document.querySelector(".btn-calculator");
const form = document.querySelector(".form-calculator");

const modal = document.querySelector(".modal-overlay");
const btnCloseModal = document.querySelector(".modal-close");
const modalBMI = document.querySelector(".modal-bmi")
const modalText = document.querySelector(".modal-text");


form.addEventListener("submit", onSubmit);

function onSubmit(event){
    event.preventDefault();
    const weight = Number(inputWeigth.value);
    const heigthCM = Number(inputHeight.value);
    const heightM = heigthCM / 100; 
    const bmi = caltulateBMI(weight, heightM);
    modalBMI.textContent = `BMI: ${bmi}`;
   
    let resultText = "";
    if (bmi < 18.5) {
        resultText = "Your BMI calculations indicate you are underweight. Detailed recommendations."
    }
    else if (bmi < 24.9) {
        resultText = `
  Your BMI calculations indicate you are underweight.
  <br>
  <a href="page-norm.html" class="modal-link">More information</a>
`
    }
    else if (bmi < 30) {
        resultText = "Your BMI indicates overweight. Consider adjusting nutrition and activity."
    }
    else {
        "Your BMI indicates obesity. Professional advice is recommended."
    }
    modalText.innerHTML = resultText;
    modal.classList.remove("hidden");
    

}

btn.addEventListener("click", calculator);
function caltulateBMI(kg, m) {
    const summ = kg / (m * m)
    return summ.toFixed(1);
}
console.log(calculator(57, 1.68));

