import { filteredRecipesList, filterByKeyWord, filterInList } from "./filters.js";
import {
    createIngredientsList,
    createApplianceList,
    createUstensilsList,
    openDropdown,
    closeDropdown,
    createDropdownIngredients,
    createDropdownAppliance,
    createDropdownUstensils
} from "./displayLists.js";
import { displayData } from "./displayRecipe.js";
import { recipes } from "./data.js";
import { createTag } from "./tag.js";

const searchBarInput = document.getElementById('search');
const dropdowns = document.getElementsByClassName("filter-dropdown");

const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");
const dropdownsContent = document.getElementsByClassName("content");

openDropdown(dropdowns);

let filterBySearchBar = [...recipes];
let filterByTag = [...recipes];
let ingredientList = [];
let applianceList = [];
let ustensilsList = [];

// create lists from given data
const createLists = (data) => {
    ingredientList = [...createIngredientsList(data)];
    applianceList = [...createApplianceList(data)];
    ustensilsList = [...createUstensilsList(data)];
}

// create lists in dropdown from given lists
const createAllDropdown = () => {
    createDropdownIngredients(ingredientList);
    createDropdownAppliance(applianceList);
    createDropdownUstensils(ustensilsList);
}

// Create lists and associated dropdowns, display all recipes, create event-creation tag 
const loadData = (data) => {
    createLists(data);
    createAllDropdown();
    addDropdownListener(data);
    displayData(data);
}

loadData(recipes)

/* Filter with searchBar */

searchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        if(tags.length > 0) {
            filterByTag = filterByKeyWord(recipes, tags);
            filterBySearchBar = filteredRecipesList(filterByTag, e.target.value);
        }
        else {
            filterBySearchBar = filteredRecipesList(recipes, e.target.value);
        }
        loadData(filterBySearchBar)
    }
    else {
        if(tags.length > 0) {
            filterBySearchBar = filterByKeyWord(recipes, tags);
        }
        else {
            filterBySearchBar = recipes
        }
        loadData(filterBySearchBar)
    }
})


/* Filter by tag */

function addDropdownListener(data) {
    Array.from(dropdownsContent).forEach((dropdown) => {
        const list = [...dropdown.querySelectorAll(".list-element")];
        list.forEach((li) => {
            li.addEventListener("click", (e) => {
                closeDropdown(dropdown);
                const type = dropdown.getAttribute("data-type");
                const tag = createTag(e.target.textContent, type);
                tagSection.appendChild(tag)

                filterByTag = filterByKeyWord(data, tags);
                loadData(filterByTag)

                tag.addEventListener('click', () => {
                    tagSection.removeChild(tag)
                    console.log(searchBarInput.value.length)
                    if(searchBarInput.value.length > 2) {
                        filterBySearchBar = filteredRecipesList(recipes, searchBarInput.value);
                        filterByTag = filterByKeyWord(filterBySearchBar, tags);
                    }
                    else {
                        filterByTag = filterByKeyWord(recipes, tags);
                    }
                    loadData(filterByTag)
                })
            })
        })
    })
}


    


