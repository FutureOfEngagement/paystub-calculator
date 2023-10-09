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

let hourlyRate = {
  fundraising: 16.5,
  softwareDeveloper: 16,
  researchSupport: 18,
  socialMedia: 16,
  commCoordinator: 16,
  commOrganizer: 15.5,
  editor: 15.5,
  director: 8,
  rso: 18,
  interiorDesigner: 15.25,
};

//#endregion

export {
  yearsMaximumPensionableEarnings,
  maximumAnnualInsurableEarnings,
  yearBasicExemption,
  payPeriods,
  hourlyRate
};
