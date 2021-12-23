import { filteredRecipesList, filterByKeyWord } from "./filters.js";
import { displayDropdownElements, createIngredientsList, createApplianceList, createUstensilsList } from "./displayLists.js";
import { displayData } from "./displayRecipe.js";
import { recipes } from "./data.js";
import { displayTag } from "./functions.js";

const searchBarInput = document.getElementById('search');

const ingredientsButton = document.getElementById("ingredients");
const applianceButton = document.getElementById("appliance");
const utensilsButton = document.getElementById("utensils");
const dropdowns = document.getElementsByClassName("filter-dropdown");
const closeDropdown = document.getElementsByClassName("close");
const listElement = document.getElementsByClassName("list-element");
const tagSection = document.getElementById("tags");

let data = [...recipes];
let filterBySearchBar = [...recipes];
let ingredientList = [...createIngredientsList(data)];
let applianceList = [...createApplianceList(data)];
let ustensilsList = [...createUstensilsList(data)];

ingredientsButton.nextElementSibling.appendChild(displayDropdownElements(ingredientList));
applianceButton.nextElementSibling.appendChild(displayDropdownElements(applianceList));
utensilsButton.nextElementSibling.appendChild(displayDropdownElements(ustensilsList));

let filterTag = [];


function arrayRemove(tab, value) { 
    const index = tab.indexOf(value);
    if (index > -1) {
      tab.splice(index, 1);
    }
}
Array.from(listElement).forEach((el) => {
    el.addEventListener('click', () => {
        if (!filterTag.includes(el.innerHTML)) {
            filterTag.push(el.innerHTML)
            const tag = displayTag(el.innerHTML);
            tagSection.appendChild(tag) 
            tag.addEventListener('click', () => {
                arrayRemove(filterTag, el.innerHTML)
                tagSection.removeChild(tag)
                console.log(filterTag)
            })
        }
       
        filterByKeyWord(recipes, filterTag)
        
    })
})




const closeAllDropdown = () => {
    Array.from(dropdowns).forEach((el) => {
        el.style.display = "flex";
        el.nextElementSibling.style.display = "none";
    })
}

/* Get dropdown buttons by className and add an event listener */
Array.from(dropdowns).forEach((el) => {
    el.addEventListener('click', () => {
        closeAllDropdown();
        el.style.display = "none"
        el.nextElementSibling.style.display = "block";
    })
})

/* Get icon chevron up and add an event listener */
Array.from(closeDropdown).forEach((el) => {
    el.addEventListener('click', () => {
        let listDropdown = el.parentElement.parentElement;
        listDropdown.style.display = "none"
        listDropdown.previousElementSibling.style.display = "flex";
    })
})


displayData(recipes);
searchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        filterBySearchBar = filteredRecipesList(recipes, e.target.value);
        displayData(filterBySearchBar);
    }
    else {
        displayData(recipes);
    }
})

