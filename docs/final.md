# Final Report - Eat Safe Foods

**GGTea Members:**
- Gaurav Dali
- Gabriel Estrella
- Akpokli Foli Sosro
- Edward Trabucco
- Thinh Vo

[Eat Safe Foods Heroku](https://eatsafefoods.herokuapp.com/) 

## Information Problem
We are attempting to provide our users with easily accessible restaurant safety reports for establishments in Prince George’s County. This data is available directly from the PG Health Department’s API, but only provides users with raw data. Our application puts this data into a more easily digestible report. We also wanted our application to allow for user reporting of any restaurant they have been to before being confirmed Covid-19 positive. This user reported data is then added to our health report, giving a better idea of what restaurants are safe in the current environment.

## Data Wrangling/Cleaning: 
Accessing the API was comparatively simple, but we ran into several technical issues in making the data usable. Restaurant names often had numerical codes and other seemingly random bits of text attached to their names. We solved this by creating filters that removed these confusing items.
Another major issue was inconsistencies in the data. Although most inspections were marked as resulting in a pass or fail, some were marked as a series of dashes, “-----“. We reached out to the PG County Health Department, and despite speaking to no less than four different representatives we were unable to get an answer on what this meant. In the end, we opted to filter out any inspections with this result from our report page.

A brief guide to how we manipulated and sorted through the data in the report and form pages:
- Create a new array to hold specific columns that we want to show the users 
    - For the report page, we only need the restaurant's name, address, city, zip code, inspection_date, and inspection_results.
    - For the form page, in the “GET” section, we only need the restaurant's name, address, city, zip code, date visited.
- Remove “------” for inspection_results 
- Remove the numbers that come after restaurants’ names for some of the restaurants
- Sort the inspection_date 
- Remove duplicate restaurant’s name -> Only show unique restaurants by creating a new array.

## Stakeholders
Our major stakeholders and our target browsers are those who utilize PG County food establishments, especially those who are concerned with contracting Covid-19. Additional stakeholders are the PG County Health Department, food establishment owners, and establishment workers.

## Data
We chose to work with data from an API created under PG’s Food Protection/Policy Program. This data provides information on every health inspection on food establishments for nearly 20 years. We also wanted to allow users to report data themselves to add substantial self-collected data to our report pages. We chose to create a system where users could report if they had been to a given establishment within two weeks of testing positive for Covid-19. This gave us our own data to add to the report pages, and if our application was to take off could provide valuable information to PG County health officials to combat the spread of this disease.

## Strategies and Solutions
Our solution was to create a clean, simple, straightforward searching system along with a brief and clear overview of a given restaurant. Selecting a restaurant pulls that restaurant’s data directly from the PG API, so data will always be up to date. Even the search function when looking for a restaurant utilizes the API, so as new restaurants open they will appear in a search. We were able to link user reported Covid-19 exposures by address, ensuring that the proper restaurant will be reported.

## Technical System Decision Rationale
We decided to use the PG County health inspector API for both searching and reporting. We had considered using a secondary database to link restaurants to their respective data points to overcome issues with reporting Covid-19 cases because there is no data related to Covid-19 in the PG County health inspector API. We use Mongoose Database to save all the data that the users report in the form page. We were able to host this application on Heroku.

## Challenges
As noted in the “Data Wrangling/Cleaning” section of this report, we ran into several issues with making the data from the API usable and presentable. We were able to overcome these issues without negative impact on our final design.
There were other areas where we did have to modify our original site design. Originally, we had planned on including a Covid-19 tracking map in Eat Safe Foods. This turned out to be a real nightmare, and we struggled to find a good API for PG County data by area and could not find a good existing map to embed. We ultimately scrapped this idea, opting to focus on other areas as we realized we would meet all requirements for this project without the map.

## Looking Forward
There are still several steps which can be taken to make this site more effective. One issue we were unable to overcome was partially unreported data in the PG County API when it came to inspection results. Although we filtered such results out, future programmers may be able to find a better way to address this problem than simply removing the information. Another issue with this database was that PG County does not remove closed restaurants from its database. This means that some of our results are for closed restaurants and thus no longer important to our users. Perhaps future programmers could find a way to combine this application with data from Google to determine which restaurants are permanently closed.

Eat Safe Foods still believes that a Covid-19 tracking map would be beneficial for our users, and we would suggest this to future developers as a solid step in improving the application. Implementing a map using React JS would have been nice but we were not familiar enough with React JS to program this feature.
We would also love to see CSS responsiveness added to our website. We tried to use bootstrap to make our site become more mobile-friendly, but it turned out that Heroku does not work with bootstrap. Outside of this, there were no other data sources or javascript libraries that we wanted to integrate. 