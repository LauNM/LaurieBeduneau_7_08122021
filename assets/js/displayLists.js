export const displayDropdownElements = (list, type) => {
    const listContent = document.createElement('ul');
    listContent.className = "list-of-elements";
    listContent.setAttribute('data-type', type);
    list.forEach(element => {
        const listElement = document.createElement('li');
        listElement.textContent = element;
        listElement.className = "list-element";
        listContent.appendChild(listElement)
    })
    return listContent;

}

export const createIngredientsList = (data) => {
    let allIngredients = [];
    data.forEach(recipe => {
        recipe.ingredients.forEach(element => {
            let formattedElement = element.ingredient.charAt(0).toUpperCase() + element.ingredient.slice(1).toLowerCase();
            if (!allIngredients.includes(formattedElement)) {
                allIngredients.push(formattedElement)
            }

        })
    })
    return allIngredients.sort();
}

export const createApplianceList = (data) => {
    let allAppliance = [];
    data.forEach(recipe => {
        let formattedElement = recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase();
        if (!allAppliance.includes(formattedElement)) {
            allAppliance.push(formattedElement)
        }
    })
    return allAppliance.sort();
}

export const createUstensilsList = (data) => {
    let allUstensils = [];
    data.forEach(recipe => {
        recipe.ustensils.forEach(element => {
            let formattedElement = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
            if (!allUstensils.includes(formattedElement)) {
                allUstensils.push(formattedElement)
            }
        })
    })
    return allUstensils.sort();
}

/* Get dropdown buttons by className and add an event listener */
export const openDropdown = (dropdowns) => {
    Array.from(dropdowns).forEach((el) => {
    el.addEventListener('click', () => {
        closeAllDropdown(dropdowns);
        el.style.display = "none"
        el.nextElementSibling.style.display = "block";
        })
    })
}

const closeAllDropdown = (dropdowns) => {
    Array.from(dropdowns).forEach((el) => {
        el.style.display = "flex";
        el.nextElementSibling.style.display = "none";
    })
}

/* Get icon chevron up and add an event listener */
export const closeDropdown = (closeDropdown) => {
   Array.from(closeDropdown).forEach((el) => {
    el.addEventListener('click', () => {
        let listDropdown = el.parentElement.parentElement;
        listDropdown.style.display = "none"
        listDropdown.previousElementSibling.style.display = "flex";
        })
    }) 
}


const ingredientsButton = document.getElementById("ingredients");
const applianceButton = document.getElementById("appliance");
const utensilsButton = document.getElementById("utensils");

export const refreshIngredientsList = (list) => {
    if(ingredientsButton.nextElementSibling.querySelector(".list-of-elements")) {
        ingredientsButton.nextElementSibling.querySelector(".list-of-elements").remove();
    }
    ingredientsButton.nextElementSibling.appendChild(displayDropdownElements(list, 'ingredients'));
}
export const refreshApplianceList = (list) => {
    if(applianceButton.nextElementSibling.querySelector(".list-of-elements")) {
        applianceButton.nextElementSibling.querySelector(".list-of-elements").remove();
    }
    applianceButton.nextElementSibling.appendChild(displayDropdownElements(list, 'appliance'));
}
export const refreshUstensilsList = (list) => {
    if(utensilsButton.nextElementSibling.querySelector(".list-of-elements")) {
        utensilsButton.nextElementSibling.querySelector(".list-of-elements").remove();
    }
    utensilsButton.nextElementSibling.appendChild(displayDropdownElements(list, 'ustensils'));
}