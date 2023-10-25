# Gymme
Welcome to Gymme, an Ecommerce website designed to help users find relevant fitness clubs based on criteria such as price, location, fitness type, and operating days and hours.

Gymme aims to simplify the process of finding suitable fitness clubs for users. With Gymme, users can easily search for fitness clubs that match their preferences.
By providing a user-friendly interface and a comprehensive database of fitnessclubs, Gymme assists users in making informed decisions about their fitness club memberships.

***

## Video (short version in low quality due to size limitation)

https://github.com/tomgesser1/gymme/assets/92454507/767ada00-0455-4cf1-83aa-11b43746300a


## how to run the project
run the command: npm run dev

      If you are running the project from the University, please make sure to connect with a hotspot.
      There is an issue with connecting to the database when using the University's free WIFI.

Ensure that you have the following installed:
* **NodeJs** version 16.17.0 or higher 
* **mongodb** version 5.5.0 or higher
* **express** version 4.18.2 or higher
* **concurrently** version 8.0.1 or higher
* **react** version 18.2.0 or higher
* **react-router-dom** version 6.11.2 or higher
* **axios** veraion 1.4.0 or higher
* **canvas** veraion 2.11.2 or higher
* **pdfkit** veraion 0.13.0 or higher
* **chart.js** veraion 4.3.0 or higher

## Code Structure
### index.js
This file contains the code for the main page of the website. It manages the **filters**, **map view**, and **list view** of the chosen studios.
Here, users can interact with various filters to refine their search results and view the fitness clubs that meet their criteria  on a map or in a list view of studios.

Main Data Structures:

* **studioList**: A list of all the studios in the database. Since the data is fetched from the server, initializing studioList before the main component is loaded presented a technical hurdle. To overcome this, we implemented an asynchronous function outside the main component and a refresh function within the main component, ensuring successful initialization of the data.

* **activeFilters**: A dictionary that stores the filters selected by the user. This dictionary is sent to the server upon a new filter request, enabling the retrieval of relevant studio data based on the user's preferences.

* **filteredStudiosList**: This list contains the studios that match the user's selections and are presented on the screen. It is initiallized with the data from studioList. When a filter request is made by the user, this list is updated with the results received from the server, ensuring that the displayed studios align with the user's filtered criteria. 

**To prioritize studios associated with premium customers and present them at the top of the list**.
In the interest of fairness, we use a random sorting algorithm to determine the order of the premium studios within the list.
This approach ensures that each premium studio has an equal chance of being positioned prominently, providing a balanced and unbiased presentation to all users
(this is done by "arrange_studio_list" function).

