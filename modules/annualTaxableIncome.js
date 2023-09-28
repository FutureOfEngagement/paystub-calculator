import { payPeriods } from "./constants.js";

//#region ANNUAL TAXABLE INCOME

// annual taxable income related variables
let annualTaxableIncome,
  employeeRetirementContributions,
  alimonyPayments1997,
  cppAdditionalContributions,
  unionDues,
  prescribedZoneDeduction,
  authorizedAnnualDeductions;

function calculateAnnualTaxableIncome(cppDeductions, totalCashIncome) {
  // annual taxable income formulas
  employeeRetirementContributions = 0;
  alimonyPayments1997 = 0;
  cppAdditionalContributions = cppDeductions * (0.01 / 0.0595);
  unionDues = 0;
  prescribedZoneDeduction = 0;
  authorizedAnnualDeductions = 0;
  annualTaxableIncome =
    payPeriods * (totalCashIncome - (cppDeductions * 0.01) / 0.0595);

  console.info("Annual Taxable Income Calculated");

  // console.log("Total Cash Income = " + totalCashIncome);
  // console.log("CPP = " + cppDeductions);
  // console.log("Annual Taxable Income = " + annualTaxableIncome);
  // console.log((2329.6 - (121.26 * 0.01) / 0.0595) * 12);
}

//#endregion

export {
  annualTaxableIncome,
  employeeRetirementContributions,
  alimonyPayments1997,
  cppAdditionalContributions,
  unionDues,
  prescribedZoneDeduction,
  authorizedAnnualDeductions,
  calculateAnnualTaxableIncome,
};

//cppdeductions, total cash income,  