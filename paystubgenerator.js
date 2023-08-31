document
  .getElementById("calculateButton")
  .addEventListener("click", calculatepay);

function calculatepay() {
  console.log("here");
  const name = document.getElementById("employeeName").value;
  const position = document.getElementById("position").value;
  let hoursWorked = parseFloat(document.getElementById("hoursWorked").value);
  let federalClaimAmountTD1 = document.getElementById("federalClaimTD1").value;
  federalClaimAmountTD1 = parsFloat(federalClaimAmountTD1);

  // income related variables
  let hourlyRate,
    salaryIncome,
    vacationPay,
    totalCashIncome,
    pensionableEarnings,
    insurableEarnings,
    yearsMaximumPensionableEarnings,
    maximumAnnualInsurableEarnings,
    yearBasicExemption,
    payPeriods;

  // tax related variables
  let provincialTax,
    totalTax,
    cppDeductions,
    yearToDateCPP,
    eiDeductions,
    totalDeductions,
    netAmount,
    employerContributions;

  // annual taxable income related variables
  let annualTaxableIncome,
    employeeRetirementContributions,
    alimonyPayments1997,
    cppAdditionalContributions,
    unionDues,
    prescribedZoneDeduction,
    authorizedAnnualDeductions;

  // basic federal tax variables
  let basicFederalTax, federalR, federalK, K1, K2, K3, K4;

  // annual federal tax payable variables
  let annualFederalTaxPayable, federalLabourSponsoredFundsTaxCredit;

  // income constants
  yearsMaximumPensionableEarnings = 66600; // (https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html)
  maximumAnnualInsurableEarnings = 61500; // (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html)
  yearBasicExemption = 3500; // (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html)
  payPeriods = 12;

  // income related formulas
  switch (position) {
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
    maximumAnnualInsurableEarnings / pensionableEarnings
  );

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

  totalTax = annualFederalTaxPayable + provincialTax;
  totalDeductions = totalTax + cppDeductions + eiDeductions;

  netAmount = totalCashIncome - totalDeductions;

  employerContributions = 1.4 * insurableEarnings + cppDeductions;

  // annual taxable income formulas
  employeeRetirementContributions = 0;
  alimonyPayments1997 = 0;
  cppAdditionalContributions = cppDeductions * (0.01 / 0.0595);
  unionDues = 0;
  prescribedZoneDeduction = 0;
  authorizedAnnualDeductions = 0;

  // basic federal tax formulas
  CEA = 1368;
  PM = 1; // REVIEW: The total number of months during which CPP and/or QPP contributions are required to be deducted
  K1 = 0.15 * federalClaimTD1;
  K2 = [
    0.15 * (payPeriods * cppDeductions * (0.0495 / 0.0595) * (PM / 12)) +
      0.15 * (payPeriods * eiDeductions),
  ];
  K4 = Math.min(0.15 * annualTaxableIncome, 0.15 * CEA);

  // federal r and k formulas
  switch (true) {
    case annualTaxableIncome >= 0 && annualTaxableIncome < 53360:
      federalR = 0.15;
      federalK = 0;
      break;
    case annualTaxableIncome >= 53360 && annualTaxableIncome < 106717:
      federalR = 0.205;
      federalK = 935;
      break;
    case (annualTaxableIncome >= 106717 && annualTaxableIncome < 165, 430):
      federalR = 0.26;
      (federalK = 8), 804;
      break;
    case (annualTaxableIncome >= 165, 430 && annualTaxableIncome < 235, 675):
      federalR = 0.29;
      (federalK = 13), 767;
      break;
    case annualTaxableIncome >= 235675:
      federalR = 0.33;
      federalK = 23194;
      break;
  }

  // annual federal tax payable formulas
  federalLabourSponsoredFundsTaxCredit = 750;

  // federal tax calculations
  annualTaxableIncome =
    payPeriods *
      (salaryIncome -
        employeeRetirementContributions -
        alimonyPayments1997 -
        cppAdditionalContributions -
        unionDues) -
    prescribedZoneDeduction -
    authorizedAnnualDeductions;

  basicFederalTax =
    federalR * annualTaxableIncome - federalK - K1 - K2 - K3 - K4;

  annualFederalTaxPayable =
    basicFederalTax - payPeriods * federalLabourSponsoredFundsTaxCredit;

  provincialTax = 200;

  // Display the results
  document.getElementById("displayedEmployeeName").textContent = name;
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
    employerContributions.toFixed(2);

  // Show the results
  document.getElementById("payStubResult").style.display = "block";
}

// to do
// pay period, total tax claim amount td1 and td1 provinc - pre-filled/initi minimum amount, remit this amount to cra, employer contributionst to ei/cpp (same as employee) - diff colour,
// scoping - function vs arrow function javascript
// cases, switches - done
// federal tax formula - done
// model view controller architecture
