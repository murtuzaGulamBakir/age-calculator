document.addEventListener("DOMContentLoaded", function () {
    class DateCalculator {
        constructor(
            dayInput,
            monthInput,
            yearInput,
            ageYears,
            ageMonths,
            ageDays
        ) {
            this.dayInput = dayInput;
            this.monthInput = monthInput;
            this.yearInput = yearInput;

            this.ageYears = ageYears;
            this.ageMonths = ageMonths;
            this.ageDays = ageDays;

            this.addInputListeners();
        }

        addInputListeners() {
            const inputs = [this.dayInput, this.monthInput, this.yearInput];
            inputs.forEach((input) =>
                input.addEventListener("input", () => this.calculateAge())
            );
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
            const day = parseInt(this.dayInput.value);
            const month = parseInt(this.monthInput.value) - 1; // Month is 0-indexed
            const year = parseInt(this.yearInput.value);

            // Validate the input values
            if (
                isNaN(day) ||
                isNaN(month) ||
                isNaN(year) ||
                !this.isValidDate(year, month, day)
            ) {
                return null;
            }

            return new Date(year, month, day);
        }

        isValidDate(year, month, day) {
            const date = new Date(year, month, day);
            return (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day
            );
        }

        getAgeFromBirthDate(birthDate) {
            const today = new Date();
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            // Adjust for negative days
            if (days < 0) {
                months--;
                days += new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    0
                ).getDate();
            }

            if (months < 0) {
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
    }

    // Birth Date Input
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    // Age Display
    const ageYears = document.querySelector(".age .years span");
    const ageMonths = document.querySelector(".age .months span");
    const ageDays = document.querySelector(".age .days span");

    // Initialize the DateCalculator with DOM elements
    new DateCalculator(
        dayInput,
        monthInput,
        yearInput,
        ageYears,
        ageMonths,
        ageDays
    );
});
