function updateInputs() {
    const slabType = document.getElementById("slabType").value;
    const form = document.getElementById("dynamicInputs");
    form.innerHTML = ""; // Clear previous inputs

    const getUnitSelect = (id) => `
        <select id="${id}">
            <option value="feet">Feet</option>
            <option value="inches">Inches</option>
            <option value="meters">Meters</option>
            <option value="cm">Centimeters</option>
            <option value="mm">Millimeters</option>
        </select>
    `;

    switch (slabType) {
        case "cube":
            form.innerHTML = `
                <div class="input-group">
                    <label for="length">Length:</label>
                    <input type="number" id="length" name="length">
                    ${getUnitSelect("cubeLengthUnit")}
                </div>
                <div class="input-group">
                    <label for="width">Width:</label>
                    <input type="number" id="width" name="width">
                    ${getUnitSelect("cubeWidthUnit")}
                </div>
                <div class="input-group">
                    <label for="thickness">Thickness:</label>
                    <input type="number" id="thickness" name="thickness" value="0.4167"> <!-- Default: 5 inches -->
                    ${getUnitSelect("cubeThicknessUnit")}
                </div>
            `;
            break;
        case "triangle":
            form.innerHTML = `
                <div class="input-group">
                    <label for="side1">Side 1:</label>
                    <input type="number" id="side1" name="side1">
                    ${getUnitSelect("triangleSide1Unit")}
                </div>
                <div class="input-group">
                    <label for="side2">Side 2:</label>
                    <input type="number" id="side2" name="side2">
                    ${getUnitSelect("triangleSide2Unit")}
                </div>
                <div class="input-group">
                    <label for="side3">Side 3:</label>
                    <input type="number" id="side3" name="side3">
                    ${getUnitSelect("triangleSide3Unit")}
                </div>
                <div class="input-group">
                    <label for="thickness">Thickness:</label>
                    <input type="number" id="thickness" name="thickness" value="0.4167"> <!-- Default: 5 inches -->
                    ${getUnitSelect("triangleThicknessUnit")}
                </div>
            `;
            break;
        case "pyramid":
            form.innerHTML = `
                <div class="input-group">
                    <label for="baseLength">Base Length:</label>
                    <input type="number" id="baseLength" name="baseLength">
                    ${getUnitSelect("pyramidBaseLengthUnit")}
                </div>
                <div class="input-group">
                    <label for="baseWidth">Base Width:</label>
                    <input type="number" id="baseWidth" name="baseWidth">
                    ${getUnitSelect("pyramidBaseWidthUnit")}
                </div>
                <div class="input-group">
                    <label for="topLength">Top Length:</label>
                    <input type="number" id="topLength" name="topLength" value="0"> <!-- Default: 0 -->
                    ${getUnitSelect("pyramidTopLengthUnit")}
                </div>
                <div class="input-group">
                    <label for="topWidth">Top Width:</label>
                    <input type="number" id="topWidth" name="topWidth" value="0"> <!-- Default: 0 -->
                    ${getUnitSelect("pyramidTopWidthUnit")}
                </div>
                <div class="input-group">
                    <label for="height">Height:</label>
                    <input type="number" id="height" name="height" value="2"> <!-- Default: 2 feet -->
                    ${getUnitSelect("pyramidHeightUnit")}
                </div>
            `;
            break;
        case "sphere":
            form.innerHTML = `
                <div class="input-group">
                    <label for="diameter">Diameter:</label>
                    <input type="number" id="diameter" name="diameter" value="1"> <!-- Default: 1 meter -->
                    ${getUnitSelect("sphereDiameterUnit")}
                </div>
            `;
            break;
        case "cone":
            form.innerHTML = `
                <div class="input-group">
                    <label for="topDiameter">Top Diameter:</label>
                    <input type="number" id="topDiameter" name="topDiameter" value="1"> <!-- Default: 1 foot -->
                    ${getUnitSelect("coneTopDiameterUnit")}
                </div>
                <div class="input-group">
                    <label for="baseDiameter">Base Diameter:</label>
                    <input type="number" id="baseDiameter" name="baseDiameter" value="3"> <!-- Default: 3 feet -->
                    ${getUnitSelect("coneBaseDiameterUnit")}
                </div>
                <div class="input-group">
                    <label for="height">Height:</label>
                    <input type="number" id="height" name="height" value="5"> <!-- Default: 5 feet -->
                    ${getUnitSelect("coneHeightUnit")}
                </div>
            `;
            break;
        case "cylinder":
            form.innerHTML = `
                <div class="input-group">
                    <label for="diameter">Diameter:</label>
                    <input type="number" id="diameter" name="diameter" value="1"> <!-- Default: 1 foot -->
                    ${getUnitSelect("cylinderDiameterUnit")}
                </div>
                <div class="input-group">
                    <label for="height">Height:</label>
                    <input type="number" id="height" name="height" value="10"> <!-- Default: 10 feet -->
                    ${getUnitSelect("cylinderHeightUnit")}
                </div>
                <div class="input-group">
                    <label for="height">Angle:</label>
                    <input type="number" id="angle" name="angle" value="360"> <!-- Default: 360 deg -->
                </div>
            `;
            break;
        case "holo-cylinder":
            form.innerHTML = `
                <div class="input-group">
                    <label for="outerDiameter">Outer Diameter:</label>
                    <input type="number" id="outerDiameter" name="outerDiameter" value="6"> <!-- Default: 6 feet -->
                    ${getUnitSelect("holoCylinderOuterDiameterUnit")}
                </div>
                <div class="input-group">
                    <label for="innerDiameter">Inner Diameter:</label>
                    <input type="number" id="innerDiameter" name="innerDiameter" value="5"> <!-- Default: 5 feet -->
                    ${getUnitSelect("holoCylinderInnerDiameterUnit")}
                </div>
                <div class="input-group">
                    <label for="height">Height:</label>
                    <input type="number" id="height" name="height" value="5"> <!-- Default: 5 feet -->
                    ${getUnitSelect("holoCylinderHeightUnit")}
                </div>
            `;
            break;
        default:
            form.innerHTML = "<p>Please select a valid slab type.</p>";
    }
}

