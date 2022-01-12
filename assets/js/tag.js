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

export const eventCreationTag = (data) =>  {
    /* Array.from(listElement).forEach((el) => {
    el.addEventListener('click', () => {
            const type = el.parentElement.getAttribute('data-type');
            const tag = createTag(el.innerHTML, type);
            tagSection.appendChild(tag) 
            tag.addEventListener('click', () => {
                tagSection.removeChild(tag)
                displayData(filterByKeyWord(data, tags))
            })
            displayData(filterByKeyWord(data, tags))
        })
    }) */
   
}