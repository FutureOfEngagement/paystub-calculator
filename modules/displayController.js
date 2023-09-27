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

export {
  employeeName,
  employeePosition,
  hoursWorked,
  federalClaimAmountTD1,
  getInputs, displayResults
};

