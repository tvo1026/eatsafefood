let url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?city=COLLEGE PARK&establishment_id=";
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
            for (var i = 0; i < data.length; i++) {
                if (data[i].inspection_date < "2015-09-12T00:00:00.000"){
                    continue
                }
                var div = document.createElement("div");
                div.innerHTML = data[i].name + ', '+ data[i].inspection_date + ', ' + data[i].inspection_results;
                mainContainer.appendChild(div)
                if (data[i].inspection_results === "Critical Violations observed"){
                    failed += 1
                }
                if (data[i].inspection_results === "Non-Compliant - Violations Observed"){
                    failed += 1
                }
                total +=1
                if (data[i].inspection_date > recent){
                    recent = data[i].inspection_date
                    recentResult = data[i].inspection_results
                }
                /*console.log(typeof(recentResult))
                console.log(typeof(data[0].inspection_results))
                console.log(typeof(data[0].inspection_date))*/
            console.log(recentResult);
            }
            if (recentResult === "Compliant - No Health Risk"){
                recentText = "passed"
            }
            if (recentResult === "Compliance Schedule - Completed"){
                recentText = "passed"
            }
            if (recentResult === "Compliant - No Health Risk"){
                recentText = "passed"
            }
            if (recentResult === "Critical Violations observed"){
                recentText = "failed"
            }
            if (recentResult === "Non-Compliant - Violations Observed"){
                recentText = "failed"
            }
            else{
                recentText === 'error in data'
            }
            var reportContainer = document.getElementById("report");
            var div = document.createElement("div");
            div.innerHTML = 'In the last five years this restaurant has failed ' + failed + ' out of  ' + total + ' Inspections. It ' + recentText + ' the most recent inspection on ' + recent.substr(0,10) + '.' + '<br>';
            reportContainer.appendChild(div)
            }