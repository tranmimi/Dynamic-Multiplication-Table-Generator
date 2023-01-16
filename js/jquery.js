/*
    Name: Mimi Tran
    Last Updated: January 15, 2023
    HW 3: Creating an Interactive Dynamic Table
    HW 4: Using the jQuery Plugin/UI with Your Dynamic Table
    jquery.js
*/

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

    var tabCounter = 0;

    /*
        When the "Save" button is clicked, it will first check whether a Table was
        generated. If it does, it will call addTab and save the Table in the Tabs
        section. Otherwise, it will do nothing.
    */
    $("#saveBtn").click(function() {
        const minR = $("#minRow").val();
        const maxR = $("#maxRow").val();
        const minC = $("#minCol").val();
        const maxC = $("#maxCol").val();

        // If a table exists on the page AND the "Save" button is pressed...
        if($("#multTable").length) {
            var tabTitle = "[" + minR + ", " + maxR + "] x [" + minC + ", " + maxC + "]";
            tabCounter += 1;
            var tabId = "#tab" + tabCounter;
            addTab(tabTitle, tabId, tabCounter);
        }
    });

    /*
        This section of code allows users to select multiple Tabs and delete them from
        the page.
    */
   $("#deleteBtn").click(function() {
        alert("removed!");
   });
});