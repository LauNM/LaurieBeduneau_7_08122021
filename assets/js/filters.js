export const filteredRecipesList = (data, filterElements) => {
    let newData = data.filter((item) => {
        return item.name.toLowerCase().includes(filterElements.toLowerCase())
            || item.description.toLowerCase().includes(filterElements.toLowerCase())
            || item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(filterElements.toLowerCase()))
    })
    return newData;
}

export const filterByKeyWord = (data, keyWordsTab) => {
    let newData = [...data];
    keyWordsTab.forEach((tag) => {
        newData = newData.filter((item) => {
            return item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(tag.toLowerCase()))
                || item.appliance.toLowerCase().includes(tag.toLowerCase())
                || item.ustensils.some((elemUst) => elemUst.toLowerCase().includes(tag.toLowerCase()))
        })
    })
    console.log(newData);
}