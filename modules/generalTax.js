import { payPeriods, yearBasicExemption } from "./constants.js";

//#region TAX (general)

// tax related variables
let provincialTax,
  cppDeductions,
  yearToDateCPP,
  eiDeductions,
  eiEmployeeContributions,
  eiEmployerContributions,
  eiTotalContributions;

function calculateGeneralTax(pensionableEarnings, insurableEarnings) {
  // https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas/t4127-jan/t4127-jan-payroll-deductions-formulas-computer-programs.html#toc59
  yearToDateCPP = 100; // database calc
  const CPPi = 3754.45 * (pensionableEarnings / payPeriods) - yearToDateCPP; // convert into variable
  const CPPii =
    0.0595 * (pensionableEarnings - yearBasicExemption / payPeriods);
  cppDeductions = Math.min(CPPi, CPPii);
  if (cppDeductions < 0) {
    cppDeductions = 0;
  }

  // employer ei + employee ei (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rate-maximum.html)
  eiDeductions = 1.4 * insurableEarnings + insurableEarnings;

  eiEmployeeContributions = 0.163 * insurableEarnings;
  eiEmployerContributions = 1.4 * eiEmployeeContributions;
  eiTotalContributions = eiEmployeeContributions + eiEmployerContributions; //remit this amount to the CRA

  provincialTax = 200; // Setting it temporarily

  console.info("General Tax Calculated");
}

//#endregion

export {
  provincialTax,
  cppDeductions,
  yearToDateCPP,
  eiDeductions,
  eiEmployeeContributions,
  eiEmployerContributions,
  eiTotalContributions,
  calculateGeneralTax,
};
