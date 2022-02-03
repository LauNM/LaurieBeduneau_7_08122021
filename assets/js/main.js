import { filteredBySearchBar, filterByKeyWords, filterDropdownByKeyWord } from "./filters.js";
import {
    createIngredientsList,
    createApplianceList,
    createUtensilsList,
    createDropdownIngredients,
    createDropdownAppliance,
    createDropdownUtensils,
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
let utensilsList = [];

/**
 * Call functions to create ingredients list
 * & Call function to create dropdown with ingredients list
 *
 * @param {Array} data all data
 */
const displayListIngredients = (data) => {
    ingredientList.splice(0, ingredientList.length);
    const newIngredientList = [...createIngredientsList(data)];
    newIngredientList.forEach((ingredient) => {
        ingredientList.push(ingredient)
    })
    createDropdownIngredients(ingredientList);
}

/**
 * Call functions to create appliance list
 * & Call function to create dropdown with appliance list
 *
 * @param {Array} data all data
 */
const displayListAppliance = (data) => {
    applianceList.splice(0, applianceList.length);
    const newApplianceList = [...createApplianceList(data)];
    newApplianceList.forEach((appliance) => {
        applianceList.push(appliance)
    })
    createDropdownAppliance(applianceList);
}
/**
 * Call functions to create utensils list
 * & Call function to create dropdown with utensils list
 *
 * @param {Array} data all data
 */
const displayListUtensils = (data) => {
    utensilsList.splice(0, utensilsList.length);
    const newUtensilsList = [...createUtensilsList(data)];
    newUtensilsList.forEach((utensil) => {
        utensilsList.push(utensil)
    })
    createDropdownUtensils(utensilsList);
}


/**
 * Display lists (ingredients & appliances & utensils) and display recipes
 * @param {Array} data all data
 */
const loadData = (data) => {
    displayListIngredients(data)
    displayListAppliance(data)
    displayListUtensils(data)
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
 * Verify if the element clicked is not already in [tags]
 */
document.addEventListener('mousedown', (e) => {
    if (e.target && e.target.className === 'list-element') {
        if (!getTagInfos(tags).some((item) => item.value.toLowerCase().includes(e.target.textContent.toLowerCase()))) {
            const list = e.target.parentElement;
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
        } else {
            closeAllDropdown();
        }
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
filterDropdownByKeyWord('ingredients-input', ingredientList, createDropdownIngredients);
filterDropdownByKeyWord('appliance-input', applianceList, createDropdownAppliance);
filterDropdownByKeyWord('utensils-input', utensilsList, createDropdownUtensils);