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
        resultsGrid.innerHTML('<p>Loading</p>');
        const response = await fetch(API_LINK+`s=${keyword}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
       const data = await response.json();
    }catch(error){
        console.error('Error fetching meals: ', error);
        resultsGrid.innerHTML ='<p id="api-message-error"> Sorry, something went wrong. Please try again </p>';
    }
}
