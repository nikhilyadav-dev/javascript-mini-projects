let isDobOpen = false;
let dobIconEle = document.querySelector(".dob-icon");
let dobInputEle = document.querySelector(".dob-inputs");
let addDob = document.getElementById("addDobBtn");
let dobInput = document.getElementById("DobInput");
let yearEl = document.getElementById("year");
let monthEl = document.getElementById("month");
let dayEl = document.getElementById("day");
let hourEl = document.getElementById("hour");
let minuteEl = document.getElementById("minute");
let secondEl = document.getElementById("second");
let initialText = document.getElementById("initialText");
let afterText = document.getElementById("afterDobBtnText");
let dateOfBirth;

// DOB Input Section Hide-Show Handling
dobIconEle.addEventListener("click", () => {
  if (isDobOpen) {
    dobInputEle.classList.add("hide");
  } else {
    dobInputEle.classList.remove("hide");
  }
  isDobOpen = !isDobOpen;
});

const makeTwoDigitNumber = (number) => {
  let newNumber = number > 9 ? number : `0${number}`;
  return newNumber;
};

const updateAge = () => {
  let currDate = new Date();
  let diff = currDate - dateOfBirth;
  let year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  let month = Math.floor((diff / (1000 * 60 * 60 * 24 * 365)) % 12);
  let day = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
  let hour = Math.floor(diff / (1000 * 60 * 60)) % 24;
  let minute = Math.floor(diff / (1000 * 60)) % 60;
  let second = Math.floor(diff / 1000) % 60;

  yearEl.innerText = makeTwoDigitNumber(year);
  monthEl.innerText = makeTwoDigitNumber(month);
  dayEl.innerText = makeTwoDigitNumber(day);
  hourEl.innerText = makeTwoDigitNumber(hour);
  minuteEl.innerText = makeTwoDigitNumber(minute);
  secondEl.innerText = makeTwoDigitNumber(second);
  contentToggler();
};

const contentToggler = () => {
  if (dateOfBirth) {
    initialText.classList.add("hide");
    afterText.classList.remove("hide");
  } else {
    initialText.classList.remove("hide");
    afterText.classList.add("hide");
  }
};

const localStorageGetter = () => {
  let year = localStorage.getItem("year");
  let month = localStorage.getItem("month");
  let day = localStorage.getItem("day");
  if (year && month && day) {
    dateOfBirth = new Date(year, month, day);
  }
  updateAge();
  setInterval(updateAge, 1000);
};

const setDOBHandler = () => {
  let dobString = dobInput.value;
  if (dobString.length === 0) {
    alert("Enter Valid DOB");
  }
  dateOfBirth = dobString ? new Date(dobString) : null;
  if (dateOfBirth) {
    localStorage.setItem("year", dateOfBirth.getFullYear());
    localStorage.setItem("month", dateOfBirth.getMonth());
    localStorage.setItem("day", dateOfBirth.getDay());
    updateAge();
    setInterval(updateAge, 1000);
  }
};

// localStorageGetter();

//Add DOB Button
addDob.addEventListener("click", setDOBHandler);
