export const displayTag = (tag, type) => {
    const tagContainer = document.createElement('span');
    tagContainer.className = "tag-container";
    tagContainer.setAttribute('data-type', type);

    const tagName = document.createElement('span');
    tagName.className = "tag-name";
    tagName.innerHTML = tag;
    const closeIcon = document.createElement('i');
    closeIcon.className = "far fa-times-circle fa-lg close-tag";

    tagContainer.appendChild(tagName);
    tagContainer.appendChild(closeIcon);

    return tagContainer;
}