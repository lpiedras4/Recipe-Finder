const resultsGrid = document.getElementById("meals");

async function searchMeals(keyword) {
    try{
        resultsGrid.innerHTML('<p>Loading</p>');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
       const data = await response.json();
    }catch(error){
        console.error('Error fetching meals: ', error);
        resultsGrid.innerHTML ='<p id="api-message-error"> Sorry, something went wrong. Please try again </p>';
    }
}
searchMeals("chicken".meals);