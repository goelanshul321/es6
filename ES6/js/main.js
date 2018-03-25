"use strict";

var successClass = "container alert alert-success center-block";
var dangerClass = "container alert alert-danger center-block";
var serialNo = 0;

//to toggle the visibility of the Add User button
var toggleAddDetails = function toggleAddDetails() {
    var inputNode = document.getElementById("addDetailsInput");
    if (inputNode.style.display == "none") {
        inputNode.style.display = "block";
    } else inputNode.style.display = "none";
    var deleteNode = document.getElementById("deleteDetailsInput");
    deleteNode.style.display = "none";
    disableCheckBoxes(true);
};

//to toggle the details of the Remove User button
var toggleDeleteDetails = function toggleDeleteDetails() {
    var inputNode = document.getElementById("deleteDetailsInput");
    if (inputNode.style.display == "none") {
        inputNode.style.display = "block";
        disableCheckBoxes(false);
    } else {
        inputNode.style.display = "none";
        disableCheckBoxes(true);
    }
    var insertNode = document.getElementById("addDetailsInput");
    insertNode.style.display = "none";
};

var disableCheckBoxes = function disableCheckBoxes(flag) {
    var tableBody = document.getElementById("tableBodyRef");
    tableBody.childNodes.forEach(function (rowChild) {
        checkBoxRef = rowChild.firstChild.firstChild;
        checkBoxRef.disabled = flag;
    });
};

var displayMessage = function displayMessage(classString, messageString) {
    var messageNode = document.getElementById("message");
    messageNode.style.display = "block";
    messageNode.className = classString;
    messageNode.innerHTML = messageString;
    setTimeout(function () {
        messageNode.style.display = "none";
    }, 2000);
};

var deleteDetails = function deleteDetails() {
    if (serialNo < 1) {
        toggleDeleteDetails();
        var _messageString = "Can't delete the entry as table is empty.";
        displayMessage(dangerClass, _messageString);
        return;
    }
    var tableBody = document.getElementById("tableBodyRef");
    var count = 0;
    var lengthOfArray = tableBody.childElementCount;
    for (var i = lengthOfArray - 1; i >= 0; i--) {
        //console.log(tableBody.childNodes[i].firstChild.firstChild.checked);
        if (tableBody.childNodes[i].firstChild.firstChild.checked == true) {
            count++;
            tableBody.removeChild(tableBody.childNodes[i]);
            serialNo--;
        }
    }
    var messageString = "<center> <strong>" + count + "</strong> entries removed!</center>";
    if (count == 0) {
        messageString = "<center> <strong>No CheckBox Checked!</strong> </center>";
        displayMessage(dangerClass, messageString);
    } else displayMessage(successClass, messageString);
    if (serialNo == 0) {
        document.getElementById("deleteButton").disabled = true;
    }
    toggleDeleteDetails();
};

var addDetails = function addDetails() {
    document.getElementById("deleteButton").disabled = false;
    serialNo++;
    var nameRef = document.getElementById("name");
    var name = nameRef.value;
    var rollRef = document.getElementById("roll");
    var roll = rollRef.value;
    var passYearRef = document.getElementById("passYear");
    var passYear = passYearRef.value;
    var streamRef = document.getElementById("stream");
    var stream = streamRef.value;

    //    let name = "Daman";
    //    let roll = 151;
    //    let passYear = 2014;
    //    let stream="CSE";
    if (validator(nameRef, rollRef, passYearRef, streamRef) == false) return;
    createNewEntry(name, roll, passYear, stream);
    var messageString = "<center> <strong>" + roll + "</strong> inserted successfully </center>";
    displayMessage(successClass, messageString);
    /*
    document.getElementById("name").innerHTML="";
    document.getElementById("roll").innerHTML="";
    document.getElementById("passYear").innerHTML="";
    document.getElementById("stream").innerHTML="";
    */
};

var validator = function validator(nameRef, rollRef, passYearRef, streamRef) {

    /*=============================================================//
    //                                                             //
    //                      checking Details                       //
    //                                                             //
    //============================================================*/

    // console.log(`name = ${nameRef.value}`);
    // console.log(`rollNo = ${rollRef.value}`);
    // console.log(`passYear = ${passYearRef.value}`);
    // console.log(`stream ${streamRef.value}`);


    var nameExp = /^[A-Za-z]+$/;
    if (!nameExp.test(nameRef.value)) {
        nameRef.focus();
        displayMessage(dangerClass, "<center><strong>Name not valid!</strong></center>");
        return false;
    }

    if (isNaN(rollRef.value) || rollRef.value == "") {
        rollRef.focus();
        displayMessage(dangerClass, "<center><strong>Roll No. not valid!</strong></center>");
        return false;
    }
    if (isNaN(passYearRef.value) || passYearRef.value == "") {
        passYearRef.focus();
        displayMessage(dangerClass, "<center><strong>Not a valid Pass Year!</strong></center>");
        return false;
    }
    if (!nameExp.test(streamRef.value)) {
        streamRef.focus();
        displayMessage(dangerClass, "<center><strong>Not a valid Stream!</strong></center>");
        return false;
    }
    return true;
};

