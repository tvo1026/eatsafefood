const restaurantList = document.getElementById('restaurantList');
const searchBar = document.getElementById('searchBar');
let restaurants = [];

//Based this search function off of tutorial at https://www.youtube.com/watch?v=wxz5vJ1BWrc&t=781s
//filters the restaurants as user types and ignores upper/lower case
searchBar.addEventListener('keyup', (i) => {
    const searchString = i.target.value.toLowerCase();
    const filteredRestaurants = restaurants.filter(restaurant => {
        return (
        restaurant.name.toLowerCase().includes(searchString) || restaurant.address_line_1.toLowerCase().includes(searchString)
        );
    })
    console.log(filteredRestaurants);
    displayRestaurants(filteredRestaurants)
})

//loads restaurant list from json
const loadRestaurants = async () => {
    try {
        const res = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?');
        restaurants = await res.json();
    } catch (err) {
        console.error(err);
    }
};

function setID(id) {
    sessionStorage.setItem("searchID", id);
    console.log(id)
}

//displays all restaurants and will provide links when finished
const displayRestaurants = (restaurants) => {
    //Unique restaurants' names.
    // Declare a new array 
    let uniqueRestaurantList = []; 
    // Declare an empty object 
    let uniqueObject = {};             
    // Loop for the array elements 
    for (let i in restaurants) { 
    // Extract the address
    objAddress = restaurants[i]['address_line_1']; 
    // Use the title as the index 
    uniqueObject[objAddress] = restaurants[i]; 
    }  
    // Loop to push unique object into array 
    for (i in uniqueObject) { 
    uniqueRestaurantList.push(uniqueObject[i]); 
    } 
    const htmlString = uniqueRestaurantList
    .map((restaurant) => {
        return `
        <li class="restaurant">
            <a href="report.html" target="_blank" onclick="return setID(${restaurant.establishment_id})">${restaurant.name.toUpperCase().replace(/\d+$/, "")}</a>
            <p><i>${restaurant.address_line_1.toUpperCase()}</i></p>
        </li>`;
    })
        .join('');
        restaurantList.innerHTML = htmlString;
};

//Starts loading the functions
loadRestaurants();

