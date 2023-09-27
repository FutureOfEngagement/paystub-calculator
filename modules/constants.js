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

export {yearsMaximumPensionableEarnings,
    maximumAnnualInsurableEarnings,
    yearBasicExemption,
    payPeriods};