let slabCount = 0;
const slabData = [];

/**
 * Converts a given value from the selected unit to feet.
 * @param {number} value - The value to convert.
 * @param {string} unit - The unit of the value (feet, inches, meters, cm, mm).
 * @returns {number} - Converted value in feet.
 */
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

/**
 * Adds a slab to the table and stores its data.
 */

function addSlab() {
    const slabType = document.getElementById("slabType").value;
    const numSlabs = parseInt(document.getElementById("numSlabs").value);

    if (isNaN(numSlabs)) {
        alert("Please enter the number of slabs.");
        return;
    }

    let volume = 0;
    let surfaceArea = 0;

    const convertToFeet = (value, unit) => {
        switch (unit) {
            case "feet": return value;
            case "inches": return value / 12;
            case "meters": return value * 3.28084;
            case "cm": return value / 30.48;
            case "mm": return value / 304.8;
            default: return value;
        }
    };

    try {
        switch (slabType) {
            case "cube": {
                const length = convertToFeet(
                    parseFloat(document.getElementById("length").value),
                    document.getElementById("cubeLengthUnit").value
                );
                const width = convertToFeet(
                    parseFloat(document.getElementById("width").value),
                    document.getElementById("cubeWidthUnit").value
                );
                const thickness = convertToFeet(
                    parseFloat(document.getElementById("thickness").value),
                    document.getElementById("cubeThicknessUnit").value
                );
                if (isNaN(length) || isNaN(width) || isNaN(thickness)) throw new Error();
                volume = length * width * thickness;
                surfaceArea = 2 * (length * width + width * thickness + thickness * length);
                break;
            }
            case "triangle": {
                const side1 = convertToFeet(
                    parseFloat(document.getElementById("side1").value),
                    document.getElementById("triangleSide1Unit").value
                );
                const side2 = convertToFeet(
                    parseFloat(document.getElementById("side2").value),
                    document.getElementById("triangleSide2Unit").value
                );
                const side3 = convertToFeet(
                    parseFloat(document.getElementById("side3").value),
                    document.getElementById("triangleSide3Unit").value
                );
                const thickness = convertToFeet(
                    parseFloat(document.getElementById("thickness").value),
                    document.getElementById("triangleThicknessUnit").value
                );
                if (isNaN(side1) || isNaN(side2) || isNaN(side3) || isNaN(thickness)) throw new Error();

                // Calculate area using Heron's formula
                const s = (side1 + side2 + side3) / 2;
                const baseArea = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
                volume = baseArea * thickness;
                surfaceArea = 2 * baseArea + thickness * (side1 + side2 + side3);
                break;
            }
            case "pyramid": {
                const baseLength = convertToFeet(
                    parseFloat(document.getElementById("baseLength").value),
                    document.getElementById("pyramidBaseLengthUnit").value
                );
                const baseWidth = convertToFeet(
                    parseFloat(document.getElementById("baseWidth").value),
                    document.getElementById("pyramidBaseWidthUnit").value
                );
                const height = convertToFeet(
                    parseFloat(document.getElementById("height").value),
                    document.getElementById("pyramidHeightUnit").value
                );
                if (isNaN(baseLength) || isNaN(baseWidth) || isNaN(height)) throw new Error();
                const baseArea = baseLength * baseWidth;
                const slantHeight = Math.sqrt((baseLength / 2) ** 2 + height ** 2);
                const slantArea = baseLength * slantHeight;
                volume = (baseArea * height) / 3;
                surfaceArea = baseArea + slantArea * 2; // Add base and two triangular sides
                break;
            }
            case "sphere": {
                const diameter = convertToFeet(
                    parseFloat(document.getElementById("diameter").value),
                    document.getElementById("sphereDiameterUnit").value
                );
                if (isNaN(diameter)) throw new Error();
                const radius = diameter / 2;
                volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
                surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
                break;
            }
            case "cone": {
                const baseDiameter = convertToFeet(
                    parseFloat(document.getElementById("baseDiameter").value),
                    document.getElementById("coneBaseDiameterUnit").value
                );
                const height = convertToFeet(
                    parseFloat(document.getElementById("height").value),
                    document.getElementById("coneHeightUnit").value
                );
                if (isNaN(baseDiameter) || isNaN(height)) throw new Error();
                const radius = baseDiameter / 2;
                const slantHeight = Math.sqrt(radius ** 2 + height ** 2);
                volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
                surfaceArea = Math.PI * radius * (radius + slantHeight);
                break;
            }
            case "cylinder": {
                const diameter = convertToFeet(
                    parseFloat(document.getElementById("diameter").value),
                    document.getElementById("cylinderDiameterUnit").value
                );
                const height = convertToFeet(
                    parseFloat(document.getElementById("height").value),
                    document.getElementById("cylinderHeightUnit").value
                );
                const angle = parseFloat(document.getElementById("angle").value)
                if (isNaN(diameter) || isNaN(height)) throw new Error();
                const radius = diameter / 2;
                volume = Math.PI * Math.pow(radius, 2) * height / ( 360 / angle);
                surfaceArea = 2 * Math.PI * radius * (radius + height);
                break;
            }
            case "holo-cylinder": {
                const outerDiameter = convertToFeet(
                    parseFloat(document.getElementById("outerDiameter").value),
                    document.getElementById("holoCylinderOuterDiameterUnit").value
                );
                const innerDiameter = convertToFeet(
                    parseFloat(document.getElementById("innerDiameter").value),
                    document.getElementById("holoCylinderInnerDiameterUnit").value
                );
                const height = convertToFeet(
                    parseFloat(document.getElementById("height").value),
                    document.getElementById("holoCylinderHeightUnit").value
                );
                if (isNaN(outerDiameter) || isNaN(innerDiameter) || isNaN(height)) throw new Error();
                const outerRadius = outerDiameter / 2;
                const innerRadius = innerDiameter / 2;
                volume = Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2)) * height;
                surfaceArea = 2 * Math.PI * (outerRadius + innerRadius) * height +
                    2 * Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
                break;
            }
            default:
                alert("Invalid slab type selected.");
                return;
        }
    } catch {
        alert("Please fill in all the dimensions correctly.");
    }

    slabData.push({ volume, numSlabs, surfaceArea, slabType });

    const tableBody = document.getElementById("slabTable").querySelector("tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${slabCount + 1}</td>
        <td>${volume.toFixed(2) * Number(numSlabs)}</td>
        <td>${(volume * 0.0283168 * Number(numSlabs)).toFixed(2)}</td>
        <td>${numSlabs}</td>
        <td>${slabType}</td>
        <td><button style="color:red; background-color:transparent;" onclick="removeSlab(${slabCount})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
</svg></button></td>
    `;
    tableBody.appendChild(row);

    slabCount++;
}

/**
 * Removes a slab from the table and updates the data.
 * @param {number} index - Index of the slab to remove.
 */
function removeSlab(index) {
    slabData.splice(index, 1);
    slabCount--;
    const tableBody = document.getElementById("slabTable").querySelector("tbody");
    tableBody.innerHTML = "";
    slabData.forEach((data, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${data.volume.toFixed(2) * Number(data.numSlabs)}</td>
            <td>${(data.volume * 0.0283168 * Number(data.numSlabs)).toFixed(2)}</td>
            <td>${data.numSlabs}</td>
            <td>${data.slabType}</td>
            <td><button style="color:red; background-color:transparent;" onclick="removeSlab(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
</svg></button></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Calculates totals and displays the final material quantities and costs.
 */
function calculateTotals() {
    const cementRatio = parseFloat(document.getElementById("cementRatio").value);
    const sandRatio = parseFloat(document.getElementById("sandRatio").value);
    const aggregateRatio = parseFloat(document.getElementById("aggregateRatio").value);
    const cementCostPerBag = parseFloat(document.getElementById("cementCost").value);
    const sandCostPerCubicFoot = parseFloat(document.getElementById("sandCost").value);
    const aggregateCostPerCubicFoot = parseFloat(document.getElementById("aggregateCost").value);
    const laborCostPerSquareFoot = parseFloat(document.getElementById("laborCost").value);

    let totalNetVolumeFeet = 0;
    let totalSlabs = 0;
    let totalSurfaceAreaFeet = 0;

    // Calculate total net volume and surface area
    slabData.forEach((data) => {
        totalNetVolumeFeet += data.volume * data.numSlabs;
        totalSlabs += data.numSlabs;
        totalSurfaceAreaFeet += data.surfaceArea * data.numSlabs; // Corrected surface area
    });

    const totalNetVolumeMeters = totalNetVolumeFeet * 0.0283168;
    const totalDryVolumeFeet = totalNetVolumeFeet * 1.54;
    const totalDryVolumeMeters = totalDryVolumeFeet * 0.0283168;

    // Material quantities
    const cementVolume = (totalDryVolumeFeet / (cementRatio + sandRatio + aggregateRatio)) * cementRatio;
    const sandVolume = (totalDryVolumeFeet / (cementRatio + sandRatio + aggregateRatio)) * sandRatio;
    const aggregateVolume = (totalDryVolumeFeet / (cementRatio + sandRatio + aggregateRatio)) * aggregateRatio;

    // Material costs
    const cementBags = cementVolume / 1.25; // Assuming 1 bag = 1.25 cubic feet
    const cementCost = cementBags * cementCostPerBag;
    const sandCost = sandVolume * sandCostPerCubicFoot;
    const aggregateCost = aggregateVolume * aggregateCostPerCubicFoot;
    const laborCost = totalSurfaceAreaFeet * laborCostPerSquareFoot;

    const totalCost = cementCost + sandCost + aggregateCost + laborCost;

    // Display results
    const output = document.getElementById("output");
    output.style.display = "block";
    output.innerHTML = `
        <h3>Final Material Quantities and Costs</h3>
        <table border="1">
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Cubic Feet</th>
                    <th>Cubic Meters</th>
                    <th>No. of Bags</th>
                    <th>Cost (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cement</td>
                    <td>${cementVolume.toFixed(2)}</td>
                    <td>${(cementVolume * 0.0283168).toFixed(2)}</td>
                    <td>${cementBags.toFixed(2)}</td>
                    <td>₹${cementCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Sand</td>
                    <td>${sandVolume.toFixed(2)}</td>
                    <td>${(sandVolume * 0.0283168).toFixed(2)}</td>
                    <td>-</td>
                    <td>₹${sandCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Coarse Aggregate</td>
                    <td>${aggregateVolume.toFixed(2)}</td>
                    <td>${(aggregateVolume * 0.0283168).toFixed(2)}</td>
                    <td>-</td>
                    <td>₹${aggregateCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Labor</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>₹${laborCost.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        <h3>Total Summary</h3>
        <p>Total Net Volume: ${totalNetVolumeFeet.toFixed(2)} cubic feet (${totalNetVolumeMeters.toFixed(2)} cubic meters)</p>
        <p>Total Dry Volume: ${totalDryVolumeFeet.toFixed(2)} cubic feet (${totalDryVolumeMeters.toFixed(2)} cubic meters)</p>
        <p>Surface Area: ${totalSurfaceAreaFeet.toFixed(2)} square feet (${(totalSurfaceAreaFeet * 0.092903).toFixed(2)} square meters)</p>
        <p><strong>Total Cost: ₹${totalCost.toFixed(2)}</strong></p>
    `;
}
