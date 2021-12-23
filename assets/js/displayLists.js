export const displayDropdownElements = (list) => {
    const listContent = document.createElement('ul');
    listContent.className="list-of-elements";
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
