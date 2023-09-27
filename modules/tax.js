//#region TAX (general)

// tax related variables
let provincialTax,
  cppDeductions,
  yearToDateCPP,
  eiDeductions,
  eiEmployeeContributions,
  eiEmployerContributions,
  eiTotalContributions;

function calculateGeneralTax() {
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

//#region ANNUAL TAXABLE INCOME

// annual taxable income related variables
let annualTaxableIncome,
  employeeRetirementContributions,
  alimonyPayments1997,
  cppAdditionalContributions,
  unionDues,
  prescribedZoneDeduction,
  authorizedAnnualDeductions;

function calculateAnnualTaxableIncome() {
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

  // federal tax calculations
  annualTaxableIncome =
    payPeriods *
      (totalCashIncome -
        employeeRetirementContributions -
        alimonyPayments1997 -
        cppAdditionalContributions -
        unionDues) -
    prescribedZoneDeduction -
    authorizedAnnualDeductions;
  // F5 review

  // basic federal tax formulas
  const CEA = 1368;
  const PM = 1; // REVIEW: The total number of months during which CPP and/or QPP contributions are required to be deducted
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

export {
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
};
