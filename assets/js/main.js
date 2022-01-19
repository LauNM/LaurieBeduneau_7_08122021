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
import { createTag, getTagInfos } from "./tag.js";

const searchBarInput = document.getElementById('search');
const dropdowns = [...document.getElementsByClassName("filter-dropdown")];

const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");
const dropdownsContent = [...document.getElementsByClassName("content")];

const filterDropdownByKeyWord = (dropdownInput, list, creationDropdownList) => {
    let newList = [];
    const input = document.getElementById(dropdownInput);
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            newList = list.filter((item) => {
                return item.toLowerCase().includes(e.target.value.toLowerCase())
            })
        }
        else {
            newList = list
        }
        creationDropdownList(newList);
        addDropdownListener(filterBySearchBar);
    })
}

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
        loadData(filterBySearchBar)
    }
    else {
        if (tags.length > 0) {
            filterBySearchBar = filterByKeyWord(recipes, getTagInfos(tags));
        }
        else {
            filterBySearchBar = recipes
        }
        loadData(filterBySearchBar)
    }
})




/* Filter by tag */

function addDropdownListener(data) {
    dropdownsContent.forEach((dropdown) => {
       
        
        const list = [...dropdown.querySelectorAll(".list-element")];
        list.forEach((li) => {
            li.addEventListener("click", (e) => {
                closeDropdown(dropdown);
                const type = dropdown.getAttribute("data-type");
                const tag = createTag(e.target.textContent, type);
                tagSection.appendChild(tag)

                console.log('data before :', data)
                filterByTag = filterByKeyWord(data, getTagInfos(tags));

                

                console.log('tags : ', getTagInfos(tags))
                loadData(filterByTag)
                tag.addEventListener('click', () => {
                    tagSection.removeChild(tag)
                    console.log(getTagInfos(tags))
                    if (searchBarInput.value.length > 2) {
                        filterBySearchBar = filteredRecipesList(recipes, searchBarInput.value);
                        filterByTag = filterByKeyWord(filterBySearchBar, getTagInfos(tags));
                    }
                    else {
                        filterByTag = filterByKeyWord(recipes, getTagInfos(tags));
                    }
                    loadData(filterByTag)
                })
            })
        })
    })
}







