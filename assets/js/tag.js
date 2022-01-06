import { displayData } from "./displayRecipe.js";
import { filterByKeyWord } from "./filters.js";

const listElement = document.getElementsByClassName("list-element");
const tagSection = document.getElementById("tags");
const tags = document.getElementsByClassName("tag-name");

/* export const createTag = (parent, tag,) => {
    const type = parent.getAttribute('data-type');
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
} */
export const createTag = (element) => {

    const type = element.path[1].getAttribute('data-type');
    const tagContainer = document.createElement('span');
    tagContainer.className = "tag-container";
    tagContainer.setAttribute('data-type', type);

    const tagName = document.createElement('span');
    tagName.className = "tag-name";
    tagName.innerHTML = element.path[0].innerHTML;
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