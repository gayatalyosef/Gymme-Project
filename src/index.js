import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginPopup from "./component/BusinessLogin/loginPopup";
import AgePopup from "./component/agePopup/agePopup";
import Filters from "./component/filters/filters";
import ListView from "./component/listView/ListView";
import MapComponent from "./component/mapComponent/mapComponent";
import reportWebVitals from "./reportWebVitals";
import {useLoadScript} from "@react-google-maps/api";
import bgVideo from "./assets/bgVideo.mp4"
import { studio } from './utils/studioClass';
import { arrange_studio_list } from './utils/arrangeStudioList';
import {useNavigate} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));

/*
  This function retrieves all the studios from the DB using an api,
  to initialize studioList variable with all studios from the database
*/
const fetchStudios =async () => {
  const response = await fetch('/api/get_all_studios');
  const data = await response.json();
  return arrange_studio_list(data); 
}

/**  Const Variables  **/
const maxPrice = 500;

/*
  This component presents the main page content under normal circumstances, while seamlessly transitioning 
  to a loading screen in the event of any encountered issues related to the Google Maps API integration.
*/
export default function Home() {
    const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });
  if (!isLoaded) return <div> Loading... </div>;

  return (
    <div>
      <Main/>
    </div>
  );
}

/*
  This component facilitates the rendering of essential elements within the user interface,
  including the map element, list view screen, and filters section.
*/
function Main() { 
  //This state value is set to false when the initialization of the studioList is not yet complete
  const [isStudioListInit, setIsIinit] = React.useState(false); 
  const navigate = useNavigate();

  if(!isStudioListInit){
    var studioList = [new studio("", "", "", 0.0, 0.0, "", {}, [])];
    const studioPromise = fetchStudios();  
    studioPromise.then((updatedList) => {
      studioList = updatedList;
      refreshStudios(studioList)
    }); 
  }

  /*** React States ***/
  //This state allows for the toggling of the view between a map view and a list view
  const [viewMode, toggleView] = React.useState([
    "block",
    "none",
    "white",
    "#f5f5f5dd"
  ]);
  /* Filters States */
  const defaultActiveFilters = {
    days: [],
    level: [],
    workoutType: [],
    rating: -1,
    price: [0,maxPrice],
    hours: [6, 23],
    age: ""
  };
  //activeFilters represents a dictionary containing the filters that have been selected by the user
  const [activeFilters, setActiveFilters] = React.useState(defaultActiveFilters);
  //filteredStudios is a list of the studios that matches the user's selection
  const [filteredStudiosList, updateFilteredStudios] = React.useState(studioList);

  /* List View States */  
  //the clicked studio in the list 
  const [displayedDetails, setDisplayedDetails] = React.useState(filteredStudiosList[0]);

  /* Login States */  
  // show login popup
  const [showPopup, setShowPopup] = React.useState(false);
  // user entered valid age
  const [ageVerified, setAgeVerified] = React.useState(false);
  const [applyAllClicked, setApplyAllClicked] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('username') !== null && localStorage.getItem('username') !== '');

  //This function is responsible for updating studioList after it successfully fetched from the database
  function refreshStudios(studioList){
    updateFilteredStudios(studioList);
    setDisplayedDetails(studioList[0]);
    setIsIinit(true);
  }

  const handleLoginClick = () => {
    let username = localStorage.getItem('username')
    if (username){
      navigate("/myBusiness", { state: { username } });
      setIsLoggedIn(true);
    }
    else{
      setShowPopup(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const closeAgePopup = () => {
    localStorage.setItem('isAgedVerified', true);
    setAgeVerified(true)
  }

  const isAgedVerified = () => {
     let x = (localStorage.getItem('isAgedVerified') || ageVerified) ;
     return x;
  }

  //Handler to toggle between the map view and list view
  function handeToggleView(switchId) {
    handleClosePopup();
    var newViewMode = [];
    Object.assign(newViewMode, viewMode);
    if (switchId === 0) {
      //toggling to List view
      newViewMode[0] = "none";
      newViewMode[1] = "block";
      newViewMode[2] = "#f5f5f5dd";
      newViewMode[3] = "white";
      if(displayedDetails.name !== "" ){
        document.getElementById(displayedDetails.name).style.backgroundColor = "#dbdfdf56";
        document.getElementById(displayedDetails.name).style.color = "#4daec9";
        document.getElementById(displayedDetails.name).style.borderBottom = "1px solid #7bcee556";
      }
    } else {
      //toggling to map View
      newViewMode[0] = "block";
      newViewMode[1] = "none";
      newViewMode[2] = "white";
      newViewMode[3] = "#f5f5f5dd";
    }
    toggleView(newViewMode); 
  }

  //This function facilitates the smooth scrolling transition from the landing page to the main page
  function scrollDown(){
    var elem = document.getElementById('parent');
    elem.scrollIntoView();
  }


  return (
    <div>
      <div className="landing-page">
        <video src={bgVideo} autoPlay loop muted />
        <div className="content">
        <div className="button-container">
          <button className="business_login" onClick={handleLoginClick}>
            {isLoggedIn ? "My Business" : "Business Owner Login"}
          </button>
          {isLoggedIn && 
            <button className="sign_out" onClick={handleSignOut}>
              Sign Out
            </button>
          }
        </div>
          <div className="large-title"> Gymme </div>
          <button className="find-your-fitnessclub-btn" onClick={scrollDown}> Find Your Fitness Club <i className="fa-solid fa-magnifying-glass" id="magnifying-glass"></i> </button>
        </div>
      </div>

      <div className="top_menu">
        <button id="view-as-list-btn" onClick={() => handeToggleView(0)} style={{backgroundColor: viewMode[2] }}>
          View as a list
        </button>
        <button id="view-in-map-btn" onClick={() => handeToggleView(1)} style={{backgroundColor: viewMode[3]}}>
          View in map
        </button>
      </div>

      {!isAgedVerified() && applyAllClicked && <AgePopup onClose={closeAgePopup}/>}
      {showPopup && <LoginPopup onClose={handleClosePopup}/>}

      <div className="parent" id="parent">
        <Filters updateFilteredStudios={updateFilteredStudios} setApplyAllClicked = {setApplyAllClicked} displayedDetails={displayedDetails} setDisplayedDetails={setDisplayedDetails} activeFilters={activeFilters} setActiveFilters={setActiveFilters}/>

        <div className="map_div" style={{ display: viewMode[0] }}>
          <MapComponent filteredStudiosList={filteredStudiosList}/>
        </div>

        <div className="listViewdiv" style={{ display: viewMode[1] }}>
          <ListView filteredStudiosList={filteredStudiosList} displayedDetails={displayedDetails} setDisplayedDetails={setDisplayedDetails}/>
        </div>
      </div>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
