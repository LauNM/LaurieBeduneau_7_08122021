const dropdowns = [...document.getElementsByClassName("filter-dropdown")];

const ingredientsButton = document.getElementById("ingredients");
const applianceButton = document.getElementById("appliance");
const utensilsButton = document.getElementById("utensils");


/* CREATE LISTS */

/**
 * Create list of ingredients from all data
 *
 * @param {Array} data - all data
 * @returns Array with new ingredients
 */
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

/**
 * Create list of appliances from all data
 *
 * @param {Array} data - all data
 * @returns Array with new appliances
 */
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

/**
 * Create list of utensils from all data
 *
 * @param {Array} data - all data
 * @returns Array with new utensils
 */
export const createUtensilsList = (data) => {
    let allUtensils = [];
    data.forEach(recipe => {
        recipe.utensils.forEach(element => {
            let formattedElement = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
            if (!allUtensils.includes(formattedElement)) {
                allUtensils.push(formattedElement)
            }
        })
    })
    return allUtensils.sort();
}


/* CREATE HTML CONTAINERS */

/**
 * Create html list container
 *
 * @param {Array} list - list of elements to display
 * @param {String} type - ingredients/appliance/utensils
 * @returns HTML <ul> with list
 */
const displayListContent = (list, type) => {
    const listContent = document.createElement('ul');
    listContent.className = "list-of-elements";
    listContent.setAttribute('data-type', type);
    if (list.length > 0) {
        list.forEach(element => {
            const listElement = document.createElement('li');
            listElement.textContent = element;
            listElement.className = "list-element";
            listContent.appendChild(listElement);
        })
    } else {
        const message = document.createElement('li');
        message.className = "dropdown-message";
        message.textContent = `Aucun résultat...`
        listContent.appendChild(message);
    }

    return listContent;

}


/**
 * Create or update ingredients dropdown with new list
 *
 * @param {Array} list - list of ingredients
 * @returns HTML with list of ingredients in a dropdown
 */
export const createDropdownIngredients = (list) => {
    if (ingredientsButton.nextElementSibling.querySelector(".list-of-elements")) {
        ingredientsButton.nextElementSibling.querySelector(".list-of-elements").remove();
    }
    ingredientsButton.nextElementSibling.appendChild(displayListContent(list, 'ingredients'));
}

/**
 * Create or update appliance dropdown with new list
 *
 * @param {Array} list - list of appliances
 * @returns HTML with list of appliances in a dropdown
 */
export const createDropdownAppliance = (list) => {
    if (applianceButton.nextElementSibling.querySelector(".list-of-elements")) {
        applianceButton.nextElementSibling.querySelector(".list-of-elements").remove();
    }
    applianceButton.nextElementSibling.appendChild(displayListContent(list, 'appliance'));
}

/**
 * Create or update utensils dropdown with new list
 *
 * @param {Array} list - list of utensils
 * @returns HTML with list of utensils in a dropdown
 */
export const createDropdownUtensils = (list) => {
    if (utensilsButton.nextElementSibling.querySelector(".list-of-elements")) {
        utensilsButton.nextElementSibling.querySelector(".list-of-elements").remove();
    }
    utensilsButton.nextElementSibling.appendChild(displayListContent(list, 'utensils'));
}

/* DROPDOWN EVENTS */

/**
 * Open dropdown on click
 */
export const openDropdown = () => {
    dropdowns.forEach((el) => {
        el.addEventListener('click', () => {
            closeAllDropdown(dropdowns);
            el.style.display = "none"
            el.nextElementSibling.style.display = "block";
        })
    })
}

/**
 * Close dropdown
 */
export const closeAllDropdown = () => {
    dropdowns.forEach((el) => {
        el.style.display = "flex";
        el.nextElementSibling.style.display = "none";
    })
}

document.addEventListener('mouseup', function (e) {
    let isInside = false;
    dropdowns.forEach((el) => {
        const dropdown = el.nextElementSibling;

        if (dropdown.contains(e.target)) {
            isInside = e.target.className !== 'fas fa-chevron-up close';
            /*if (e.target.className === 'fas fa-chevron-up close') {
                isInside = false;
            }
            else {
                isInside = true;
            }*/
        }
    });
    if (!isInside) {
        closeAllDropdown(dropdowns);
    }
})
