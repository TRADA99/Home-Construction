// Helper function to convert units to feet
function convertToFeet(value, unit) {
    switch (unit) {
        case "inches":
            return value / 12;
        case "meters":
            return value * 3.28084;
        case "cm":
            return value / 30.48;
        case "mm":
            return value / 304.8;
        default:
            return value; // Assume feet
    }
}

// Store walls
let walls = [];
let wallCount = 0;

function addWall() {
    const length = parseFloat(document.getElementById("wallLength").value);
    const lengthUnit = document.getElementById("lengthUnit").value;
    const height = parseFloat(document.getElementById("wallHeight").value);
    const heightUnit = document.getElementById("heightUnit").value;
    const thickness = parseFloat(document.getElementById("plasterThickness").value);
    const thicknessUnit = document.getElementById("thicknessUnit").value;
    const numWalls = parseInt(document.getElementById("numWalls").value);
    const freeLength = parseFloat(document.getElementById("freeLength").value);
    const freeLengthUnit = document.getElementById("freeLengthUnit").value;
    const freeHeight = parseFloat(document.getElementById("freeHeight").value);
    const freeHeightUnit = document.getElementById("freeHeightUnit").value;

    const wallLengthFeet = convertToFeet(length, lengthUnit);
    const wallHeightFeet = convertToFeet(height, heightUnit);
    const plasterThicknessFeet = convertToFeet(thickness, thicknessUnit);
    const freeAreaFeet =
        convertToFeet(freeLength, freeLengthUnit) * convertToFeet(freeHeight, freeHeightUnit);

    walls.push({
        id: ++wallCount,
        length: wallLengthFeet,
        height: wallHeightFeet,
        thickness: plasterThicknessFeet,
        numWalls,
        freeArea: freeAreaFeet,
    });

    updateWallTable();
}

function updateWallTable() {
    const wallTableBody = document.querySelector("#wallTable tbody");
    wallTableBody.innerHTML = "";
    walls.forEach((wall, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${wall.length.toFixed(2)} ft</td>
            <td>${wall.height.toFixed(2)} ft</td>
            <td>${wall.numWalls}</td>
            <td>${wall.freeArea.toFixed(2)} ft²</td>
            <td><button onclick="removeWall(${wall.id})">Remove</button></td>
        `;
        wallTableBody.appendChild(row);
    });
}

function removeWall(id) {
    walls = walls.filter(wall => wall.id !== id);
    updateWallTable();
}

function calculatePlaster() {
    const cementRatio = parseFloat(document.getElementById("cementRatio").value);
    const sandRatio = parseFloat(document.getElementById("sandRatio").value);
    const cementCostPerBag = parseFloat(document.getElementById("cementCost").value);
    const sandCost = parseFloat(document.getElementById("sandCost").value);
    const sandCostUnit = document.getElementById("sandCostUnit").value;
    const laborCost = parseFloat(document.getElementById("laborCost").value);
    const laborCostUnit = document.getElementById("laborCostUnit").value;

    const sandCostPerSquareFoot = sandCostUnit === "square meters" ? sandCost / 10.764 : sandCost;
    const laborCostPerSquareFoot = laborCostUnit === "square meters" ? laborCost / 10.764 : laborCost;

    let totalArea = 0;
    let totalFreeArea = 0;
    let plasterThicknessFeet = 0;

    walls.forEach(wall => {
        totalArea += wall.length * wall.height * wall.numWalls;
        totalFreeArea += wall.freeArea;
        plasterThicknessFeet = wall.thickness;
    });

    const plasterArea = totalArea - totalFreeArea;
    const plasterVolumeCubicFeet = plasterArea * plasterThicknessFeet;

    const dryVolumeCubicFeet = plasterVolumeCubicFeet * 1.66;

    const totalRatio = cementRatio + sandRatio;
    const cementVolume = (dryVolumeCubicFeet * cementRatio) / totalRatio;
    const sandVolume = (dryVolumeCubicFeet * sandRatio) / totalRatio;

    const cementBags = cementVolume / 1.25; // 1 bag = 1.25 cubic feet
    const cementCost = cementBags * cementCostPerBag;

    const sandCostTotal = sandVolume * sandCostPerSquareFoot;

    const laborCostTotal = plasterArea * laborCostPerSquareFoot;

    const totalCost = cementCost + sandCostTotal + laborCostTotal;

    document.getElementById("cementVolume").innerText = cementVolume.toFixed(2);
    document.getElementById("cementVolumeMeters").innerText = (cementVolume / 35.315).toFixed(2);
    document.getElementById("cementBags").innerText = cementBags.toFixed(2);
    document.getElementById("cementCostRow").innerText = `₹${cementCost.toFixed(2)}`;
    document.getElementById("sandVolume").innerText = sandVolume.toFixed(2);
    document.getElementById("sandVolumeMeters").innerText = (sandVolume / 35.315).toFixed(2);
    document.getElementById("sandCostRow").innerText = `₹${sandCostTotal.toFixed(2)}`;
    document.getElementById("laborCostRow").innerText = `₹${laborCostTotal.toFixed(2)}`;
    document.getElementById("totalCostSummary").innerText = `₹${totalCost.toFixed(2)}`;
    document.getElementById("plasterVolumeFeet").innerText = plasterVolumeCubicFeet.toFixed(2) + " cubic feet";
    document.getElementById("plasterVolumeMeters").innerText = (plasterVolumeCubicFeet / 35.315).toFixed(2) + " cubic meters";
    document.getElementById("plasterAreaFeet").innerText = plasterArea.toFixed(2) + " square feet";
    document.getElementById("plasterAreaMeters").innerText = (plasterArea / 10.764).toFixed(2) + " square meters";
    document.getElementById("freeAreaFeet").innerText = totalFreeArea.toFixed(2) + " square feet";
    document.getElementById("freeAreaMeters").innerText = (totalFreeArea / 10.764).toFixed(2) + " square meters";


    document.getElementById("results").style.display = "block";
}
