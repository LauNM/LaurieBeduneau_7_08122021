export const filteredRecipesList = (data, filterElements) => {
    let newData =  data.filter((item) => {
       return item.name.toLowerCase().includes(filterElements.toLowerCase()) 
       || item.description.toLowerCase().includes(filterElements.toLowerCase()) 
       || item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(filterElements.toLowerCase()))
        })   
    return newData;
}