export const displayDropdownElements = (list) => {
    const listContent = document.createElement('ul');
    listContent.className="list-elements";
    list.forEach(element => {
        const listElement = document.createElement('li');
        listElement.textContent = element;
        listContent.appendChild(listElement)
    })
    return listContent;

}

export const createIngredientsList = (data) => {
    let allIngredients = [];
    data.forEach(recipe => {
        recipe.ingredients.forEach(element => {
            if (!allIngredients.includes(element.ingredient)) {
                allIngredients.push(element.ingredient)
            }

        })
    })
    return allIngredients.sort();
}

export const createApplianceList = (data) => {
    let allAppliance = [];
    data.forEach(recipe => {
        if (!allAppliance.includes(recipe.appliance)) {
            allAppliance.push(recipe.appliance)
        }
    })
    return allAppliance.sort();
}

export const createUstensilsList = (data) => {
    let allUstensils = [];
    data.forEach(recipe => {
        recipe.ustensils.forEach(element => {
            if (!allUstensils.includes(element)) {
                allUstensils.push(element)
            }
        })
    })
    return allUstensils.sort();
}
