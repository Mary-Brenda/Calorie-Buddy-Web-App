/******* TOGGLING CHECK ALL BUTTON IN TABLE HEADING *******/
let checkAll = document.getElementById("checkAll");

// Select all checkboxes by changing their checked property to true.
checkAll.addEventListener("click", e => {
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            if (checkAll.checked == true) {
                checkboxes[i].checked = true;
            }
            else {
                checkboxes[i].checked = false;
            }
        }
    }
})


/******* DELETING FOOD AFTER USER'S CONFIRMATION *******/

// Add form action to delete a food and then direct user to confirmation page.
const deleteBtnIsClicked = (e) => {
    const id = e.getAttribute("data-id");
    const foodName = e.getAttribute("data-food-name");
    const formAction = document.getElementById("deleteSubmission");
    formAction.setAttribute("action", "/foodDeleted/" + id + "/" + foodName);
}


/******* CALCULATING CALORIES OF NEW RECIPE *******/

let makeRecipeBtn = document.getElementById("make-recipe");

// Calculate total nutritional values, including quantity, of rows checked and display the info. 
makeRecipeBtn.addEventListener("click", e => {
    let checkboxes = document.querySelectorAll("#tableBody input[type='checkbox']:checked");
    let nutritionalValues = { "TypicalValues": 0, "Calories": 0, "Carbs": 0, "Fat": 0, "Protein": 0, "Salt": 0, "Sugar": 0 };

    for (let i = 0; i < checkboxes.length; i++) {
        let row = checkboxes[i].parentElement.parentElement;
        let qty = row.children[10].children[0].value;
        nutritionalValues["Calories"] += Number(row.children[4].textContent) * qty;
        nutritionalValues["Carbs"] += Number(row.children[5].textContent) * qty;
        nutritionalValues["Fat"] += Number(row.children[6].textContent) * qty;
        nutritionalValues["Protein"] += Number(row.children[7].textContent) * qty;
        nutritionalValues["Salt"] += Number(row.children[8].textContent) * qty;
        nutritionalValues["Sugar"] += Number(row.children[9].textContent) * qty;
    }

    let recipeName = document.getElementById("recipeName");
    let recipeBoxHeader = document.getElementById("showRecipeLabel");
    recipeBoxHeader.innerHTML = `${recipeName.value} <p><i>Recipe Nutritional Info and Calorie Count</i></p>`;

    let showResults = document.getElementById("recipeResults");
    showResults.innerHTML =
        `<ul class="list-group list-group-flush">
        <li class="list-group-item">Calories <span class="recipeValues">${Math.round((nutritionalValues["Calories"] + Number.EPSILON) * 100) / 100}</span></li>
        <li class="list-group-item">Carbs <span class="recipeValues">${Math.round((nutritionalValues["Carbs"] + Number.EPSILON) * 100) / 100}</span></li>
        <li class="list-group-item">Fat <span class="recipeValues">${Math.round((nutritionalValues["Fat"] + Number.EPSILON) * 100) / 100}</span></li>
        <li class="list-group-item">Protein <span class="recipeValues">${Math.round((nutritionalValues["Protein"] + Number.EPSILON) * 100) / 100}</span></li>
        <li class="list-group-item">Salt <span class="recipeValues">${Math.round((nutritionalValues["Salt"] + Number.EPSILON) * 100) / 100}</span></li>
        <li class="list-group-item">Sugar <span class="recipeValues">${Math.round((nutritionalValues["Sugar"] + Number.EPSILON) * 100) / 100}</span></li>
    </ul>`;
})

// Toggle makeRecipeBtn depending on if checkbox is checked or unchecked.
const isChecked = (checkbox) => {
    let checkboxInputs = document.getElementsByClassName("checkboxes");
    makeRecipeBtn = document.getElementById("make-recipe");

    if (checkbox.checked == true) {
        makeRecipeBtn.disabled = false;
    }
    else {
        let i = 0;
        while (checkboxInputs[i].checked == false) {
            makeRecipeBtn.disabled = true;
            i++;
        }
        makeRecipeBtn.disabled = false;
    }
}