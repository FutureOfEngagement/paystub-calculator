import { payPeriods} from "./constants.js";

//#region BASIC AND ANNUAL FEDERAL TAX

// basic federal tax variables
let basicFederalTax, federalR, federalK, K1, K2, K3, K4;

// annual federal tax payable variables
let annualFederalTaxPayable, federalLabourSponsoredFundsTaxCredit;
federalLabourSponsoredFundsTaxCredit = 750; // remains constant

function calculateBasicAndAnnualTax(annualTaxableIncome, federalClaimAmountTD1, cppDeductions, eiDeductions) {
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

export {
  basicFederalTax,
  federalR,
  federalK,
  K1,
  K2,
  K3,
  K4,
  annualFederalTaxPayable,
  federalLabourSponsoredFundsTaxCredit, calculateBasicAndAnnualTax
};
