import {
  hourlyRate,
  salaryIncome,
  vacationPay,
  totalCashIncome,
  pensionableEarnings,
  insurableEarnings,
  calculateIncomeVariables,
} from "./modules/income.js";

import {
  yearsMaximumPensionableEarnings,
  maximumAnnualInsurableEarnings,
  yearBasicExemption,
  payPeriods,
} from "./modules/constants.js";

import {
  provincialTax,
  cppDeductions,
  yearToDateCPP,
  eiDeductions,
  eiEmployeeContributions,
  eiEmployerContributions,
  eiTotalContributions,
  calculateGeneralTax,
} from "./modules/generalTax.js";

import {
  annualTaxableIncome,
  employeeRetirementContributions,
  alimonyPayments1997,
  cppAdditionalContributions,
  unionDues,
  prescribedZoneDeduction,
  authorizedAnnualDeductions,
  calculateAnnualTaxableIncome,
} from "./modules/annualTaxableIncome.js";

document
  .getElementById("calculateButton")
  .addEventListener("click", calculatepay);

//#region GET INPUTS FROM HTML FILE
// GET INPUTS
let employeeName, employeePosition, hoursWorked, federalClaimAmountTD1;

function getInputs() {
  employeeName = document.getElementById("employeeName").value;
  employeePosition = document.getElementById("position").value;
  hoursWorked = parseFloat(document.getElementById("hoursWorked").value);
  federalClaimAmountTD1 = document.getElementById("federalClaimTD1").value;
  federalClaimAmountTD1 = parseFloat(federalClaimAmountTD1);
  console.info("Got inputs from HTML");
}

//#endregion

//#region BASIC AND ANNUAL FEDERAL TAX

// basic federal tax variables
let basicFederalTax, federalR, federalK, K1, K2, K3, K4;

// annual federal tax payable variables
let annualFederalTaxPayable, federalLabourSponsoredFundsTaxCredit;
federalLabourSponsoredFundsTaxCredit = 750; // remains constant

function calculateBasicAndAnnualTax() {
  // k and r calculations
  if (annualTaxableIncome >= 0 && annualTaxableIncome < 53360) {
    federalR = 0.15;
    federalK = 0;
  } else if (annualTaxableIncome >= 53360 && annualTaxableIncome < 106717) {
    federalR = 0.205;
    federalK = 935;
  } else if (annualTaxableIncome >= 106717 && annualTaxableIncome < 165430) {
    federalR = 0.26;
    federalK = 8804;
  } else if (annualTaxableIncome >= 165430 && annualTaxableIncome < 235675) {
    federalR = 0.29;
    federalK = 13767;
  } else if (annualTaxableIncome >= 235675) {
    federalR = 0.33;
    federalK = 23194;
  }

  /* federal tax calculations
  annualTaxableIncome =
    payPeriods *
      (totalCashIncome -
        employeeRetirementContributions -
        alimonyPayments1997 -
        cppAdditionalContributions -
        unionDues) -
    prescribedZoneDeduction -
    authorizedAnnualDeductions;
   F5 review */

  // basic federal tax formulas
  const CEA = 1368;
  const PM = 12; // REVIEW: The total number of months during which CPP and/or QPP contributions are required to be deducted
  K1 = 0.15 * federalClaimAmountTD1;
  K2 =
    0.15 * (payPeriods * cppDeductions * (0.0495 / 0.0595) * (PM / 12)) +
    0.15 * (payPeriods * eiDeductions);
  K3 = 0;
  K4 = Math.min(0.15 * annualTaxableIncome, 0.15 * CEA);

  basicFederalTax =
    federalR * annualTaxableIncome - federalK - K1 - K2 - K3 - K4;

  annualFederalTaxPayable =
    basicFederalTax - payPeriods * federalLabourSponsoredFundsTaxCredit;

  console.info("Calculated Basic and Annual Federal Tax");
}

//#endregion

//#region DISPLAY RESULTS

function displayResults(totalTax, totalDeductions, netAmount) {
  // Display the results
  document.getElementById("displayedEmployeeName").textContent = employeeName;
  document.getElementById("displayedfederalClaimTD1").textContent =
    federalClaimAmountTD1.toFixed(2);
  document.getElementById("salaryIncome").textContent = salaryIncome.toFixed(2);
  console.log(salaryIncome);
  console.log(typeof salaryIncome);
  document.getElementById("vacationPay").textContent = vacationPay.toFixed(2);
  document.getElementById("totalCashIncome").textContent =
    totalCashIncome.toFixed(2);
  document.getElementById("pensionableEarnings").textContent =
    pensionableEarnings.toFixed(2);
  document.getElementById("insurableEarnings").textContent =
    insurableEarnings.toFixed(2);
  document.getElementById("federalTax").textContent =
    annualFederalTaxPayable.toFixed(2);
  document.getElementById("provincialTax").textContent =
    provincialTax.toFixed(2);
  document.getElementById("totalTax").textContent = totalTax.toFixed(2);
  document.getElementById("cppDeductions").textContent =
    cppDeductions.toFixed(2);
  document.getElementById("eiDeductions").textContent = eiDeductions.toFixed(2);
  document.getElementById("totalDeductions").textContent =
    totalDeductions.toFixed(2);
  document.getElementById("netAmount").textContent = netAmount.toFixed(2);
  document.getElementById("employerContributions").textContent =
    eiTotalContributions.toFixed(2);

  // Show the results
  document.getElementById("payStubResult").style.display = "block";
  event.preventDefault(); // prevent the form from submitting
}

//#endregion

function calculatepay() {
  getInputs();
  calculateIncomeVariables(employeePosition, hoursWorked);
  calculateGeneralTax(pensionableEarnings, insurableEarnings);
  calculateAnnualTaxableIncome(cppDeductions, totalCashIncome);
  calculateBasicAndAnnualTax();

  let totalTax, totalDeductions, netAmount;
  totalTax = annualFederalTaxPayable + provincialTax;

  totalDeductions = totalTax + cppDeductions + eiDeductions;

  netAmount = totalCashIncome - totalDeductions;

  displayResults(totalTax, totalDeductions, netAmount);
}
