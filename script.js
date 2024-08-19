document.addEventListener("DOMContentLoaded", function () {
    class DateCalculator {
        constructor({ inputSelectors, outputSelectors, errorSelector }) {
            this.dayInput = document.querySelector(inputSelectors.day);
            this.monthInput = document.querySelector(inputSelectors.month);
            this.yearInput = document.querySelector(inputSelectors.year);

            this.ageYears = document.querySelector(outputSelectors.years);
            this.ageMonths = document.querySelector(outputSelectors.months);
            this.ageDays = document.querySelector(outputSelectors.days);

            this.inputLabel = inputSelectors.label;
            this.errorSelector = errorSelector;

            this.addInputListeners();
        }

        addInputListeners() {
            const inputs = [this.dayInput, this.monthInput, this.yearInput];
            inputs.forEach((input) => input.addEventListener("input", () => this.calculateAge()));
        }

        calculateAge() {
            const birthDate = this.getBirthDate();

            if (!birthDate) {
                this.displayAge("--", "--", "--");
                return;
            }

            const { years, months, days } = this.getAgeFromBirthDate(birthDate);
            this.displayAge(years, months, days);
        }

        getBirthDate() {
            const day = this.validateField(this.dayInput, 1, 31);
            const month = this.validateField(this.monthInput, 1, 12) - 1; // Month is 0-indexed
            const year = this.validateField(this.yearInput, 1000, new Date().getFullYear());

            if (day === null || month === null || year === null) {
                return null;
            } else if (!this.isValidDate(year, month, day)) {
                [this.dayInput, this.monthInput, this.yearInput].forEach((element) => {
                    this.markInvalid(element, "Invalid date");
                });
                return;
            }

            return new Date(year, month, day);
        }

        validateField(input, min, max) {
            const value = parseInt(input.value);
            if (input?.value.trim() == "") {
                this.markInvalid(input, "This field is required");
                return null;
            } else if (isNaN(value) || value < min || value > max) {
                this.markInvalid(input, "Must be a valid " + input.id);
                return null;
            } else {
                this.clearInvalid(input);
                return value;
            }
        }

        isValidDate(year, month, day) {
            const date = new Date(year, month, day);
            const result = date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
            return result;
        }

        getAgeFromBirthDate(birthDate) {
            const today = new Date();
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            if (days < 0) {
                // Adjust for negative days
                months--;
                days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }

            if (months < 0) {
                // Adjust for negative months
                years--;
                months += 12;
            }

            return { years, months, days };
        }

        displayAge(years, months, days) {
            this.ageYears.textContent = years >= 0 ? years : "--";
            this.ageMonths.textContent = months >= 0 ? months : "--";
            this.ageDays.textContent = days >= 0 ? days : "--";
        }

        setErrorMessage(input, message) {
            const errorElement = input.parentElement.querySelector(this.errorSelector);
            if (errorElement) {
                errorElement.textContent = message;
            }
        }

        markInvalid(input, errorMessage) {
            const label = input.parentElement.querySelector(this.inputLabel);
            input.classList.add("invalid");
            label.classList.add("invalid");
            this.setErrorMessage(input, errorMessage);
        }

        clearInvalid(input) {
            input.classList.remove("invalid");
            input.parentElement.querySelector(this.inputLabel).classList.remove("invalid");
            this.setErrorMessage(input, "");
        }
    }

    // Initialize the DateCalculator with grouped DOM element selectors
    const dateCalculator = new DateCalculator({
        inputSelectors: {
            day: "#day",
            month: "#month",
            year: "#year",
            label: "label",
        },
        outputSelectors: {
            years: ".age .years span",
            months: ".age .months span",
            days: ".age .days span",
        },
        errorSelector: ".error",
    });
});
