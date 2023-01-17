/*
    Name: Mimi Tran
    Last Updated: January 15, 2023
    HW 3: Creating an Interactive Dynamic Table
    HW 4: Using the jQuery Plugin/UI with Your Dynamic Table
    jquery.js
*/

var button='<button class="close" type="button" title="Remove this page">×</button>';
var tabID = 1;
function resetTab(){
	var tabs=$("#tab-list li:not(:first)");
	var len=1
	$(tabs).each(function(k,v){
		len++;
		$(this).find('a').html('Tab ' + len + button);
	})
	tabID--;
}

$(document).ready(function($) {
    /*
        JQuery Validation of inputForm. Error handles:
            - Inputs out-of-bounds of [-50, 50]
            - Empty fields
        NOTE:
            - HTML5 error handles non-integer inputs.
        Numerical input comparison help sourced from:
            https://stackoverflow.com/questions/32587177/jquery-validate-compare-two-fields
    */
    $("#inputForm").validate({
        rules: {
            minRow: {
                required: true,
                min: -50,
                max: 50,
            },
            maxRow: {
                required: true,
                min: -50,
                max: 50,
            },
            minCol: {
                required: true,
                min: -50,
                max: 50,
            },
            maxCol: {
                required: true,
                min: -50,
                max: 50,
            }
        }, 
        messages: {
            minRow: {
                required: " Please enter a Minimum Row Value.",
                min: " Please enter a value greater than or equal to -50.",
                max: " Please enter a value less than or equal to 50."
            },
            maxRow: {
                required: " Please enter a Maximum Row Value.",
                min: " Please enter a value greater than or equal to -50.",
                max: " Please enter a value less than or equal to 50."
            },
            minCol: {
                required: " Please enter a Minimum Column Value.",
                min: " Please enter a value greater than or equal to -50.",
                max: " Please enter a value less than or equal to 50."
            },
            maxCol: {
                required: " Please enter a Maximum Column Value.",
                min: " Please enter a value greater than or equal to -50.",
                max: " Please enter a value less than or equal to 50."
            }
        }
    });


    // Add Tabs button functionality and Tab section layout sourced from:
    //             https://stackoverflow.com/questions/42735710/dynamically-add-edit-remove-bootstrap-tab
    var tabCounter = 0;
    $("#saveBtn").click(function() {
        const minR = parseInt($("#minRow").val(), 10);
        const maxR = parseInt($("#maxRow").val(), 10);
        const minC = parseInt($("#minCol").val(), 10);
        const maxC = parseInt($("#maxCol").val(), 10);

        // If a table exists on the page AND the "Save" button is pressed...
        if($("#multTable").length) {
            var tabTitle = "[" + minR + ", " + maxR + "] x [" + minC + ", " + maxC + "]";
            tabCounter++;

            $("#tabsSection").append($('<li><a href="#tab' + tabCounter 
            + '" role="tab" data-toggle="tab">' + tabTitle 
            + '<button class="close" type="button" title="Remove this page">×</button></a></li>'));
        }
        var tabID = "#tab" + tabCounter;
        $("#tabContent").append($('<div class="tab-pane fade" id="tab' + tabCounter + '"></div>'));

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

        $(tabID).append(tbl);
        
        //var tableID = document.getElementById(tabID);
        //tableID.append(tbl);
    });
    $("#tabsSection").on("click", ".close", function() {
        var tabID = $(this).parents("a").attr("href");
        $(this).parents("li").remove();
        $(tabID).remove();

        //display first tab
        var tabFirst = $("#tabsSection a:first");
        resetTab();
        tabFirst.tab("show");
    });
});