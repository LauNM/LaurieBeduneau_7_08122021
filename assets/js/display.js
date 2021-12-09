import {newData} from "./filters.js";
const recipesContainer = document.getElementById('recipes');

const displayContent = (data) => {
    const container = document.createElement('div');
    container.className = "recipe-container";
    container.id = `recipe-${data.id}`;
    
    const image = document.createElement('section');
    image.className = "recipe-image";

    container.appendChild(image);
    container.appendChild(addRecipe(data));
    return container;
}

const addRecipe = (data) => {
    const recipe = document.createElement('section');
    recipe.className = "recipe-description";

        const header = document.createElement('div');
        header.className = "recipe-header";

            const title = document.createElement('h2');
            title.className = "recipe-title";
            title.innerHTML = data.name;

            const cookTime = document.createElement('div');
            cookTime.className = "recipe-cooktime";

                const icon = document.createElement('i');
                icon.className = "far fa-clock";

                const time = document.createElement('p');
                time.className = "time bold";
                time.innerHTML = `${data.time} min`;

            cookTime.appendChild(icon);
            cookTime.appendChild(time);
        
        header.appendChild(title);
        header.appendChild(cookTime);

        const main = document.createElement('div');
        main.className = "recipe-main";

            const ingredientsList = document.createElement("div");
            ingredientsList.className = "ingredients-list"
            
            for (let i = 0; i < data.ingredients.length; i++) {

                const plist = data.ingredients[i];
                const p = document.createElement('p');

                    const boldIngredient = document.createElement('span');
                    boldIngredient.className = "bold";
                    boldIngredient.innerHTML = plist.ingredient;

                    const quantity = document.createElement('span');
                    plist.quantity ? quantity.innerHTML = `: ${plist.quantity}` : quantity.innerHTML = '';

                    const unit = document.createElement('span');
                    plist.unit ? unit.innerHTML = plist.unit : unit.innerHTML = '';
                
                p.appendChild(boldIngredient);
                p.appendChild(quantity);
                p.appendChild(unit);
                
                ingredientsList.appendChild(p);
            }
            

            const recipeText = document.createElement('p');
            recipeText.className = "recipe-text";
            recipeText.innerHTML = data.description;
        
        main.appendChild(ingredientsList);
        main.appendChild(recipeText);
    
    recipe.appendChild(header);
    recipe.appendChild(main);
    return recipe;
}



async function displayData() {
   await newData.forEach(element => {
    recipesContainer.appendChild(displayContent(element));
    })
}

displayData();

