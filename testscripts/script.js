document.addEventListener("DOMContentLoaded", function () {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const ageYears = document.querySelector(".age .years span");
    const ageMonths = document.querySelector(".age .months span");
    const ageDays = document.querySelector(".age .days span");

    function calculateAge() {
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            ageYears.textContent = "--";
            ageMonths.textContent = "--";
            ageDays.textContent = "--";
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        let ageInYears = today.getFullYear() - birthDate.getFullYear();
        let ageInMonths = today.getMonth() - birthDate.getMonth();
        let ageInDays = today.getDate() - birthDate.getDate();

        if (ageInDays < 0) {
            ageInMonths--;
            ageInDays += new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();
        }

        if (ageInMonths < 0) {
            ageInYears--;
            ageInMonths += 12;
        }

        ageYears.textContent = ageInYears >= 0 ? ageInYears : "--";
        ageMonths.textContent = ageInMonths >= 0 ? ageInMonths : "--";
        ageDays.textContent = ageInDays >= 0 ? ageInDays : "--";
    }

    dayInput.addEventListener("input", calculateAge);
    monthInput.addEventListener("input", calculateAge);
    yearInput.addEventListener("input", calculateAge);
});
