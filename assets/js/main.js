import {filteredBySearchBar, filterByKeyWords, filterDropdownByKeyWord } from "./filters.js";
import {
    createIngredientsList,
    createApplianceList,
    createUstensilsList,
    createDropdownIngredients,
    createDropdownAppliance,
    createDropdownUstensils,
    openDropdown,
    closeAllDropdown
} from "./dropdowns.js";
import { displayRecipes, noRecipeMessage } from "./recipes.js";
import { recipes } from "./data.js";
import { createTag, getTagInfos } from "./tag.js";

const searchBarInput = document.getElementById('search');
const dropdowns = [...document.getElementsByClassName("filter-dropdown")];
const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");

let filterBySearchBar = [...recipes];
let filterByTag = [...recipes];
let ingredientList = [];
let applianceList = [];
let ustensilsList = [];

/**
 * Call function to create ingredients list
 * & Call function to create dropdown with ingredients list
 * & Call function to add event listener when researching an ingredient in dropdown input
 * 
 * @param {Array} data all data
 */
const displayListIngredients = (data) => {
    ingredientList = [...createIngredientsList(data)];
    createDropdownIngredients(ingredientList);
    filterDropdownByKeyWord('ingredients-input', ingredientList, createDropdownIngredients);
}
/**
 * Call function to create appliance list
 * & Call function to create dropdown with appliance list
 * & Call function to add event listener when researching an appliance in dropdown input
 * 
 * @param {Array} data all data
 */
const displayListAppliance = (data) => {
    applianceList = [...createApplianceList(data)];
    createDropdownAppliance(applianceList);
    filterDropdownByKeyWord('appliance-input', applianceList, createDropdownAppliance);
}
/**
 * Call function to create ustensils list
 * & Call function to create dropdown with ustensils list
 * & Call function to add event listener when researching an ustensil in dropdown input
 * 
 * @param {Array} data all data
 */
const displayListUstensils = (data) => {
    ustensilsList = [...createUstensilsList(data)];
    createDropdownUstensils(ustensilsList);
    filterDropdownByKeyWord('ustensils-input', ustensilsList, createDropdownUstensils);
}


/**
 * Display lists (ingredients & appliances & ustensils) and display recipes
 * @param {Array} data all data
 */
const loadData = (data) => {
    displayListIngredients(data)
    displayListAppliance(data)
    displayListUstensils(data)
    if (data.length > 0) {
        displayRecipes(data);
    }
    else {
        noRecipeMessage();
    }
    
}

openDropdown(dropdowns);
loadData(recipes)


/**
 * Filter with searchBar
 */
searchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        if (tags.length > 0) {
            filterByTag = filterByKeyWords(recipes, getTagInfos(tags));
            filterBySearchBar = filteredBySearchBar(filterByTag, e.target.value);
        }
        else {
            filterBySearchBar = filteredBySearchBar(recipes, e.target.value);
        }
    }
    else {
        if (tags.length > 0) {
            filterBySearchBar = filterByKeyWords(recipes, getTagInfos(tags));
        }
        else {
            filterBySearchBar = recipes
        }
    }
    loadData(filterBySearchBar);
})


/**
 * Filter with Tag
 */
document.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'list-element') {
        const list = e.target.parentElement;
        const dropdown = list.parentElement;
        closeAllDropdown();
        const type = list.getAttribute('data-type');
        const tag = createTag(e.target.textContent, type);
        tagSection.appendChild(tag);
        if (searchBarInput.value.length > 2) {
            filterBySearchBar = filteredBySearchBar(recipes, searchBarInput.value);
            filterByTag = filterByKeyWords(filterBySearchBar, getTagInfos(tags));
        }
        else {
            filterByTag = filterByKeyWords(recipes, getTagInfos(tags));
        }
        loadData(filterByTag)
    }
})


/**
 * Search tag in dropdowns tags list
 */
document.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'far fa-times-circle fa-lg close-tag') {
        const tag = e.target.parentElement;
        tagSection.removeChild(tag)
        if (searchBarInput.value.length > 2) {
            filterBySearchBar = filteredBySearchBar(recipes, searchBarInput.value);
            filterByTag = filterByKeyWords(filterBySearchBar, getTagInfos(tags));
        }
        else {
            filterByTag = filterByKeyWords(recipes, getTagInfos(tags));
        }
        loadData(filterByTag)
    }
})