### app.js
The app.js file includes the route settings for the website. 
We have two routes in the website: the main page (http://localhost:3000/), and personal area for business owners (http://localhost:3000/myBusiness).
This file ensures that users are directed to the appropriate page based on their actions and interactions within the website.

### server.js
The server.js file contains all the APIs used in Gymme. It serves as the backend server for the website, handling various requests and interacting with the MongoDB database. The APIs in this file facilitate user authentication, data retrieval, and other necessary operations to ensure the smooth functioning of the website.

Additionally, the server also provides an API for generating statistical reports for premium users. This API allows users to request both general reports and specific reports for a particular fitness studio. The server generates the reports in PDF format and sends them to the client upon request. These reports provide valuable insights and statistics derived from the Gymme platform, helping users make informed decisions about their fitness club memberships and track their performance.

Overall, the server.js file plays a vital role in managing the server-side functionality of Gymme, including user authentication, data retrieval, and the generation and delivery of statistical reports to premium users.



### component folder
* ## agePopup
      The AgePopup component is responsible for displaying an age popup on the main screen to collect and store the user's age.
      The popup is displayed only once to ensure a seamless user experience, as the information is stored in the local storage for convenient future use.
      By capturing the user's age, the AgePopup component contributes to gathering relevant data for generating insightful reports.
      
* ## BusinessLogin
      The BusinessLogin component handles the login and signup process for business owners.
      Once logged in, business owners are redirected to their personalized area within Gymme.
      To improve the user experience, we store the login details in the local storage, eliminating the need for repeated logins while navigating the website.
      Additionally, we positioned the logout button in a highly visible spot that allows users to easily log out when they have finished using the platform.
      
* ## listView
      The ListView component is responsible for displaying the studios in a list view and providing additional information about each studio.
      It takes the filteredStudios list as input and displays it in a structured format.
      Additionally, when a user clicks on a specific item in the list, the ListView component renders the details section,
      which includes the Reviews component and the StudioFacilities component.
      This allows users to view and interact with the reviews and facilities information of the selected studio from the list.
      
* ## Filters
      The Filters component is responsible for managing the filters section.
      It allows users to apply filters based on various criteria such as price, acticity hours, and workout types.
      The component updates activeFilters dictionary and filteredStudios list based on the selected filters
      and communicates with other components to display the filtered results.

* ## mapComponent
      The MapComponent component responsible for integrating GoogleMaps into the main page.
      Its primary purpose is to display a map interface to the users, allowing them to view the locations of various fitness studios.
      Upon receiving a list of studios, the MapComponent places markers on the map, indicating the positions of these studios.
      
      Furthermore, the MapComponent records and stores information about the specific area or region of the map that the user is viewing within Tel-Aviv.
      This data is collected for the report to provide insights into user preferences and interaction patterns.
      We divided Tel-Aviv into four main areas: north, old-north, center, and south (see image below under "Appendix").
         
* ## multiRangeSlider
      The multiRangeSlider component is used for the hours and price range in the filters section and myBusiness.
      
* ## myBusiness
      The MyBusiness component represents the personal area for business owners.
      Once business owners successfully log in, they are directed to this page.
      MyBusiness provides business owners with relevant features and information to manage their fitness clubs.
      Premium business owners can access an informative monthly report that provides statistics and insights derived from the Gymme platform.
      MyBusiness page also includes an option for non-premium business owners to upgrade to a premium membership.

* ## premiumPopup
      The PremiumPopup component handles the display of a popup message when a non-premium user clicks on the "Go Premium" button on the MyBusiness page.
      This component is responsible for upgrading the user to a premium account if they are not already a premium user.
  
* ## alreadyPremiumPopup
      The alreadyPremiumPopup component handles the display of a popup message when a premium user clicks on the "Go Premium" button on the MyBusiness page.
      This component alerts the user that he is already a premium subscriber.

* ## reviews
      The Reviews component is responsible for managing the reviews section within the list view.
      It handles the display and organization of user reviews for each studio in a user-friendly manner.
      By utilizing the Reviews component, users can access valuable feedback and insights from other individuals
      who have visited and reviewed the fitness studios and assist them to make informed decisions based on the shared reviews.
      
* ## studioFacilities
      The StudioFacilities component is a straightforward component that receives a studio item and presents essential
      information about the studio's activity hours, levels, and workout types.
      This component contributes to a clear and concise presentation of the studio's facilities,
      aiding users in their decision-making process when selecting a suitable fitness option.

### utils folder
The utils folder contains shared code that is utilized by multiple components.

This shared code includes 'studio' class and "arrange_studio_list" function that are utilized by both  index.js and the Filters component.

Additionally, the utils folder contains the "studioPhotos" module, which serves the purpose of initializing the photos list. 
The code within the "studioPhotos" module is shared and utilized by both the ListView and MyBusiness components.

Placing this shared code in the utils folder prevents unnecessary duplication throughout the project. 


### assets folder
The "assets" folder serves as a repository for the artistic elements of the website,
including background images, videos, icons, and studio images.


## Freemuim Business Model
The Gymme website operates on a freemium business model, offering both free and premium features.
Regular users can access and utilize the website's functionalities without any cost.
However, fitness club owners have the option to upgrade to a premium membership by paying a fee.

Premium clients enjoy several exclusive benefits, including:

1. **Priority Display**: Premium clients' businesses receive priority placement and are showcased at the top of the list,
ensuring increased visibility and exposure to potential customers.

2. **General Reports**: Premium clients gain access to general reports that provide valuable insights into popular search trends and user preferences.
These reports offer a broader perspective on the fitness industry and assist in making informed business decisions.

3. **Studio Reports**: Premium clients receive personalized reports specifically tailored to their studios.
These reports provide detailed information on the amount of attention their studios receive on the website, helping them gauge user interest and track their online presence.

**By offering these premium features, Gymme incentivizes fitness club owners to upgrade their membership, providing them with valuable tools and insights to enhance their business's visibility, understand market trends, and optimize their offerings to attract more customers.**


### About the reports:
We gather the following information regarding website usage:

1. **User Age**: When a user makes their first filter request, we collect their age and store it in the local storage. This age information is then attached to every subsequent filter request made by the user. This allows us to present the age distribution of users on the website.
Additionally, we use this information to showcase the age distribution of users who were exposed to each studio. In other words, we can provide business owners with insights into the age demographics of users who encountered their studio in their filtered search results. This helps businesses understand the age preferences and target audience for their services.

2. **Popular Searches**: Whenever a user performs an "apply all" action to applies filters, we record the search criteria to calculate popular trends.
This includes popular days and activity hours, frequently searched workout types, preferred price ranges, and preferred skill levels (beginner, intermediate, advanced).
Additionally, we track the number of times a specific studio appears in search results. 
By quantifying the number of times a studio appears in search results, we provide business owners with insights into their studio's prominence and popularity among users.

3. **Studio Clicks**: We track the number of clicks for each studio, whether it's within the ListView or on the map (clicking on the studio icon).
 This information is valuable for showcasing the popularity of individual studios to business owners, giving them an understanding of the level of visibility and engagement they have among users.

4. **Map Areas**: When users interact with the map by dragging or exploring different areas, we store the specific regions within Tel Aviv that were observed.
This allows us to identify popular areas of interest. This information can be of significant help to business owners, as it provides insights into areas that are more interesting for potential business opportunities. By understanding the popularity and user engagement in different map areas, business owners can make informed decisions about opening new businesses in specific regions and more.

It's important to note that we do not collect any personal information about users, the gathered information is anonymous and not linked to any specific individual. 


## MongoDB Database

We have created three collections in the MongoDB database to store relevant data:

1. **gymme_studios**: This collection stores information about the studios. It includes fields such as the studio's name, the associated username, coordinates for map pinning, additional details for filters (e.g., activity hours, workout types), reviews, studio-specific report information (e.g. counters for the number of times the studio was clicked) and a field to indicate if the studio is associated with a premium account.

2. **gymme_business_owners**: This collection stores user information for business owners. It includes fields for the username, password, and a flag to indicate whether the user has a premium account.

3. **gymme_general_report**: This collection stores information for the general report. It includes counters for filtered days, filtered hours, visited regions, and other relevant data. For example, each time a filter request is made, the corresponding counters for the included days, hours and other fields are incremented to track their usage.

By organizing the data into these collections, we can efficiently manage and retrieve information for studios, business owners, and generate insightful reports based on user activity.

## Appendix
**Map areas illustration:**

![map-areas](https://github.com/tomgesser1/gymme/assets/92454507/81cb8ef2-bf52-418b-8868-dd39147efbb6)

**Reports for example:**

* [General_Report_For_Joe.pdf](https://github.com/tomgesser1/gymme/files/11860625/General_Report_For_Joe.pdf)
* [Studios_Report_For_Joe.pdf](https://github.com/tomgesser1/gymme/files/11860630/Studios_Report_For_Joe.pdf)



