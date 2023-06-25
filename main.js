let isValidform = false;

//1... day data.
const dayInputLabel = document.getElementById("day-label");
const dayErrorMessage = document.getElementById("day-error");
let day;
let isValidDay = false;

//2... month data.
const monthInputLabel = document.getElementById("month-label");
const monthErrorMessage = document.getElementById("month-error");
let month;
let isValidMonth = false;

//2... year data.
const yearInputLabel = document.getElementById("year-label");
const yearErrorMessage = document.getElementById("year-error");
let year;
let isValidYear = false;

function validateInput(input) {
  resetInputValidation(input);
  handleInputMaxLength(input);

  let regex;
  switch (input.name) {
    case "day":
      regex = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;

      if (!regex.test(input.value)) {
        dayInputLabel.classList.add("invalid-label");
        if (!input.value) {
          dayErrorMessage.innerHTML = "This field is required";
        } else {
          dayErrorMessage.innerHTML = "Must be a valid date";
        }
        dayErrorMessage.classList.remove("d-none");
        input.classList.add("invalid-input");
      } else {
        day = input.value;
        isValidDay = true;
      }
      break;
    case "month":
      regex = /^(0[1-9]|1[0-2])$/;

      if (!regex.test(input.value)) {
        monthInputLabel.classList.add("invalid-label");
        if (!input.value) {
          monthErrorMessage.innerHTML = "This field is required";
        } else {
          monthErrorMessage.innerHTML = "Must be a valid date";
        }
        monthErrorMessage.classList.remove("d-none");
        input.classList.add("invalid-input");
      } else {
        month = input.value;
        isValidMonth = true;
      }
      break;
    case "year":
      regex = /^(19[0-9]{2}|2[0-9]{3})$/;

      if (!regex.test(input.value)) {
        yearInputLabel.classList.add("invalid-label");
        if (!input.value) {
          yearErrorMessage.innerHTML = "This field is required";
        } else {
          yearErrorMessage.innerHTML = "Must be a valid date";
        }
        yearErrorMessage.classList.remove("d-none");
        input.classList.add("invalid-input");
      } else {
        year = input.value;
        isValidYear = true;
      }
      break;
  }

  isValidform = isValidYear && isValidMonth && isValidDay;

  if (isValidform) {
    document
      .getElementById("action-button")
      .classList.remove("cursor-not-allowed");
  } else {
    document
      .getElementById("action-button")
      .classList.add("cursor-not-allowed");
  }
}

function resetInputValidation(input) {
  input.classList.remove("invalid-input");
  switch (input.name) {
    case "day":
      isValidDay = false;
      dayInputLabel.classList.remove("invalid-label");
      dayErrorMessage.classList.add("d-none");
      break;
    case "month":
      isValidMonth = false;
      monthInputLabel.classList.remove("invalid-label");
      monthErrorMessage.classList.add("d-none");
      break;
    case "year":
      isValidYear = false;
      yearInputLabel.classList.remove("invalid-label");
      yearErrorMessage.classList.add("d-none");
      break;
  }
}

function handleInputMaxLength(input) {
  if (
    (input.name === "day" || input.name === "month") &&
    input.value.length > 2
  ) {
    input.value = input.value.slice(0, 2);
  } else {
    input.value = input.value.slice(0, 4);
  }
}

function calculateAge() {
  if (!isValidform) {
    return;
  }

  let interval;

  clearInterval(interval);

  let today = new Date();
  let birthDate = new Date(year, month, day);
  let birthdate = new Date(year, month, day);

  if (birthDate > today) {
    let dateGenericError = document.getElementById("date-generic-error");
    dateGenericError.innerHTML = "Date must be in the past";
    dateGenericError.classList.remove("d-none");
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() + 1 - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    var previousMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageMonths--;
    ageDays = previousMonthLastDay - birthDate.getDate() + today.getDate();
  }

  let yearsNumberElement = document.getElementById("years-number");
  let monthsNumberElement = document.getElementById("months-number");
  let daysNumberElement = document.getElementById("days-number");

  let duration = 10000; // Animation duration in milliseconds

  let currentYear = 0; // Starting year
  let yearDifference = ageYears - 0;
  let yearIncrement = Math.ceil(yearDifference / (duration / 1000));

  let currentDay = 0; //starting day
  let dayDifference = ageDays - 0;
  let dayIncrement = Math.ceil(dayDifference / (duration / 1000));

  let currentMonth = 0; //starting month
  let monthDifference = ageMonths - 0;
  let monthIncrement = Math.ceil(monthDifference / (duration / 1000));

  interval = setInterval(() => {
    yearsNumberElement.innerHTML = currentYear;
    monthsNumberElement.innerHTML = currentMonth;
    daysNumberElement.innerHTML = currentDay;

    if (
      currentYear === ageYears &&
      currentDay === ageDays &&
      currentMonth === ageMonths
    ) {
      clearInterval(interval);
    } else {
      currentYear += yearIncrement;
      currentDay += dayIncrement;
      currentMonth += monthIncrement;
      if (currentYear > ageYears) {
        currentYear = ageYears;
      }
      if (currentDay > ageDays) {
        currentDay = ageDays;
      }
      if (currentMonth > ageMonths) {
        currentMonth = ageMonths;
      }
    }
  }, 50);
}
