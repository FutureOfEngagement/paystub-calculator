document
  .getElementById("calculateButton")
  .addEventListener("click", function () {
    const YMPE = 66600; // year's max pensionable earnings (https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html)
    const MIE = 61500; // maximum annual insurable earnings (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html)
    const YBE = 3500; // year's basic exemption (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html)
    const P = 12; // pay periods in a year

    const name = document.getElementById("employeeName").value;
    const position = document.getElementById("position").value;
    const hoursWorked = parseFloat(
      document.getElementById("hoursWorked").value
    );

    // income related variables
    let salaryIncome,
      vacationPay,
      totalCashIncome,
      pensionableEarnings,
      insurableEarnings;

    // tax related variables
    let federalTax,
      provincialTax,
      totalTax,
      cppDeductions,
      yearToDateCPP,
      eiDeductions,
      totalDeductions,
      netAmount;

    if (position === "fundraising") {
      salaryIncome = 16.5 * hoursWorked;
    } else if (position === "softwareDeveloper") {
      salaryIncome = 16 * hoursWorked;
    } else if (position === "researchSupport") {
      salaryIncome = 18 * hoursWorked;
    } else if (position === "socialMedia") {
      salaryIncome = 16 * hoursWorked;
    } else if (position === "commCoordinator") {
      salaryIncome = 16 * hoursWorked;
    } else if (position === "commOrganizer") {
      salaryIncome = 15.5 * hoursWorked;
    } else if (position === "editor") {
      salaryIncome = 15.5 * hoursWorked;
    } else if (position === "director") {
      salaryIncome = 18 * hoursWorked;
    } else if (position === "rso") {
      salaryIncome = 18 * hoursWorked;
    } else if (position === "interiorDesigner") {
      salaryIncome = 15.25 * hoursWorked;
    }

    vacationPay = 0.04 * salaryIncome;
    totalCashIncome = salaryIncome + vacationPay;

    pensionableEarnings = Math.min(totalCashIncome, YMPE / P);

    // REVIEW
    insurableEarnings = Math.min(totalCashIncome, MIE / P);

    // Calculate federal and provincial tax deductions based on tables
    federalTax = 100;
    provincialTax = 100;

    // https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas/t4127-jan/t4127-jan-payroll-deductions-formulas-computer-programs.html#toc59
    yearToDateCPP = 100; // REVIEW
    const CPPi = 3754.45 * (pensionableEarnings / P) - yearToDateCPP;
    const CPPii = 0.0595 * (pensionableEarnings - YBE / P);
    cppDeductions = Math.min(CPPi, CPPii);
    if (cppDeductions < 0) {
      cppDeductions = 0;
    }

    // employer ei + employee ei (https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rate-maximum.html)
    eiDeductions = 1.4 * insurableEarnings + insurableEarnings;

    totalTax = federalTax + provincialTax;
    totalDeductions = totalTax + cppDeductions + eiDeductions;

    netAmount = totalCashIncome - totalDeductions;

    // Display the results
    document.getElementById("displayedEmployeeName").textContent = name;
    document.getElementById("salaryIncome").textContent =
      salaryIncome.toFixed(2);
    document.getElementById("vacationPay").textContent = vacationPay.toFixed(2);
    document.getElementById("totalCashIncome").textContent =
      totalCashIncome.toFixed(2);
    document.getElementById("pensionableEarnings").textContent =
      pensionableEarnings.toFixed(2);
    document.getElementById("insurableEarnings").textContent =
      insurableEarnings.toFixed(2);
    document.getElementById("federalTax").textContent = federalTax.toFixed(2);
    document.getElementById("provincialTax").textContent =
      provincialTax.toFixed(2);
    document.getElementById("totalTax").textContent = totalTax.toFixed(2);
    document.getElementById("cppDeductions").textContent =
      cppDeductions.toFixed(2);
    document.getElementById("eiDeductions").textContent =
      eiDeductions.toFixed(2);
    document.getElementById("totalDeductions").textContent =
      totalDeductions.toFixed(2);
    document.getElementById("netAmount").textContent = netAmount.toFixed(2);

    // Show the results
    document.getElementById("payStubResult").style.display = "block";
  });
