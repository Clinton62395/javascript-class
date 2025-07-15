//  1 : Vérification prénom/nom et passage à l'étape 2
const nextBtn = document.getElementById("btnNext");
const firstNameInput = document.getElementById("username");
const lastNameInput = document.getElementById("userlastname");

// input to uppercase
firstNameInput.addEventListener("input", () => {
  firstNameInput.value = firstNameInput.value.toUpperCase();
  console.log(toUpperCase);
});
lastNameInput.addEventListener("input", () => {
  lastNameInput.value = lastNameInput.value.toUpperCase();
});

let saveuserName = "";
let savelastName = "";
nextBtn.addEventListener("click", function () {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  const nameError = document.getElementById("nameError");
  const lastNameError = document.getElementById("lasnameError");

  nameError.textContent = "";
  lastNameError.textContent = "";

  if (firstName === "") {
    nameError.textContent = "First name is required";
    return;
  }
  if (firstName.length > 15 || firstName.length < 3) {
    nameError.textContent =
      "first name can't be less than 3 words or greater than 15 words";
    return;
  }
  if (lastName === "") {
    lastNameError.textContent = "Last name is required";
    return;
  }
  if (lastName.length > 15 || lastName.length < 3) {
    lastNameError.textContent =
      "last name can't be less than 3 words or greater than 15 words";
    return;
  }

  document.querySelector(".Welcome-div").style.display = "none";
  document.getElementById("accomodation").style.display = "block";

  document.getElementById(
    "usernameShown"
  ).textContent = `Hello, Dear ${lastName} ${firstName}`;

  saveuserName = firstName;
  savelastName = lastName;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();

    nextBtn.click();
  }
});

// Étape 2 : Choix de l’hébergement et passage à l’étape 3

const Cancelbtn = document.getElementById("freebtn");
const accommodationBtn = document.getElementById("hotelbtn");
Cancelbtn.addEventListener("click", () => {
  document.getElementById("accomodation").style.display = "none";

  const element = document.getElementById("alternativeContent");
  element.classList.remove("d-none");
});

accommodationBtn.addEventListener("click", () => {
  const element = document.getElementById("alternativeContent");
  element.classList.add("d-none");

  document.getElementById("accomodation").style.display = "none";
  document.getElementById("room-type").style.display = "block";
  document.getElementById(
    "showName"
  ).textContent = `welcom back Mr/Mdm ${saveuserName} ${savelastName}!`;
});

// Étape 3 : Vérification de la date et du type de chambre
const confirmBtn = document.getElementById("confirmbtn");
const dateInput = document.getElementById("date");
const endDateInput = document.getElementById("endDate");
const roomSelect = document.getElementById("select");
const error = document.getElementById("errorMessage");
const endDateError = document.getElementById("endDateError");
const selectError = document.getElementById("selectError");
const totalDisplay = document.getElementById("hotelprice");

confirmBtn.addEventListener("click", () => {
document.getElementById("choice-btn").classList.remove("d-none");
  error.textContent = "";
  endDateError.textContent = "";
  totalDisplay.textContent = "";
  selectError.textContent = "";

  const startDate = new Date(dateInput.value);
  const endDate = new Date(endDateInput.value);
  const pricePerDay = parseInt(roomSelect.value);

  if (!dateInput.value) {
    error.textContent = "⛔ Please choose a start date";
    return;
  }

  if (!endDateInput.value) {
    endDateError.textContent = "⛔ Please choose an end date";
    return;
  }

  if (startDate > endDate) {
    error.textContent = "⛔ Start date cannot be after end date";
    return;
  }

  if (isNaN(pricePerDay) || pricePerDay === 0) {
    selectError.textContent = "⛔ Please select a valid room type";
    return;
  }

  const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const total = diffDays * pricePerDay;

  totalDisplay.innerHTML = `
    🧾 Duration: <strong>${diffDays}</strong> day(s)<br>
    💰 Total: <strong>N${total.toLocaleString()}</strong>
  `;
});

// Étape 4 : Lancement du compte à rebours
// const backBtn= document.getElementById("backBtn");
// window.addEventListener("click", ()=>{
//   backBtn.
// })
document.getElementById("backBtn").addEventListener("click", () => {
  location.reload(); // Recharge la page
});

const continuebtn = document.getElementById("continuebtn");
continuebtn.addEventListener("click", () => {
  const countingDiv = document.getElementById("counting-div");
  countingDiv.classList.remove("d-none");
  choiceBtn.classList.add("d-none");
});

const startCounting = document.getElementById("startbtn");
const stopBtn = document.getElementById("stopBtn");
let countinDown = "";
startCounting.addEventListener("click", () => {
  startCounting.style.display = "none";
  stopBtn.classList.remove("d-none");

  const targetTime = new Date(dateInput.value);
  countinDown = setInterval(() => {
    // const day= now.getDate();
    // const hours= now.getHours();
    // const minutes= now.getMinutes();
    // const second= now.getSeconds();

    const now = new Date();
    const leftTime = targetTime - now;

    if (leftTime <= 0) {
      clearInterval(countinDown);
      (document.getElementById("expiredTime").textContent =
        "your rente is expiered "),
        leftTime;
      return;
    }

    // calculate time

    const day = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((leftTime / (1000 * 60)) % 60);
    const seconds = Math.floor((leftTime / 1000) % 60);
    document.querySelector(
      ".showTime"
    ).textContent = `${day}d  ${hours}h ${minutes}m ${seconds}s   `;
  }, 1000);
});
stopBtn.addEventListener("click", () => {
  clearInterval(countinDown);
  document.querySelector(".showTime").textContent = "counting stoped";
  document.querySelector(".showTime").style.color = "yellow";
  stopBtn.classList.add("d-none");
  startCounting.classList.remove("d-none");
});
