import { recipes } from "./data.js";
export let newData;

const searchInput = document.getElementById('search');

const inputValue = () => {
    searchInput.addEventListener('keyup', () => {
       if(searchInput.value.length > 2) {
           return searchInput.value
       }
    })
}
inputValue();


if (searchInput.value && searchInput.value.length && searchInput.value.length !== 0) {
    newData = recipes[0];
} else {
    newData = recipes;
}
