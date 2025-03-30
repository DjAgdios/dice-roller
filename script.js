// On page load, show previous rolls in the log
window.onload = () => {
    displayLog();
  };
  
  // Main function to roll dice and update log
  function rollDamageDice() {
    const numDiceInput = document.getElementById("diceCount");
    const numDice = parseInt(numDiceInput.value) || 1;
  
    let totalDamage = 0;
    let effectCount = 0;
    // We'll build a line-by-line string for the current roll display
    let lines = [];
  
    for (let i = 0; i < numDice; i++) {
      // Roll a number 1-6
      const roll = Math.floor(Math.random() * 6) + 1;
  
      // Decide the outcome text and increment damage/effects as needed
      let outcomeText = "";
      switch (roll) {
        case 1:
          outcomeText = "1 Damage";
          totalDamage += 1;
          break;
        case 2:
          outcomeText = "2 Damage";
          totalDamage += 2;
          break;
        case 3:
        case 4:
          outcomeText = "Miss";
          break;
        case 5:
        case 6:
          outcomeText = "1 Damage + Effect";
          totalDamage += 1;
          effectCount += 1;
          break;
      }
      // e.g. "Rolled a 6 → 1 Damage + Effect"
      lines.push(`Rolled a ${roll} → ${outcomeText}`);
    }
  
    // Now build a final string that includes each line, then totals
    let currentSummary = lines.join("<br>");
  
    // Add a blank line, then the totals
    currentSummary += `<br><br>Total Damage: ${totalDamage}`;
    if (effectCount > 0) {
      currentSummary += `<br>Total Effects Triggered: ${effectCount}`;
    }
  
    // Display the current roll result text
    document.getElementById("currentResult").innerHTML = currentSummary;
  
    // Create a roll object (we'll save this to localStorage)
    const rollResult = {
      numDice: numDice,
      lines: lines,                // store each "Rolled a X → Y" line
      totalDamage: totalDamage,
      effectCount: effectCount,
      timestamp: new Date().toLocaleString(),
    };
  
    // Append to the log in localStorage
    saveRollToLog(rollResult);
  
    // Refresh the log display
    displayLog();
  }
  
  // Saves a roll result object to localStorage
  function saveRollToLog(rollResult) {
    let rollLog = JSON.parse(localStorage.getItem("rollLog")) || [];
    rollLog.push(rollResult);
    localStorage.setItem("rollLog", JSON.stringify(rollLog));
  }
  
  // Reads all roll results from localStorage and displays them (newest first)
  function displayLog() {
    let rollLog = JSON.parse(localStorage.getItem("rollLog")) || [];
    const logContainer = document.getElementById("log");
  
    if (rollLog.length === 0) {
      logContainer.innerHTML = "<p>No previous rolls.</p>";
      return;
    }
  
    let html = "";
  
    // Iterate from newest to oldest
    for (let i = rollLog.length - 1; i >= 0; i--) {
      const rollData = rollLog[i];
      const rollIndex = i + 1;
  
      // Combine the stored lines
      let linesHtml = rollData.lines.join("<br>"); // "Rolled a 6 → 1 Damage + Effect", etc.
  
      linesHtml += `<br><br>Total Damage: ${rollData.totalDamage}`;
      if (rollData.effectCount > 0) {
        linesHtml += `<br>Total Effects Triggered: ${rollData.effectCount}`;
      }
  
      html += `<div class="logEntry">`;
      html += `<strong>Roll #${rollIndex}</strong> (at ${rollData.timestamp}):<br><br>`;
      html += linesHtml;
      html += `</div><hr class="divider">`;
    }
  
    logContainer.innerHTML = html;
  }
  
  // Clears the entire log from localStorage
  function clearLog() {
    if (confirm("Are you sure you want to clear ALL past rolls?")) {
      localStorage.removeItem("rollLog");
      displayLog();
      document.getElementById("currentResult").innerHTML = "";
    }
  }
  
  // Secret key combo (Shift + Alt + C) to toggle the "Clear" button visibility
  document.addEventListener("keydown", function(e) {
    if (e.shiftKey && e.altKey && e.key === "C") {
      const clearBtn = document.getElementById("clearButton");
      clearBtn.classList.toggle("visible");
    }
  });
  