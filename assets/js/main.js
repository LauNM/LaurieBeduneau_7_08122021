import { filteredRecipesList, filterByKeyWord, filterDropdownByKeyWord } from "./filters.js";
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
import { createTag, getTagInfos } from "./tag.js";

const searchBarInput = document.getElementById('search');
const dropdowns = [...document.getElementsByClassName("filter-dropdown")];
const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");



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

// Create lists and associated dropdowns, display all recipes 
const loadData = (data) => {
    createLists(data);
    createAllDropdown();
    filterDropdownByKeyWord('appliances-input', applianceList, createDropdownAppliance);
    filterDropdownByKeyWord('ustensils-input', ustensilsList, createDropdownUstensils);
    filterDropdownByKeyWord('ingredients-input', ingredientList, createDropdownIngredients);
    displayData(data);
}

loadData(recipes)




/* Filter with searchBar */

searchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        if (tags.length > 0) {
            filterByTag = filterByKeyWord(recipes, getTagInfos(tags));
            filterBySearchBar = filteredRecipesList(filterByTag, e.target.value);
        }
        else {
            filterBySearchBar = filteredRecipesList(recipes, e.target.value);
        }
    }
    else {
        if (tags.length > 0) {
            filterBySearchBar = filterByKeyWord(recipes, getTagInfos(tags));
        }
        else {
            filterBySearchBar = recipes
        }
    }
    loadData(filterBySearchBar);
})



document.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'list-element') {
        const list = e.target.parentElement;
        const dropdown = list.parentElement;
        closeDropdown(dropdown);
        const type = list.getAttribute('data-type');
        const tag = createTag(e.target.textContent, type);
        tagSection.appendChild(tag);
        if (searchBarInput.value.length > 2) {
            filterBySearchBar = filteredRecipesList(recipes, searchBarInput.value);
            filterByTag = filterByKeyWord(filterBySearchBar, getTagInfos(tags));
        }
        else {
            filterByTag = filterByKeyWord(recipes, getTagInfos(tags));
        }
        loadData(filterByTag)
    }
})

document.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'far fa-times-circle fa-lg close-tag') {
        const tag = e.target.parentElement;
        tagSection.removeChild(tag)
        if (searchBarInput.value.length > 2) {
            filterBySearchBar = filteredRecipesList(recipes, searchBarInput.value);
            filterByTag = filterByKeyWord(filterBySearchBar, getTagInfos(tags));
        }
        else {
            filterByTag = filterByKeyWord(recipes, getTagInfos(tags));
        }
        loadData(filterByTag)
    }
})