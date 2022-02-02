/**
 * Filter data with value of search bar input
 * @param {Array} data
 * @param {String} filterElements - Value of search bar input
 * @returns {Array} returns data that includes value of input
 */

 export const filteredBySearchBar = (data, filterElements) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(filterElements.toLowerCase())
            || data[i].description.toLowerCase().includes(filterElements.toLowerCase())
            || data[i].ingredients.some((elemIng) => elemIng.ingredient.toLowerCase().includes(filterElements.toLowerCase()))) {
            newData.push(data[i])
        }
    }
    return newData;
}

/**
 * Filter data with tags value
 * @param {Array} data
 * @param {Array} keyWords - Array of tags {value, type}
 * @returns {Array} returns data === tags value
 */
export const filterByKeyWords = (data, keyWords) => {
    let newData = [...data];
    if (keyWords.length > 0) {
        keyWords.forEach((tag) => {
            const typeOfTag = tag.type;
            switch (typeOfTag) {
                case 'ingredients':
                    newData = newData.filter((item) => {
                        return item.ingredients.some((elemIng) => elemIng.ingredient.toLowerCase() === tag.value.toLowerCase())
                    })
                    break;
                case 'appliance':
                    newData = newData.filter((item) => {
                        return item.appliance.toLowerCase() === tag.value.toLowerCase()
                    })
                    break;
                case 'utensils':
                    newData = newData.filter((item) => {
                        return item.utensils.some((elemUst) => elemUst.toLowerCase() === tag.value.toLowerCase())
                    })
                    break;
                default:
                    return newData;
            }
        })
    }
    return newData;
}

/**
 * Filter list inside dropdown with dropdown input
 * @param {String} dropdownInput - id of dropdown
 * @param {Array} list - list of elements in dropdown
 * @param {Function} creationDropdownList - name of function to create dropdown list
 */
export const filterDropdownByKeyWord = (dropdownInput, list, creationDropdownList) => {
    let newList = [];
    const input = document.getElementById(dropdownInput);
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            newList = list.filter((item) => {
                return item.toLowerCase().includes(e.target.value.toLowerCase())
            })
        }
        else {
            newList = list
        }
        creationDropdownList(newList);
    })
}
