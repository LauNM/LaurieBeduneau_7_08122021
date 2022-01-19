export const filteredRecipesList = (data, filterElements) => {
    let newData = data.filter((item) => {
        return item.name.toLowerCase().includes(filterElements.toLowerCase())
            || item.description.toLowerCase().includes(filterElements.toLowerCase())
            || item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(filterElements.toLowerCase()))
    })
    return newData;
}

//réécrire avec une boucle for

export const filterByKeyWord = (data, keyWords) => {
    let newData = [...data];
    if (keyWords.length > 0) {
        keyWords.forEach((tag) => {
            const typeOfTag = tag.type;
            switch (typeOfTag) {
                case 'ingredients':
                    newData = newData.filter((item) => {
                        return item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(tag.value.toLowerCase()))
                    })
                    break;
                case 'appliance':
                    newData = newData.filter((item) => {
                        return item.appliance.toLowerCase().includes(tag.value.toLowerCase())
                    })
                    break;
                case 'ustensils':
                    newData = newData.filter((item) => {
                        return item.ustensils.some((elemUst) => elemUst.toLowerCase().includes(tag.value.toLowerCase()))
                    })
                    break;
                default:
                    return newData;
            }

        })
    }

    return newData;
}

/* export const filterDropdownByKeyWord = (dropdownInput, list, creationDropdownList) => {
    let newList = [];
    const input = document.getElementById(dropdownInput);
    input.addEventListener('input', (e) => {
         if(e.target.value.length > 0) {
             newList = list.filter((item) => {
                return item.toLowerCase().includes(e.target.value.toLowerCase())
            })
         }
         else {
             newList = list
         }
        creationDropdownList(newList);
        console.log(filterBySearchBar)
        addDropdownListener(filterBySearchBar);
    })
} */