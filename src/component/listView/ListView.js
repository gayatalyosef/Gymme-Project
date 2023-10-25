import React from "react";
import Reviews from "../reviews/reviews"
import StudioFacilities from "../studioFacilities/studioFacilities";
import photos from "../../utils/studioPhotos";

function ListView({filteredStudiosList, displayedDetails, setDisplayedDetails}) {
    //rate states
    const [rateSelectDisplay, toggleRateDisplay] = React.useState("none");
    const [rateConfirmIcon, setRateConfirmIcon] = React.useState("none");
    const [ratedStudios, addRatedStudio] = React.useState([]);
    //this state stores the most recently clicked studio in the listView, allowing for tracking the click count for the report. 
    const [clickedLast, setClickedLast] = React.useState("");

    /*
        Handler to present the details of the selected studio on the screen,
        allowing for the display of relevant information and content associated with the chosen studio.
    */
    function showStudioDetails(item) {
        document.getElementById(displayedDetails.name).style.backgroundColor = "";
        document.getElementById(displayedDetails.name).style.color = "";
        document.getElementById(displayedDetails.name).style.borderBottom = "";
    
        document.getElementById(item.name).style.backgroundColor = "#dbdfdf56";
        document.getElementById(item.name).style.color = "#4daec9";
        document.getElementById(item.name).style.borderBottom = "1px solid #7bcee556";
    
        setDisplayedDetails(item);
        if(item.name !== clickedLast){
          //incremant click counter 
          const data = {
               "name" : item.name
          };
          fetch('/api/inc_number_of_clicks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            })
            .then(response => response.json())
        }
        setClickedLast(item.name);
        if(ratedStudios.includes(item.name)){ 
          setRateConfirmIcon("inline-block");
        } else{
          setRateConfirmIcon("none");
        }
    }
    
    //This function controls the opening or closing of the rate selection option
    function toggleRateStudioDisplay(){
        if(rateSelectDisplay === "none"){
            toggleRateDisplay("inline-block");
        } else{
            toggleRateDisplay("none");
        }
    }
    
    //This function handles rate selection event
    function rateStudio(score){
        setRateConfirmIcon("inline-block");
        ratedStudios.push(displayedDetails.name);
        addRatedStudio(ratedStudios);
        //update the server with the score
        const data = {
                "name" : displayedDetails.name, 
                "rating" : score
        };
        fetch('/api/add_new_rating', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    }

  

    return (
        <div className="listViewContainer">
        <div className="gymsList">
          <div id="viewList_title"> Fitness clubs near you: </div>
          {filteredStudiosList.map((s) => (
            <button className="gymsListItem" onClick={() => showStudioDetails(s)} id={s.name} key={s.name}> {s.name} </button>
          ))} 
        </div>
        <div className="gymDetails">
          <div className="detailsContainer">
            <div className="itemDetails">
              <span className="boldText_title">
                {displayedDetails.name}
              </span>
              <br></br>
              <span className="boldText"> Website: </span>
              {displayedDetails.url} <br></br>
              <span className="boldText"> Address: </span>
              {displayedDetails.addressString.split(',')[0].trim()} <br></br>
              <span className="boldText"> Contact info: </span>
              {displayedDetails.contactInfo} <br></br>
              <span className="boldText"> Price range: </span>
              {displayedDetails.priceString} <i className="fa-solid fa-shekel-sign fa-2xs"></i> <br></br>
              <span className="boldText"> Rating: </span>
              {displayedDetails.rating} <i className="fa-solid fa-dumbbell fa-xs" id="rateDumbell"></i>

              <div className="rateMe_container"> 
                <button className="rateMe_btn" onClick={toggleRateStudioDisplay}> rate me 
                  <span style={{display: rateSelectDisplay}}>
                    <span id="rate_select" onClick={() => rateStudio(1)}> 1 </span>
                    <span id="rate_select" onClick={() => rateStudio(2)}> 2 </span>
                    <span id="rate_select" onClick={() => rateStudio(3)}> 3 </span>
                    <span id="rate_select" onClick={() => rateStudio(4)}> 4 </span>
                    <span id="rate_select" onClick={() => rateStudio(5)}> 5 </span>
                  </span>
                </button>
                <i className="fa-regular fa-circle-check fa-lg" id="rateMe_confirm" style={{ display: rateConfirmIcon }}></i>
              </div>
            </div>
            <img
              id="item_img"
              src={photos[displayedDetails.photoIndex]}
              alt =""
            ></img>
          </div>
          <StudioFacilities item={displayedDetails} />
          <Reviews item={displayedDetails} />
        </div>
      </div>
            
    );
}

export default ListView;