export const filteredRecipesList = (data, filterElements) => {
    let newData = data.filter((item) => {
        return item.name.toLowerCase().includes(filterElements.toLowerCase())
            || item.description.toLowerCase().includes(filterElements.toLowerCase())
            || item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(filterElements.toLowerCase()))
    })
    return newData;
}

export const filterByKeyWord = (data, keyWords) => {
    let newData = [...data];
    Array.from(keyWords).forEach((tag) => {
      const typeOfTag = tag.parentElement.getAttribute('data-type')
          switch (typeOfTag) {
            case 'ingredients': 
                newData = newData.filter((item) => {
                    return item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(tag.innerHTML.toLowerCase()))
                })
                break;
            case 'appliance':
                newData = newData.filter((item) => {
                    return item.appliance.toLowerCase().includes(tag.innerHTML.toLowerCase())
                })
                break;
            case 'ustensils':
                newData = newData.filter((item) => {
                    return item.ustensils.some((elemUst) => elemUst.toLowerCase().includes(tag.innerHTML.toLowerCase()))
                })
                break;
            default:
                return newData;
        }
       
    })
    return newData;
}
