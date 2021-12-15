import { filteredRecipesList } from "./filters.js";
import { displayData } from "./display.js";
import {recipes} from "./data.js";


const searchInput = document.getElementById('search');

let tempSearch = [...recipes];
let ingredientList = [];


searchInput.addEventListener('keyup', () => {
    console.log(searchInput.value)
    if (searchInput.value.length > 2) {
        tempSearch = filteredRecipesList(recipes, searchInput.value);
        displayData(tempSearch);
    }
    else {
        displayData(recipes);
    }
})

displayData(recipes);