var createNewEntry = function createNewEntry(name, roll, passYear, stream) {

    var Id = serialNo;
    var tableBodyReference = document.getElementById("tableBodyRef");
    //creating new table row node
    var tableRowNode = document.createElement("tr");
    var rowId = "row" + Id;
    tableRowNode.id = rowId;

    //Creating nodes of each row item
    var checkBoxDataNode = document.createElement("td");
    var checkBoxInputNode = document.createElement("input");
    checkBoxInputNode.type = "checkbox";
    checkBoxInputNode.checked = false;
    checkBoxInputNode.setAttribute('disabled', true);
    checkBoxDataNode.appendChild(checkBoxInputNode);
    //checkBoxNode.onclick="toggleDeleteButton()";

    //creating a table data entry for Name column
    var nameDataNode = document.createElement("td");
    var nameInputNode = document.createElement("input");
    nameInputNode.setAttribute('disabled', true);
    nameInputNode.type = "text";
    nameInputNode.setAttribute('value', name);
    nameDataNode.appendChild(nameInputNode);

    //creating a table data entry for Roll No column
    var rollDataNode = document.createElement("td");
    var rollInputNode = document.createElement("input");
    rollInputNode.setAttribute('disabled', true);
    rollInputNode.type = "text";
    rollInputNode.setAttribute('value', roll);
    rollDataNode.appendChild(rollInputNode);

    //creating a table data entry for Passout Year column
    var passYearDataNode = document.createElement("td");
    var passYearInputNode = document.createElement("input");
    passYearInputNode.setAttribute('disabled', true);
    passYearInputNode.type = "text";
    passYearInputNode.setAttribute('value', passYear);
    passYearDataNode.appendChild(passYearInputNode);

    //creating a table data entry for Stream column
    var streamDataNode = document.createElement("td");
    var streamInputNode = document.createElement("input");
    streamInputNode.setAttribute('disabled', true);
    streamInputNode.type = "text";
    streamInputNode.setAttribute('value', stream);
    streamDataNode.appendChild(streamInputNode);

    //creating a table data entry for Edit Button
    var editDataNode = document.createElement("td");
    var editButtonNode = document.createElement("input");
    editButtonNode.type = "button";
    editButtonNode.value = "Edit";
    editButtonNode.id = Id;
    editButtonNode.setAttribute('class', "btn btn-primary");
    editButtonNode.setAttribute('onclick', "editDetails(" + Id + ")");
    editDataNode.appendChild(editButtonNode);

    //appending each newly created node to the <tr> element
    tableRowNode.appendChild(checkBoxDataNode);
    tableRowNode.appendChild(nameDataNode);
    tableRowNode.appendChild(rollDataNode);
    tableRowNode.appendChild(passYearDataNode);
    tableRowNode.appendChild(streamDataNode);
    tableRowNode.appendChild(editDataNode);

    //appending this newly created <tr></tr> element to the table body of table
    tableBodyReference.appendChild(tableRowNode);
};

var editDetails = function editDetails(buttonId) {
    var parentRow = document.getElementById("row" + buttonId);
    var editButton = document.getElementById(buttonId);
    var inputNode = document.getElementById("addDetailsInput");
    inputNode.style.display = "none";
    if (editButton.value == "Edit") {
        for (var i = 1; i < 5; i++) {
            parentRow.childNodes[i].firstChild.disabled = false;
        }
        editButton.className = "btn btn-success";
        editButton.value = "Ok";
    } else {
        nameId = parentRow.childNodes[1].firstChild;
        rollId = parentRow.childNodes[2].firstChild;
        passYearId = parentRow.childNodes[3].firstChild;
        streamId = parentRow.childNodes[4].firstChild;
        if (!validator(nameId, rollId, passYearId, streamId)) return;

        for (var _i = 1; _i < 5; _i++) {
            parentRow.childNodes[_i].firstChild.disabled = true;
        }
        editButton.className = "btn btn-primary";
        editButton.value = "Edit";
        displayMessage(successClass, "<center><strong>Edited</stream> successfully!</center>");
    }
};