import {
  yearsMaximumPensionableEarnings,
  maximumAnnualInsurableEarnings,
  payPeriods, hourlyRate
} from "./constants.js";

//#region INCOME

// income related variables
let rate,
  salaryIncome,
  vacationPay,
  totalCashIncome,
  pensionableEarnings,
  insurableEarnings;

function calculateIncomeVariables(employeePosition, hoursWorked) {
 rate = hourlyRate[employeePosition]

  salaryIncome = rate * hoursWorked;
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

export {
  salaryIncome,
  vacationPay,
  totalCashIncome,
  pensionableEarnings,
  insurableEarnings,
  calculateIncomeVariables,
};
