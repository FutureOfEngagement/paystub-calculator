import {
  employeeName,
  employeePosition,
  hoursWorked,
  federalClaimAmountTD1,
  getInputs,
  displayResults,
} from "./modules/displayController.js";

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
  provincialTax,
  cppDeductions,
  yearToDateCPP,
  eiDeductions,
  eiEmployeeContributions,
  eiEmployerContributions,
  eiTotalContributions,
  annualTaxableIncome,
  employeeRetirementContributions,
  alimonyPayments1997,
  cppAdditionalContributions,
  unionDues,
  prescribedZoneDeduction,
  authorizedAnnualDeductions,
  basicFederalTax,
  federalR,
  federalK,
  CEA,
  PM,
  K1,
  K2,
  K3,
  K4,
  annualFederalTaxPayable,
  federalLabourSponsoredFundsTaxCredit,

  calculateGeneralTax,
  calculateAnnualTaxableIncome,
  calculateBasicAndAnnualTax,
} from "./modules/tax.js";

document
  .getElementById("calculateButton")
  .addEventListener("click", calculatepay);

//#region CONSTANTS

let yearsMaximumPensionableEarnings,
  maximumAnnualInsurableEarnings,
  yearBasicExemption,
  payPeriods;

// income constants
yearsMaximumPensionableEarnings = 66600; // (https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html)
maximumAnnualInsurableEarnings = 61500; // (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html)
yearBasicExemption = 3500; // (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html)
payPeriods = 12;

//#endregion

function calculatepay() {
  getInputs();
  calculateIncomeVariables();
  calculateGeneralTax();
  calculateAnnualTaxableIncome();
  calculateBasicAndAnnualTax();

  let totalTax, totalDeductions, netAmount;
  totalTax = annualFederalTaxPayable + provincialTax;

  totalDeductions = totalTax + cppDeductions + eiDeductions;

  netAmount = totalCashIncome - totalDeductions;

  displayResults(totalTax, totalDeductions, netAmount);
}
