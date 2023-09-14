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

//#region INCOME

// income related variables
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

//#region DISPLAY RESULTS

function displayResults(totalTax, totalDeductions, netAmount) {
  // Display the results
  document.getElementById("displayedEmployeeName").textContent = employeeName;
  document.getElementById("displayedfederalClaimTD1").textContent =
    federalClaimAmountTD1.toFixed(2);
  document.getElementById("salaryIncome").textContent = salaryIncome.toFixed(2);
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
