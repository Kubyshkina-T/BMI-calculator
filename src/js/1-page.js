import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputHeight = document.querySelector("#user-height");
const inputWeight = document.querySelector("#user-weight");
const btn = document.querySelector(".btn-calculator");
const form = document.querySelector(".form-calculator");

const modal = document.querySelector(".modal-overlay");
const btnCloseModal = document.querySelector(".modal-close");
const modalBMI = document.querySelector(".modal-bmi")
const modalText = document.querySelector(".modal-text");
const modalClose = document.querySelector(".modal-close");

const input = document.querySelector(".form-input");

// let formData = {
//     heigth: "",
//     weight: ""
// }


form.addEventListener("submit", onSubmit);
// form.addEventListener("input", onFormInput);


// function onSubmit(event){
//     event.preventDefault();

//     const weight = Number(inputWeight.value);
//     const heightCM = Number(inputHeight.value);
//  if (!validator(weight, heightCM)) return;
// //     const error = validator(weight, heightCM);
// // if (error) {
// //    iziToast.error({ message: error });
// //     return;
// }
//      const heightM = heightCM / 100;
//     const bmi = caltulateBMI(weight, heightM);
    
//     modalBMI.textContent = `BMI: ${bmi}`;

   
//     let resultText = "";

//   if (bmi < 18.5) {
//         resultText = "Your BMI calculations indicate you are underweight. Detailed recommendations."
//     }
//     else if (bmi < 24.9) {
//         resultText = `
//   Your BMI calculations indicate you are underweight.
//   <br>
//   <a href="page-norm.html" class="modal-link">More information</a>
// `
//     }
//     else if (bmi < 30) {
//         resultText = "Your BMI indicates overweight. Consider adjusting nutrition and activity."
//     }
//     else {
//         "Your BMI indicates obesity. Professional advice is recommended."
//     }
//     modalText.innerHTML = resultText;
//     modal.classList.remove("hidden");


function onSubmit(event) {
  event.preventDefault();

  const weight = Number(inputWeight.value);
  const heightCM = Number(inputHeight.value);


  if (!validator(weight, heightCM)) return;

  const heightM = heightCM / 100;
  const bmi = Number(caltulateBMI(weight, heightM));

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
    resultText = `Your BMI indicates overweight. 
      <br>
      <a href="page-over.html" class="modal-link">More information</a>`;
  } else {
    resultText = `Your BMI indicates obesity. Professional advice is recommended.
    <a href="page-over.html" class="modal-link">More information</a>`;
  }

  modalText.innerHTML = resultText;
  modal.classList.remove("hidden");
  form.reset();
}



// function onFormInput(event) {
//     const { name, value } = event.target;
//     if (name !== "user-height" && name !== "user-weight") return;
//     formData[name] = value;
//     localStorage.setItem(storageKey, JSON.stringify(formData));
// }

// function populateForm() {
//     const saved = localStorage.getItem(storageKey)
//     if (!saved) return;
//     const parsed = JSON.parse(saved);
//     formData.heigth = parsed.heigth ?? "";
//     formData.weight = parsed.weight ?? "";
//     form.elements.heigth.value = formData.heigth;
//     form.elements.weight.value = formData.weight;
// }
// // populateForm();

// btn.addEventListener("click", caltulateBMI);
function caltulateBMI(kg, m) {
    const summ = kg / (m * m)
    return summ.toFixed(1);
}


modalClose.addEventListener("click", toggleModal);
function toggleModal() {
    modal.style.display = "none";
}


function validator(weight, height) {
    if (!weight) {
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
    if (!height) {
        iziToast.error({
            message: "Please enter your heigth",
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
   return true;;
}