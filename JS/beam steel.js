let pillarCount = 0;
const pillarData = [];

function convertToInches(value, unit) {
    const conversionFactors = {
        feet: 12,
        inches: 1,
        meters: 39.3701,
    };
    return value * conversionFactors[unit];
}

function addPillar() {
    const height = parseFloat(document.getElementById('height').value);
    const heightUnit = document.getElementById('heightUnit').value;
    const heightInFeet = convertToInches(height, heightUnit) / 12;

    const numPillars = parseInt(document.getElementById('numPillars').value);
    const steelRodThickness = parseFloat(document.getElementById('steelRodThickness').value);
    const ringRodThickness = parseFloat(document.getElementById('ringRodThickness').value);
    const numSteelRod = parseInt(document.getElementById('numSteelRod').value);

    pillarCount++;
    pillarData.push({ heightInFeet, numPillars, steelRodThickness, ringRodThickness, numSteelRod });

    const tableBody = document.getElementById('pillarTableBody');
    const row = `
        <tr>
            <td>${pillarCount}</td>
            <td>${heightInFeet.toFixed(2)}</td>
            <td>${steelRodThickness}</td>
            <td>${ringRodThickness}</td>
            <td>${numSteelRod}</td>
            <td>${numPillars}</td>
        </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);

    document.getElementById('pillarTable').style.display = 'block';
}

function calculateSteelWeight() {
    const steelRate = parseFloat(document.getElementById('steelRate').value);
    const ringRodRate = parseFloat(document.getElementById('ringRodRate').value);
    const separation = parseFloat(document.getElementById('separation').value);
    const ringLength = parseFloat(document.getElementById('ringLength').value);

    let totalRings = 0;
    let totalWeight = 0;
    let totalCost = 0;

    const tableBody = document.getElementById('resultTableBody');
    tableBody.innerHTML = ''; // Clear previous results

    pillarData.forEach((pillar, index) => {
        const { heightInFeet, numPillars, steelRodThickness, ringRodThickness, numSteelRod } = pillar;

        const heightInInches = heightInFeet * 12;
        const totalLengthSteelRod = heightInInches * numSteelRod * numPillars;

        const steelRodThicknessInMeters = steelRodThickness / 1000;
        const steelVolume = Math.PI * Math.pow(steelRodThicknessInMeters / 2, 2) * (totalLengthSteelRod * 0.0254);
        const steelWeight = steelVolume * 7850;
        const totalSteelCost = steelWeight * steelRate;

        const numRings = Math.floor(heightInInches / separation) * numPillars;
        totalRings += numRings;
        const totalLengthRingRod = numRings * ringLength;
        const ringRodThicknessInMeters = ringRodThickness / 1000;
        const ringVolume = Math.PI * Math.pow(ringRodThicknessInMeters / 2, 2) * (totalLengthRingRod * 0.0254);
        const ringWeight = ringVolume * 7850;
        const totalRingCost = ringWeight * ringRodRate;

        totalWeight += steelWeight + ringWeight;
        totalCost += totalSteelCost + totalRingCost;

        const steelRow = `
            <tr>
                <td>Steel${index + 1}</td>
                <td>${steelRodThickness}</td>
                <td>${(totalLengthSteelRod / 12).toFixed(2)}</td>
                <td>${steelWeight.toFixed(2)}</td>
                <td>${totalSteelCost.toFixed(2)}</td>
            </tr>
        `;
        const ringRow = `
            <tr>
                <td>Ring${index + 1}</td>
                <td>${ringRodThickness}</td>
                <td>${(totalLengthRingRod / 12).toFixed(2)}</td>
                <td>${ringWeight.toFixed(2)}</td>
                <td>${totalRingCost.toFixed(2)}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', steelRow + ringRow);
    });

    document.getElementById('totalRings').textContent = totalRings;
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    document.getElementById('output').style.display = 'block';
}

function generatePDF() {
    const resultDiv = document.getElementById('output');
    if (resultDiv.style.display !== 'block') {
        alert('Please calculate the steel weight before generating the PDF.');
        return;
    }
    const doc = new jsPDF();
    doc.html(resultDiv, {
        callback: function (doc) {
            doc.save('steel_weight_calculation.pdf');
        },
        margin: 10,
    });
}
