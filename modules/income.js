import { employeePosition } from "./displayController.js";

//#region INCOME

let hourlyRate,
  salaryIncome,
  vacationPay,
  totalCashIncome,
  pensionableEarnings,
  insurableEarnings;

function calculateIncomeVariables() {
  switch (employeePosition) {
    case "fundraising":
      hourlyRate = 16.5;
      break;
    case "softwareDeveloper":
      hourlyRate = 16;
      break;
    case "researchSupport":
      hourlyRate = 18;
      break;
    case "socialMedia":
      hourlyRate = 16;
      break;
    case "commCoordinator":
      hourlyRate = 16;
      break;
    case "commOrganizer":
      hourlyRate = 15.5;
      break;
    case "editor":
      hourlyRate = 15.5;
      break;
    case "director":
      hourlyRate = 18;
      break;
    case "rso":
      hourlyRate = 18;
      break;
    case "interiorDesigner":
      hourlyRate = 15.25;
      break;
  }

  salaryIncome = hourlyRate * hoursWorked;
  vacationPay = 0.04 * salaryIncome;
  totalCashIncome = salaryIncome + vacationPay;

  pensionableEarnings = Math.min(
    totalCashIncome,
    yearsMaximumPensionableEarnings / payPeriods
  );

  insurableEarnings = Math.min(
    totalCashIncome,
    maximumAnnualInsurableEarnings / payPeriods
  );

  console.info("Income Variables Calculated");
}

//#endregion

export {hourlyRate,
    salaryIncome,
    vacationPay,
    totalCashIncome,
    pensionableEarnings,
    insurableEarnings, calculateIncomeVariables};