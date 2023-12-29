let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");
let recipeContainer = document.querySelector(".recipe-container");
let recipeCloseBtn = document.querySelector(".recipe-close-btn");
let r = document.querySelector(".recipeIngrediantsdetails");
const foodApi = async (item) => {
    recipeContainer.innerHTML = `<h2>Fetching data</h2>`;
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
    let data = await res.json();
    // console.log(data.meals[0]); 
    recipeContainer.innerHTML = "";
    data.meals.forEach((elm) => {
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <img src = "${elm.strMealThumb}">
<h3>${elm.strMeal}</h3>
<p><span>Dish: ${elm.strArea}</span></p>
<p><span>Category: ${elm.strCategory}</span></p>
`;
        let viewRecipeBtn = document.createElement("button");
        viewRecipeBtn.textContent = "View Recipe";

        viewRecipeBtn.addEventListener("click", () => {
            openPopupRecipe(elm);
        })

        recipeDiv.appendChild(viewRecipeBtn);

        recipeContainer.appendChild(recipeDiv);
    });
};
let fetchIngredients = (elm) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        let string = elm[`strIngredient${i}`]
        if (string) {
            let recipeMeasure = elm[`strMeasure${i}`]
            ingredientsList += `<li>${recipeMeasure} ${string}</li>`
        } else {
            break;
        }
    }
    return ingredientsList;
};

let openPopupRecipe = (elm) => {
    r.innerHTML = `
            <h2>${elm.strMeal}<h2/>
            <h4>Ingredients:</h4>
            <ul>${fetchIngredients(elm)}</ul>
            <div class = "recipeIns">
            <h1>Instructions :</h1>
            <p>${elm.strInstructions}</p>
            </div>   
            `;
    r.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    r.parentElement.style.display = "none"
})

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let userSearch = searchBox.value;
    foodApi(userSearch);

});
