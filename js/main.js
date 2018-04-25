let serialNo = 0;

let toggleAddDetails = () =>{
    let inputNode = document.getElementById("addDetailsInput");
    if(inputNode.style.display == "none") {
        inputNode.style.display = "block";
    }
    else
        inputNode.style.display = "none";
    let deleteNode = document.getElementById("deleteDetailsInput");
    deleteNode.style.display = "none";
    disableCheckBoxes(true);
}

let toggleDeleteDetails = () =>{
    let inputNode = document.getElementById("deleteDetailsInput");
    if(inputNode.style.display == "none") {
        inputNode.style.display = "block";
        disableCheckBoxes(false);
    }
    else {
        inputNode.style.display = "none";
        disableCheckBoxes(true);
    }
    let insertNode = document.getElementById("addDetailsInput");
    insertNode.style.display="none";
}

let disableCheckBoxes = (flag) => {
    let tableBody = document.getElementById("tableBodyRef");
    tableBody.childNodes.forEach( (rowChild) => {
        checkBoxRef = rowChild.firstChild.firstChild;
        checkBoxRef.disabled = flag;
        console.log(checkBoxRef);
    })
}


let deleteDetails = () => {
    if(serialNo < 1) {
        toggleDeleteDetails();
        alert("Can't delete entry as table is empty");
              return;
    }
    let tableBody = document.getElementById("tableBodyRef");
    let count = 0;
    let lengthOfArray = tableBody.childElementCount;
    for(let i = lengthOfArray - 1; i >= 0; i--) {
        if(tableBody.childNodes[i].firstChild.firstChild.checked == true){
             count++;
             tableBody.removeChild(tableBody.childNodes[i]);
             --serialNo;
        }
    }
   
    if(count == 0) { 
       alert("no checkbox checked");       
    }
    
    if(serialNo == 0) {
        document.getElementById("deleteButton").disabled=true;
        
    }
    toggleDeleteDetails();
}

let addDetails = () => {
    document.getElementById("deleteButton").disabled=false;
    let nameRef = document.getElementById("name");
    let name = nameRef.value;
    let rollRef = document.getElementById("roll");
    let roll = rollRef.value;
    let passYearRef = document.getElementById("passYear");
    let passYear = passYearRef.value;
    let streamRef = document.getElementById("stream");
    let stream = streamRef.value;


    if(validator(nameRef, rollRef, passYearRef, streamRef) == false)
        return;
    serialNo++;
    createNewEntry(name, roll, passYear, stream);
}

let validator = (nameRef, rollRef, passYearRef, streamRef) => {

    var nameExp = /^[A-Za-z]+$/;
    if(!nameExp.test(nameRef.value)){
        alert("Not A valid Name");
        nameRef.focus();
        return false;
    }
    
    if(isNaN(rollRef.value) || (rollRef.value == "")){
        alert("Not A valid rollno");
        rollRef.focus();
        return false;
    }
    if(isNaN(passYearRef.value) || (passYearRef.value == "")){
        alert("Not A valid passyear");
        passYearRef.focus();
        return false;
    }
    if(!nameExp.test(streamRef.value)){
        alert("Not A valid stream");
        streamRef.focus();
        return false;
    }
    return true;
}


let createNewEntry = (name, roll, passYear, stream) => {

    let Id = serialNo;
    let tableBodyReference = document.getElementById("tableBodyRef");

    let tableRowNode = document.createElement("tr");
    let rowId = `row${Id}`;
    tableRowNode.id = rowId;

    let checkBoxDataNode = document.createElement("td");
    let checkBoxInputNode = document.createElement("input");
    checkBoxInputNode.type="checkbox";
    checkBoxInputNode.checked = false;
    checkBoxInputNode.setAttribute('disabled', true);
    checkBoxDataNode.appendChild(checkBoxInputNode);

       let nameDataNode = document.createElement("td");
    let nameInputNode = document.createElement("input");
    nameInputNode.setAttribute('disabled', true);
    nameInputNode.type = "text";
    nameInputNode.setAttribute('value', name);
    nameDataNode.appendChild(nameInputNode);

    let rollDataNode = document.createElement("td");
    let rollInputNode = document.createElement("input");
    rollInputNode.setAttribute('disabled', true);
    rollInputNode.type = "text";
    rollInputNode.setAttribute('value', roll);
    rollDataNode.appendChild(rollInputNode);

   
    let passYearDataNode = document.createElement("td");
    let passYearInputNode = document.createElement("input");
    passYearInputNode.setAttribute('disabled', true);
    passYearInputNode.type = "text";
    passYearInputNode.setAttribute('value', passYear);
    passYearDataNode.appendChild(passYearInputNode);
    
    //creating a table data entry for Stream column
    let streamDataNode = document.createElement("td");
    let streamInputNode = document.createElement("input");
    streamInputNode.setAttribute('disabled', true);
    streamInputNode.type = "text";
    streamInputNode.setAttribute('value', stream);
    streamDataNode.appendChild(streamInputNode);

    //creating a table data entry for Edit Button
    let editDataNode = document.createElement("td");
    let editButtonNode = document.createElement("input");
    editButtonNode.type = "button";
    editButtonNode.value = "Edit";
    editButtonNode.id = Id;
    editButtonNode.setAttribute('class', "btn btn-primary");
    editButtonNode.setAttribute('onclick', `editDetails(${Id})`);
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
}

let editDetails = (buttonId) => {
    let tableBody = document.getElementById("tableBodyRef");
    let parentRow = document.getElementById(`row${buttonId}`);
    let editButton = document.getElementById(buttonId);
    let inputNode = document.getElementById("addDetailsInput");
    inputNode.style.display = "none";
    if(editButton.value == "Edit") {
        for(let i = 1; i < 5; i++) {
            parentRow.childNodes[i].firstChild.disabled = false;
        }
        
        //Disabling other edit buttons
        for(let node of tableBody.childNodes) {
            if(parentRow.id != node.id){
                node.childNodes[5].firstChild.disabled = true;
            }
        }
        editButton.className="btn btn-success";
        editButton.value = "Ok";
    }
    else {
        nameId = parentRow.childNodes[1].firstChild;
        rollId = parentRow.childNodes[2].firstChild;
        passYearId = parentRow.childNodes[3].firstChild;
        streamId = parentRow.childNodes[4].firstChild;
        if(!validator(nameId, rollId, passYearId, streamId))
            return;

        for(let i = 1; i < 5; i++) {
            parentRow.childNodes[i].firstChild.disabled = true;
        }

        //Re-Enabling other edit buttons
        for(let node of tableBody.childNodes) {
            node.childNodes[5].firstChild.disabled = false;
        }
        editButton.className="btn btn-primary";
        editButton.value="Edit";
      }
}
