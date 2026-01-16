async function getData(name){
    const url = "www.themealdb.com/api/json/v1/1/search.php?s={name}";
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    }catch (error){
        console.log(error.message);
    }
}
getData();