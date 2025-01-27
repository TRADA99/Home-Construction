document.addEventListener("DOMContentLoaded", () => {
    let finalFreeSpaceVolume = 0;
    let finalWallVolume = 0;
    let NofreeSpaces = 0;

    const resultTableBody = document.querySelector("#resultTable tbody");
    const wallTableBody = document.querySelector("#wallTable tbody");
    const freeSpaceTableBody = document.querySelector("#freeSpaceTable tbody");

    const wallLengthInput = document.getElementById("wallLength");
    const wallHeightInput = document.getElementById("wallHeight");
    const wallThicknessInput = document.getElementById("wallThickness");
    const wallLengthUnit = document.getElementById("wallLengthUnit");
    const wallHeightUnit = document.getElementById("wallHeightUnit");
    const wallThicknessUnit = document.getElementById("wallThicknessUnit");

    const brickHeightInput = document.getElementById("brickHeight");
    const brickWidthInput = document.getElementById("brickWidth");
    const brickHeightUnit = document.getElementById("brickHeightUnit");
    const brickWidthUnit = document.getElementById("brickWidthUnit");

    const brickCostInput = document.getElementById("brickCost");
    const cementCostInput = document.getElementById("cementCost");
    const sandCostInput = document.getElementById("sandCost");
    const laborCostInput = document.getElementById("laborCost");

    const mortarThicknessInput = document.getElementById("mortarThickness");
    const mortarThicknessUnit = document.getElementById("mortarThicknessUnit");

    const freeLengthInput = document.getElementById("freeLength");
    const freeLengthUnit = document.getElementById("freeLengthUnit");
    const freeWidthInput = document.getElementById("freeWidth");
    const freeWidthUnit = document.getElementById("freeWidthUnit");

    const cementRatioInput = document.getElementById("cementRatio");
    const sandRatioInput = document.getElementById("sandRatio");

    function convertToFeet(value, unit) {
        const conversionFactors = {
            feet: 1,
            inches: 1 / 12,
            meters: 3.28084,
            cm: 0.0328084,
            mm: 0.00328084,
        };
        return value * conversionFactors[unit];
    }

    // Helper Function to Calculate Free Space Volume and Update Table
    function addFreeSpace() {
        const freeLength = convertToFeet(parseFloat(freeLengthInput.value), freeLengthUnit.value);
        const freeWidth = convertToFeet(parseFloat(freeWidthInput.value), freeWidthUnit.value);
        const wallThickness = convertToFeet(parseFloat(wallThicknessInput.value), wallThicknessUnit.value);

        if (freeLength <= 0 || freeWidth <= 0) {
            alert("Invalid Free Length or Width Input");
            return;
        }

        const freeVolume = freeLength * freeWidth * wallThickness;
        finalFreeSpaceVolume += freeVolume;
        NofreeSpaces += 1;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${freeLength.toFixed(2)}</td>
            <td>${freeWidth.toFixed(2)}</td>
            <td>${NofreeSpaces.toFixed(2)}</td>
            <td><button class="removeRow" data-volume="${freeVolume}">Remove</button></td>
        `;
        freeSpaceTableBody.appendChild(row);
    }

    // Helper Function to Add Wall Volume and Update Table
    function addWall() {
        const wallLength = convertToFeet(parseFloat(wallLengthInput.value), wallLengthUnit.value);
        const wallHeight = convertToFeet(parseFloat(wallHeightInput.value), wallHeightUnit.value);
        const wallThickness = convertToFeet(parseFloat(wallThicknessInput.value), wallThicknessUnit.value);
        const numWalls = parseInt(document.getElementById("numWalls").value);

        if (wallLength <= 0 || wallHeight <= 0 || wallThickness <= 0 || numWalls <= 0) {
            alert("Invalid Wall Dimensions or Number of Walls");
            return;
        }

        const wallVolume = wallLength * wallHeight * wallThickness * numWalls - finalFreeSpaceVolume;
        finalWallVolume += wallVolume;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${wallLength.toFixed(2)}</td>
            <td>${wallHeight.toFixed(2)}</td>
            <td>${wallThickness.toFixed(2)}</td>
            <td>${numWalls}</td>
            <td><button class="removeRow" data-volume="${wallVolume}">Remove</button></td>
        `;
        wallTableBody.appendChild(row);
    }

    // Calculate Button Handler
    function calculateResults() {
        const brickHeight = convertToFeet(parseFloat(brickHeightInput.value), brickHeightUnit.value);
        const brickWidth = convertToFeet(parseFloat(brickWidthInput.value), brickWidthUnit.value);
        const wallThickness = convertToFeet(parseFloat(wallThicknessInput.value), wallThicknessUnit.value);
        const mortarThickness = convertToFeet(parseFloat(mortarThicknessInput.value), mortarThicknessUnit.value);

        const brickCost = parseFloat(brickCostInput.value) || 0;
        const cementCost = parseFloat(cementCostInput.value) || 0;
        const sandCost = parseFloat(sandCostInput.value) || 0;
        const laborCost = parseFloat(laborCostInput.value) || 0;

        const cementRatio = parseFloat(cementRatioInput.value) || 0;
        const sandRatio = parseFloat(sandRatioInput.value) || 0;

        const adjustedBrickHeight = brickHeight + mortarThickness;
        const adjustedBrickWidth = brickWidth + mortarThickness;

        const brickVolume = brickHeight * brickWidth * wallThickness;
        const adjustedBrickVolume = adjustedBrickHeight * adjustedBrickWidth * wallThickness;

        const wallVolume = finalWallVolume;
        const numBricks = wallVolume / adjustedBrickVolume;
        const totalBrickVolume = numBricks * brickVolume;
        const brickCostTotal = numBricks * brickCost;

        const totalRatio = cementRatio + sandRatio;
        const mortarVolume = wallVolume - totalBrickVolume;
        const cementVolume = (cementRatio / totalRatio) * mortarVolume;
        const sandVolume = (sandRatio / totalRatio) * mortarVolume;
        const cementBags = Math.ceil(cementVolume / 1); // Assume 1 cubic foot per bag
        const cementCostTotal = cementBags * cementCost;
        const sandCostTotal = sandVolume * sandCost;
        const laborCostTotal = wallVolume * laborCost;

        resultTableBody.innerHTML = `
            <tr>
                <td>Bricks</td>
                <td>${numBricks.toFixed(0)}</td>
                <td>-</td>
                <td>-</td>
                <td>₹${brickCostTotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Cement Bags</td>
                <td>${cementBags}</td>
                <td>${cementVolume.toFixed(2)} cubic ft</td>
                <td>${(cementVolume * 0.0283).toFixed(2)} cubic meters</td>
                <td>₹${cementCostTotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Sand</td>
                <td>-</td>
                <td>${sandVolume.toFixed(2)} cubic ft</td>
                <td>${(sandVolume * 0.0283).toFixed(2)} cubic meters</td>
                <td>₹${sandCostTotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Labor</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>₹${laborCostTotal.toFixed(2)}</td>
            </tr>
        `;
    }
    // Remove Row Handler
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("removeRow")) {
            const row = event.target.closest("tr");
            const volume = parseFloat(event.target.getAttribute("data-volume"));
            if (row.parentNode === freeSpaceTableBody) {
                finalFreeSpaceVolume -= volume;
                NofreeSpaces -= 1;
            } else if (row.parentNode === wallTableBody) {
                finalWallVolume -= volume;
            }
            row.remove();

        }
    });

    // Event Listeners
    document.getElementById("addFreeSpaceBtn").addEventListener("click", addFreeSpace);
    document.getElementById("addWallBtn").addEventListener("click", addWall);
    document.getElementById("calculateBtn").addEventListener("click", calculateResults);
});