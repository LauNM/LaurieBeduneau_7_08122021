import { filteredRecipesList, filterByKeyWord } from "./filters.js";
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
const closeDropdownIcon = document.getElementsByClassName("close");

const listElement = document.getElementsByClassName("list-element");
const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");

const contentTag = document.getElementsByClassName("content");

openDropdown(dropdowns);
Array.from(closeDropdownIcon).forEach((el) => {
    el.addEventListener('click', () => {
        closeDropdown(el);
        })
    }) 
//closeDropdown();

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
    displayData(data);
}

loadData(recipes)


searchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        filterBySearchBar = filteredRecipesList(recipes, e.target.value);
        loadData(filterBySearchBar)
    }
    else {
        loadData(recipes)
    }
})


Array.from(contentTag).forEach((el) => {
    el.addEventListener('click', (e) => {
        closeDropdown(el);
        const tag = createTag(e);
        tagSection.appendChild(tag) 

        filterByTag = filterByKeyWord(recipes, tags);
        loadData(filterByTag)

        tag.addEventListener('click', () => {
            tagSection.removeChild(tag)
            filterByTag = filterByKeyWord(recipes, tags);
            loadData(filterByTag)
        })
    })
})
