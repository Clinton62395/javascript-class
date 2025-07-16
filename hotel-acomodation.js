//  1 : Vérification prénom/nom et passage à l'étape 2
const nextBtn = document.getElementById("btnNext");
const firstNameInput = document.getElementById("username");
const lastNameInput = document.getElementById("userlastname");

// input to uppercase
firstNameInput.addEventListener("input", () => {
  firstNameInput.value = firstNameInput.value.toUpperCase();
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
      "first name can't be less than 3 characters or greater than 15 characters";
    return;
  }
  if (lastName === "") {
    lastNameError.textContent = "Last name is required";
    return;
  }
  if (lastName.length > 15 || lastName.length < 3) {
    lastNameError.textContent =
      "last name can't be less than 3 characters or greater than 15 characters";
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
const goBackBtn = document.querySelector(".bnt-back");
Cancelbtn.addEventListener("click", () => {
  document.getElementById("accomodation").style.display = "none";

  const element = document.getElementById("alternativeContent");
  element.classList.remove("d-none");
});
goBackBtn.addEventListener("click", () => {
  const element = document.getElementById("alternativeContent");
  element.classList.add("d-none");
  document.getElementById("accomodation").style.display = "block";
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
const distance = document.getElementById("leftTime");
const selectItemsDiv = document.getElementById("room-type");

// global variable

const newStartDate = "";
const newEndDate = "";
confirmBtn.addEventListener("click", () => {
  // initialise all errors messages span
  error.textContent = "";
  endDateError.textContent = "";
  totalDisplay.textContent = "";
  selectError.textContent = "";

  const startDateRaw = dateInput.value;
  const endDateRaw = endDateInput.value;
  const pricePerDay = parseInt(roomSelect.value);

  const selectedIndex = roomSelect.selectedIndex;

  if (isNaN(pricePerDay) || pricePerDay === 0) {
    selectError.textContent = "⛔ Please select a valid room type";
    return;
  }

  if (!startDateRaw) {
    error.textContent = "⛔ Please choose a start date";
    return;
  }

  if (!endDateRaw) {
    endDateError.textContent = "⛔ Please choose an end date";
    return;
  }

  const startDate = new Date(startDateRaw);
  const endDate = new Date(endDateRaw);

  if (startDate > endDate) {
    error.textContent = "⛔ Start date cannot be after end date";

    return;
  }

  const roomTypeText = roomSelect.options[selectedIndex].text;

  const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const total = diffDays * pricePerDay;

  totalDisplay.innerHTML = ` Room type: <strong>${roomTypeText}</strong>
    🧾 Duration: <strong>${diffDays}</strong> day(s)
    💰 Total: <strong>N${total.toLocaleString()}</strong>
  `;
  totalDisplay.style.marginLeft = "10%";
  totalDisplay.style.marginTop = "20px";
  //

  // Seulement ici : afficher l’étape suivante
  document.getElementById("choice-btn").classList.remove("d-none");
  selectItemsDiv.style.display = "none";
});

document.getElementById("backBtn").addEventListener("click", () => {
  location.reload(); // Recharge la page
});

continuebtn.addEventListener("click", () => {
  // const now = new Date(); // maintenant
  document.getElementById("choice-btn").classList.add("d-none");
  const countingDiv = document.getElementById("counting-div");
  countingDiv.classList.remove("d-none");

  const startDateRaw = dateInput.value;
  const endDateRaw = endDateInput.value;

  const newStartDate = new Date(startDateRaw);
  const newEndDate = new Date(endDateRaw);

  const timeLeft = newEndDate - newStartDate;

  // Si expiré
  if (timeLeft <= 0) {
    document.getElementById("expiredTime").textContent =
      "❌ Your rent has already expired!";
  } else {
    let day = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("day").textContent = `${day}d`;
    document.getElementById("hour").textContent = `${hours}h`;
    document.getElementById("minute").textContent = `${minutes}m`;
    document.getElementById("second").textContent = `${seconds}s`;

    document.getElementById("expiredTime").textContent = "";
  }
});

const startCounting = document.getElementById("startbtn");
const stopBtn = document.getElementById("stopBtn");
let countinDown = "";
startCounting.addEventListener("click", () => {
  document.getElementById("expiredTime").style.display = "none";

  startCounting.style.display = "none";
  stopBtn.classList.remove("d-none");
  const startDateRaw = dateInput.value;
  const endDateRaw = endDateInput.value;

  const now = new Date();
  const newStartDate = new Date(startDateRaw);
  const newEndDate = new Date(endDateRaw);

  const timeLeft = newEndDate - now;

  if (timeLeft <= 0) {
    document.getElementById("expiredTime").style.display = "block";
    document.getElementById("expiredTime").textContent =
      "⏳ The rent has not started yet.";
    stopBtn.classList.add("d-none");
    startCounting.style.display = "block";
    return;
  }

  countinDown = setInterval(() => {
    const now = new Date();
    const endDate = new Date(endDateInput.value);

    const leftTime = endDate - now;

    if (leftTime <= 0) {
      clearInterval(countinDown);
      document.getElementById("expiredTime").textContent =
        "❌ Your rent has expired!";
      return;
    }

    // Calcul du temps restant
    let daysNum = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((leftTime / (1000 * 60)) % 60);
    let seconds = Math.floor((leftTime / 1000) % 60);

    // Formatage avec zéro devant si < 10

    // days = days < 10 ? "0" + days : days;
    let days = daysNum < 10 ? "0" + daysNum : "" + daysNum;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    days += daysNum >= 1 ? "day" : "days";

    // Affichage
    document.getElementById("day").textContent = `${days}`;
    document.getElementById("hour").textContent = `${hours}h`;
    document.getElementById("minute").textContent = `${minutes}m`;
    document.getElementById("second").textContent = `${seconds}s`;

    document.getElementById("expiredTime").textContent = "";
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(countinDown);
  document.getElementById("expiredTime").textContent = "⏸️ Counting paused.";
  document.getElementById("expiredTime").style.display = "flex";
  document.getElementById("expiredTime").style.display = "orange";

  stopBtn.style.display = "none";
  startCounting.style.display = "flex";
});
