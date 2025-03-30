function rollDamageDice() {
    // Read how many dice we want to roll
    const numDiceInput = document.getElementById("diceCount");
    const numDice = parseInt(numDiceInput.value) || 1;

    let results = [];
    let totalDamage = 0;
    let effectCount = 0;

    for (let i = 0; i < numDice; i++) {
        // Generate a random integer from 1 to 6
        const roll = Math.floor(Math.random() * 6) + 1;
        let resultText = "";

        switch (roll) {
            case 1:
                resultText = `Rolled a 1 → 1 Damage`;
                totalDamage += 1;
                break;
            case 2:
                resultText = `Rolled a 2 → 2 Damage`;
                totalDamage += 2;
                break;
            case 3:
            case 4:
                resultText = `Rolled a ${roll} → Miss`;
                break;
            case 5:
            case 6:
                resultText = `Rolled a ${roll} → 1 Damage + Effect`;
                totalDamage += 1;
                effectCount += 1;
                break;
        }

        results.push(resultText);
    }

    let resultsString = results.join("<br>");
    resultsString += `<br><br><strong>Total Damage:</strong> ${totalDamage}`;

    if (effectCount > 0) {
        resultsString += `<br><strong>Total Effects Triggered:</strong> ${effectCount}`;
    }

    document.getElementById("result").innerHTML = resultsString;
}
