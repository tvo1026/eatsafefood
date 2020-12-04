const buttonChange = () => {
// grab all the buttons
let Buttons = document.querySelectorAll(".selectSection button");

// loop through the buttons using for..of 
for (let button of Buttons) {

 // listen for a click event 
 button.addEventListener('click', (e) => {
  // Store the event target in a const
  const et = e.target;

  // select active class
  const active = document.querySelector(".active");

  /* when a button is clicked, remove the active class 
from the button that has it */
  if (active) {
    active.classList.remove("active");
   }

  // Add active class to the clicked element
  et.classList.add("active");

  // select all classes with the name content
  let allContent = document.querySelectorAll('.content');

  // loop through all content classes
  for (let content of allContent) {

    /* display the content if the value in the data attribute of the button and content are the same */
    if(content.getAttribute('data-number') === button.getAttribute('data-number')) {
      content.style.display = "flex";
     }

     // if it's not equal then hide it.
     else {
        content.style.display = "none";
      }
    }
 });
}
}

// Call buttonChange function 
buttonChange();

// POST method
function submitUser() {
    console.log("Called submitUser");
    
    let userNameParam = document.getElementById("userName").value;
    let restaurantNameParam = document.getElementById("restaurantName").value;
    let addressParam = document.getElementById("address").value;
    let cityParam = document.getElementById("city").value;
    let zipcodeParam = document.getElementById("zipcode").value;
    let dateParam = document.getElementById("date").value;
    let data = {'userName':userNameParam, 'restaurantName':restaurantNameParam, 'address': addressParam, 'city': cityParam, 'zipcode': zipcodeParam, 'date': dateParam};
    console.log(JSON.stringify(data))

    let userURL = "http://localhost:5000/users/";
    const fetchPromise = fetch(userURL,{ method:'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(data)});
  
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        console.log(user);
        if (user) {
          let userId = user._id;
          let userName = user.userName;
          let restaurantName = user.restaurantName;
          let address = user.address;
          let city = user.city;
          let zipcode = user.zipcode;
          let date = user.date;
          let message = "Id: " + userId + "<br>userName: " + userName + "<br>restaurantName: " + restaurantName + "<br>address: " + address + "<br>city: " + city + "<br>zipcode: " + zipcode + "<br>date: " + date; 
          if (typeof userId === "undefined") {
            window.alert("Sorry. Please input all the required fields or change your username.");
          } else {
            document.getElementById("postUserContent").innerHTML = message; 
          }
        }
    })
    .catch((err) => {
        console.log(err);
        document.getElementById("postUserContent").innerHTML = "Invalid user id: " + userIdParam;
    }); 
  }
  
  // GET method
  function getUser() {
      console.log("Called getUser");
    
      let userZipcode = document.getElementById("userZipcode").value;
      let userURL = "http://localhost:5000/users/" + userZipcode;
      const fetchPromise = fetch(userURL);
  
      fetchPromise
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          console.log(user);
          // CONVERT JSON TO TABLE
          let col = [];
          for (let i = 0; i < user.length; i++) {
              for (let key in user[i]) {
                  if (col.indexOf(key) === -1) {
                      col.push(key);
                  }
              }
          }
          // CREATE DYNAMIC TABLE.
          let table = document.createElement("table");
  
          // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
          let tr = table.insertRow(-1);                   // TABLE ROW.
  
          for (let i = 0; i < col.length; i++) {
              let th = document.createElement("th");      // TABLE HEADER.
              th.innerHTML = col[i];
              tr.appendChild(th);
          }
  
          // ADD JSON DATA TO THE TABLE AS ROWS.
          for (let i = 0; i < user.length; i++) {
              tr = table.insertRow(-1);
              for (let j = 0; j < col.length; j++) {
                  let tabCell = tr.insertCell(-1);
                  tabCell.innerHTML = user[i][col[j]];
              }
          }
  
          // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
          let divContainer = document.getElementById("getUserContent");
          divContainer.innerHTML = "";
          divContainer.appendChild(table);
      })
      .catch((err) => {
          console.log(err);
          document.getElementById("getUserContent").innerHTML = "Invalid user zipcode: " + userZipcode;
      });
     
  }
  
  // PUT method
  function updateUser() {
    console.log("Called updateUser");
    
    let updateUserNameParam = document.getElementById("updateUser").value;
    let updateRestaurantNameParam = document.getElementById("updateRestaurantName").value;
    let updateAddressParam = document.getElementById("updateAddress").value;
    let updateCityParam = document.getElementById("updateCity").value;
    let updateZipcodeParam = document.getElementById("updateZipcode").value;
    let updateDateParam = document.getElementById("updateDate").value;
    data = {'userName': updateUserNameParam, 'restaurantName':updateRestaurantNameParam, 'address':updateAddressParam, 'city':updateCityParam, 'zipcode':updateZipcodeParam, 'date':updateDateParam};
    console.log(JSON.stringify(data))


    let userURL = "http://localhost:5000/users/" + updateUserNameParam;
    const fetchPromise = fetch(userURL,{ method:'PUT', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(data)});
  
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        console.log(user);
        let message = "";
        let userName = data.userName;
        let restaurantName = data.restaurantName;
        let address = data.address;
        let city = data.city;
        let zipcode = data.zipcode;
        let date = data.date;
        if (user) {
          message = "Your username is updated successfully" + "<br>userName: " + userName + "<br>restaurantName: " + restaurantName + "<br>address: " + address + "<br>city: " + city + "<br>zipcode: " + zipcode + "<br>date: " + date; 
          if (user.n === 0) {
            window.alert("Sorry. Your username does not exist. Please try again");
          } else if ((userName === "") || (restaurantName === "") || (address === "") || (city === "") || (zipcode === "")) {
            window.alert("Please enter all the required fields.");
          } else {
            document.getElementById("updatedUserContent").innerHTML = message;
          }
        }
    })
    .catch((err) => {
        console.log(err);
        document.getElementById("updatedUserContent").innerHTML = "Invalid userName: " + updateUserNameParam;
    });
  }
  
  // DELETE method
  function deleteUser() {
    console.log("Called deleteUser");
  
    let deleteUserNameParam = document.getElementById("deleteUserName").value;
    console.log("userName:" + deleteUserNameParam);
    let userURL = "http://localhost:5000/users/" + deleteUserNameParam;
    const fetchPromise = fetch(userURL,{ method:'DELETE'});
  
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        console.log(user);
        let message = "";
        if (user) {
          message = deleteUserNameParam + " is deleted"; 
          if (user.deletedCount === 0) {
            window.alert("Sorry. Your username does not exist. Please try again");
          } else {
            document.getElementById("deleteUserContent").innerHTML = message;
          }
        }
    })
    .catch((err) => {
        console.log(err);
        window.alert("Please enter the required field");
    });
  };

