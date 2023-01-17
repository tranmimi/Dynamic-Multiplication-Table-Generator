/*
    Name: Mimi Tran
    Last Updated: January 15, 2023
    HW 3: Creating an Interactive Dynamic Table
    HW 4: Using the jQuery Plugin/UI with Your Dynamic Table
    scripts.js
*/

/* 
    validateInputs grabs user input from the form and checks the following:
        - minRowVal <= maxRowVal
        - minColVal <= maxColVal

    NOTE: Error handling for out-of-bounds, string, and decimal inputs are handled via 
            HTML5 validation checking. 
*/

function validateInputs() {
    // Clear any previous error messages if user submits inputs more than once.
    document.getElementById("errorMinR").innerHTML = "";
    document.getElementById("errorMinC").innerHTML = "";

    // Retrieve user input submitted in the form.
    const minRowVal = parseInt(document.getElementById("minRow").value);
    const maxRowVal = parseInt(document.getElementById("maxRow").value);
    const minColVal = parseInt(document.getElementById("minCol").value);
    const maxColVal = parseInt(document.getElementById("maxCol").value);

    // Create a multiplication table using the entered values if they are valid.
    if (minRowVal <= maxRowVal && minColVal <= maxColVal) {
        createMultTable(minRowVal, maxRowVal, minColVal, maxColVal, "table");
    } else {
        // If the minimum row value is larger than the maximum row value, inform the user.
        if (minRowVal > maxRowVal) {
            document.getElementById("errorMinR").innerHTML = "*" + minRowVal + " is larger than " 
                + maxRowVal + ". Please enter an integer less than or equal to " + maxRowVal 
                + ".";
        // If the minimum column value is larger than the maximum column value, inform the user.
        } 
        if (minColVal > maxColVal) {
            document.getElementById("errorMinC").innerHTML = "*" + minColVal + " is larger than " 
            + maxColVal + ". Please enter an integer less than or equal to " + maxColVal 
            + ".";
        }
    }
}

/*
    createMultTable will create a multiplication table using valid parameters given
    by the user.
*/
function createMultTable(minR, maxR, minC, maxC, sectionID) {
    var currCol = minC, ctemp = currCol;
    var currRow = minR, rtemp = currRow;
    var row = 0, col = 0, cellData;

    // Create a Table element and Table Body element for the multiplication table.
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // Construct the multiplication table 
    for (row = 0; row <= (Math.abs(maxR - minR) + 1); row++) {
        // Create new row in the table.
        const newRow = document.createElement("tr");
        for (col = 0; col <= (maxC - minC + 1); col++) {
            const cell = document.createElement("td");
            // Uppermost, leftmost cell stays blank.
            if (row == 0 && col == 0) {
                cellData = document.createTextNode(" ");
            // If a cell is added along the first row or column, the cell will hold 
            // the appropriate row or column number--not any calculated products.
            } else if (row == 0 && col != 0) {
                cellData = document.createTextNode(ctemp);
                ctemp++;
            } else if (row != 0 && col == 0) {
                cellData = document.createTextNode(rtemp);
                rtemp++;
            // Otherwise, compute the product between the current multiplicand and 
            // multiplier, and save this product into the current cell being made. 
            } else {
                cellData = document.createTextNode(currRow * currCol);
                currCol++;
            } 
            cell.appendChild(cellData);
            newRow.appendChild(cell);
        }
        tblBody.appendChild(newRow); // Append this newly completed row to the table body.
        if (row != 0) {
            currRow++;
        }
        currCol = minC; // Reset currCol for each column iteration
    }

    // Insert newly filled table body into the newly created table.
    tbl.appendChild(tblBody);

    // If the Table is going into the Tables <div>, set the id to "multTable". Then, check 
    // if there was a previous Table.
    var isThereAPrevTable = document.getElementById("multTable");
    if (sectionID == "table" && isThereAPrevTable != null) {
        // Replaces an existing Table with new one.
            const prevTable = document.getElementById("multTable");
            prevTable.replaceWith(tbl);
            
    // If a multiplication table did not previously exist, append it to the appropriate section.
    // This will also create a mutliplication table in a Tab.
    } else {
        var tableID = document.getElementById(sectionID);
        tableID.append(tbl);
    }

    if (sectionID == "table") {
        tbl.setAttribute("id", "multTable");
    }
}
