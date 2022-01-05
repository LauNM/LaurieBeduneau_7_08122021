import { filteredRecipesList, filterByKeyWord } from "./filters.js";
import { 
    createIngredientsList, 
    createApplianceList, 
    createUstensilsList,
    openDropdown,
    closeDropdown,
    refreshIngredientsList,
    refreshApplianceList,
    refreshUstensilsList
 } from "./displayLists.js";
import { displayData } from "./displayRecipe.js";
import { recipes } from "./data.js";
import { displayTag } from "./functions.js";

const searchBarInput = document.getElementById('search');


const dropdowns = document.getElementsByClassName("filter-dropdown");
const closeDropdownIcon = document.getElementsByClassName("close");
const listElement = document.getElementsByClassName("list-element");
const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");

let data = [...recipes];
let filterBySearchBar = [...recipes];
let ingredientList = [...createIngredientsList(data)];
let applianceList = [...createApplianceList(data)];
let ustensilsList = [...createUstensilsList(data)];

const refreshAllLists = (data) => {
    refreshIngredientsList(ingredientList);
    refreshApplianceList(applianceList);
    refreshUstensilsList(ustensilsList);

    eventCreationTag(data)
}


const eventCreationTag = (data) =>  {
    Array.from(listElement).forEach((el) => {
    el.addEventListener('click', () => {
            const type = el.parentElement.getAttribute('data-type');
            const tag = displayTag(el.innerHTML, type);
            tagSection.appendChild(tag) 
            tag.addEventListener('click', () => {
                tagSection.removeChild(tag)
                displayData(filterByKeyWord(data, tags))
            })
            displayData(filterByKeyWord(data, tags))
        })
    })
   
}
    

openDropdown(dropdowns);
closeDropdown(closeDropdownIcon);

displayData(recipes);
refreshAllLists(recipes);




searchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        filterBySearchBar = filteredRecipesList(recipes, e.target.value);
        displayData(filterBySearchBar);
        ///////////////////////////////////////
        ingredientList = [...createIngredientsList(filterBySearchBar)];
        applianceList = [...createApplianceList(filterBySearchBar)];
        ustensilsList = [...createUstensilsList(filterBySearchBar)];

        refreshAllLists(filterBySearchBar);
        ///////////////////////////////////////
    }
    else {
        displayData(recipes);

        ingredientList = [...createIngredientsList(recipes)];
        applianceList = [...createApplianceList(recipes)];
        ustensilsList = [...createUstensilsList(recipes)];

        refreshAllLists(recipes);
    }
})
