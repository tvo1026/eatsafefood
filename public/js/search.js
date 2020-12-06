const restaurantList = document.getElementById('restaurantList');
const searchBar = document.getElementById('searchBar');
let restaurants = [];

//Based this search function off of tutorial at https://www.youtube.com/watch?v=wxz5vJ1BWrc&t=781s
//filters the restaurants as user types and ignores upper/lower case
searchBar.addEventListener('keyup', (i) => {
    const searchString = i.target.value.toLowerCase();
    const filteredRestaurants = restaurants.filter(restaurant => {
        return (
        restaurant.name.toLowerCase().includes(searchString) || restaurant.address1.toLowerCase().includes(searchString)
        );
    })
    console.log(filteredRestaurants);
    displayRestaurants(filteredRestaurants)
    if (searchBar.addEventListener() === "") {
        displayRestaurants(null);
    }
})

//loads restaurant list from json
const loadRestaurants = async () => {
    try {
        const res = await fetch('restaurants.json');
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
    const htmlString = restaurants
        .map((restaurant) => {
            return `
            <li class="restaurant">
                <a href="report.html" target="_blank" onclick="return setID(${restaurant.id})">${restaurant.name}</a>
                <p><i>${restaurant.address1}</i></p>
            </li>
        `;
        })
        .join('');
        restaurantList.innerHTML = htmlString;
};

//Starts loading the functions
loadRestaurants();

