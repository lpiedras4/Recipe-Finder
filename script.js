const resultsGrid = document.getElementById("meals");
const API_LINK = "https://www.themealdb.com/api/json/v1/1/search.php?";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const mealsContainer = document.getElementById("meals-container");
const resultHeading = document.getElementById("result-heading");
const errorContainer=document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector("meal-details-content");

async function searchMeals(keyword) {
    try{
        resultsGrid.innerHTML='<p>Loading</p>';
        const response = await fetch(API_LINK+`s=${keyword}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
       const data = await response.json();
       displayMeals(data.meals);
    }catch(error){
        console.error('Error fetching meals: ', error);
        resultsGrid.innerHTML ='<p id="api-message-error"> Sorry, something went wrong. Please try again </p>';
    }
}

function displayMeals(meals){
    //loop through meals and create an info card for each one
    mealsContainer.innerHTML='';
    meals.forEach((meal =>{
        mealsContainer.innerHTML+=`
        <div class="meal" data-meal-id="${meal.id}"> 
            <img src="${meal.strMealThumb} alt="${meal.strMeal}">
            <div class="meal-info"> 
            <h3 class="meal-title">${meal.strMeal}</h3>
            ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
            </div>
        </div>
        `
    }));
    //display meal details
    mealDetailsContent.innerHTML = `
    <imga src="${meal.strMealThumb}" alt="${meal.strMeal}" class = "meal-details-img">
    <h2 class="meal-details-title"></h2>
    `;


}
