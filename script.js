// dom elements
const resultsGrid = document.getElementById("meals");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer=document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector("meal-details-content");

//api urls
const API_LINK = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${API_LINK}search.php?s=`;
const LOOKUP_URL=`${API_LINK}lookup.php?i=`;

searchBtn.addEventListener("click", searchMeals);

searchInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter") searchMeals();
});

mealsContainer.addEventListener("click", handleClickMeal);

async function searchMeals() {
    const searchTerm = searchInput.value.trim();

    try{
    resultHeading.innerHTML=`<p>Searching for "${searchTerm}"...</p>`;
    //fetch meals from API
    const response = await fetch(`${SEARCH_URL}${searchTerm}`);
    const data = await response.json();
        if(data.meals===null){
        resultHeading.textContent="";
        mealsContainer.innerHTML="";
        errorContainer.textContent=`No recipes found for "${searchTerm}". Try another search term!`;
        errorContainer.classList.remove("hidden");
        }else{
            resultHeading.textContent=`Search results for "${searchTerm}":`;
            displayMeals(data.meals);
            searchInput.value="";
        }

       
    }catch(error){
        console.error('Error fetching meals: ', error);
        resultHeading.innerHTML ='<p> Sorry, something went wrong. Please try again </p>';
    }
}

function displayMeals(meals){
   mealsContainer.innerHTML="";
    //loop through meals and create an info card for each one
    
    meals.forEach((meal =>{
        mealsContainer.innerHTML+=`
        <div class="meal" data-meal-id="${meal.id}"> 
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info"> 
            <h3 class="meal-title">${meal.strMeal}</h3>
            ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
            </div>
        </div>
        `
    }));
}
//display meal details
async function handleClickMeal(e){
    const mealEl = e.target.closest(".meal"); //closest() walks up the DOM tree and finds the nearest parent with the class ".meal"
    if(!mealEl)return; //if .meal doesn´t exist, the function stops immediately

    const mealId = mealEl.getAttribute("data-meal-id"); //this function gets the attribute meal ID for lookup

    try{
        const response = await fetch(`${LOOKUP_URL}${mealId}`);
        const data = await response.json();

        if(data.meals && data.meals[0]){ //if statement to ensure API returned meals and at least one meal exists
            const meal = data.meals[0];

            const ingredients = [];
            for(let i= 0; i<=20 ;i++){
                if(meal){

                }
            }
        }

         mealDetailsContent.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class = "meal-details-img">
        <h2 class="meal-details-title">${meal.strMeal}</h2>
        <div class="meal-details-category">
        <span>${meal.strCategory} || "Uncategorized" </span>
        </div>
        <div class="meal-details-instructions">
            <h3>Ingredients</h3>    
            <ul class="ingredients-list">
            ${ingredients.map(
            (item)=>`
            <li><i class="fas fa-check-circle"></i> ${item.measure} ${item.ingredient}</li>
            `
            ).join("")}
            </ul>
        </div>
        ${meal.strYoutube ? `<a href ="${meal.strYoutube}" target="_blank" class="youtbe-link">
        <i class="fab fa-youtube"></i> Watch Video
        </a>
        `: ""
        }
        `;

    }catch(error){

    }
}
   
    
    



