let url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?establishment_id=";
let id = sessionStorage.getItem("searchID");
let inspection = url+id;

fetch(inspection)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
    function appendData(data) {
    var mainContainer = document.getElementById("myData");
    var failed = 0, total = 0;
    var recent = '';
    var recentResult = '', recentText = '';
    var newData = data.map(item => {
    return {
        name: item.name,
        address: item.address_line_1,
        city: item.city,
        zip: item.zip,
        inspection_date: item.inspection_date,
        inspection_results: item.inspection_results
    }
    });
    // Filter an array
    newData = newData.filter(item => !(item.inspection_results === "------" ));
    // Sort an array by date
    newData.sort(function(a, b) {
        var c = new Date(a.inspection_date);
        var d = new Date(b.inspection_date);
        return c-d;
    });
    // CONVERT JSON TO TABLE
    let col = [];
    for (let i = 0; i < newData.length; i++) {
        for (let key in newData[i]) {
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
    for (let i = 0; i < newData.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = newData[i][col[j]];
        }
    };
    for (var i = 0; i < newData.length; i++) {
        total +=1
        if (newData[i].inspection_results === "Critical Violations observed"){
            failed += 1
        } else if (newData[i].inspection_results === "Non-Compliant - Violations Observed"){
            failed += 1
        } else if (newData[i].inspection_date > recent){
            recent = newData[i].inspection_date
            recentResult = newData[i].inspection_results
        }
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        let divContainer = document.getElementById("myData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        console.log(recentResult);
    };
    if (recentResult === "Compliant - No Health Risk"){
        recentText = "passed"
    } else if (recentResult === "Compliance Schedule - Completed"){
        recentText = "passed"
    } else if (recentResult === "Compliance Schedule - Outstanding"){
        recentText = "passed"
    } else if (recentResult === "Compliant - No Health Risk"){
        recentText = "passed"
    } else if (recentResult === "Critical Violations observed"){
        recentText = "failed"
    } else if (recentResult === "Non-Compliant - Violations Observed"){
        recentText = "failed"
    } else{
        recentText = "failed"
    };
    var reportContainer = document.getElementById("report");
    var div = document.createElement("div");
    div.innerHTML = 'This restaurant has failed ' + failed + ' out of  ' + total + ' inspections. It ' + recentText + ' the most recent inspection on ' + recent.substr(0,10) + '.' + '<br>';
    reportContainer.appendChild(div)        
    // GET results from Form.html
    function getAddress() {
        console.log("Called getAddress");
        let userURL = "https://eatsafefoods.herokuapp.com/users/";
        const fetchPromise = fetch(userURL);
        fetchPromise
            .then((response) => {
                return response.json();
            })
            .then((user) => {
                console.log(user);
                let message = "";
                let count = 0;
                let newA = []; 
                let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                for (let i=0; i<user.length; i++) {
                    for (let j=0; j<data.length; j++) {
                        if (user[i].address.toUpperCase() === data[j].address_line_1) {
                        count ++;
                        newA.push(count);
                        break;
                    } else if (user[i].address.toUpperCase() !== data[j].address_line_1) {
                        count = 0
                    }
                    };
                    if (newA.length === 0) {
                        message ="No cases  of Covid-19 have been reported at this location."/* + "The number of cases: " + count + currentDate + "."*/;
                        document.getElementById("formReport").innerHTML = message;
                    } else if (newA.length > 0) {
                        message = "Cases of Covid-19 have been reported at this location." + " Number of cases reported is " + newA.length + "."/* + currentDate + "."*/;
                        document.getElementById("formReport").innerHTML = message;
                    } 
                };
            })
            .catch((err) => {
                console.log(err);
                document.getElementById("getUserContent").innerHTML = "Invalid user zipcode: " + userZipcode;
            });
        };
    getAddress();
};


