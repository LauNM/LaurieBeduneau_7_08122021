/**
 * Function to create new tag container
 *
 * @param {String} value value of tag
 * @param {string} type type of tag (ingredients | appliance | utensils)
 * @returns returns HTML tag
 */
export const createTag = (value, type) => {
    const tagContainer = document.createElement('span');
    tagContainer.className = "tag-container";
    tagContainer.setAttribute('data-type', type);

    const tagName = document.createElement('span');
    tagName.className = "tag-name";
    tagName.innerHTML = value;
    const closeIcon = document.createElement('i');
    closeIcon.className = "far fa-times-circle fa-lg close-tag";

    tagContainer.appendChild(tagName);
    tagContainer.appendChild(closeIcon);

    return tagContainer;
}

/**
 * Get HTMLCollection of tags in DOM and create an array with only value and type of tags
 *
 * @param {HTMLCollection} array all HTML tags in DOM
 * @returns {Array} array of tag object with value and type
 */
export const getTagInfos = (array) => {
    let newArray = [];
    Array.from(array).forEach((el) => {
        const value = el.innerHTML;
        const type = el.parentElement.getAttribute('data-type');
        newArray.push({'value': value, 'type': type})
    })
    return newArray;
}
