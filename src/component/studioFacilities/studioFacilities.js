import React from "react";
import "./studioFacilities.css"


function StudioFacilities({ item }) {
    const activity_hours={"sunday":"closed", "monday":"closed", "tuesday":"closed", "wednesday":"closed", "thursday":"closed", "friday":"closed", "saturday":"closed"};
    if(item.filters.hours){
        for (const [day, hours] of Object.entries(item.filters.hours)) {
            activity_hours[day] = hours[0] + ":00 - " + hours[1] + ":00";
        } 
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (
        <div>
            <div id="activity-hours-container" className="white-container">
                <div className="activity-hours-title"> Activity Hours:</div>
                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>sunday: <span className="thin-text"> {activity_hours["sunday"]}</span> </th>
                                <th>monday: <span className="thin-text"> {activity_hours["monday"]}</span></th>
                                <th>tuesday: <span className="thin-text"> {activity_hours["tuesday"]}</span></th>
                            </tr>
                            <tr>
                                <th>wednesday: <span className="thin-text"> {activity_hours["wednesday"]}</span></th>
                                <th>thursday: <span className="thin-text"> {activity_hours["thursday"]}</span></th>
                                <th>friday: <span className="thin-text"> {activity_hours["friday"]}</span></th>
                            </tr>
                            <tr>
                                <th>saturday: <span className="thin-text"> {activity_hours["saturday"]}</span></th>
                            </tr>
                            <tr>
                            </tr> 
                        </tbody>
                    </table>
                </div>            
            </div>
            <div id="workoutType-container" className="white-container">
            <div className="inline-title"> Workout Types:</div>
            {item.filters.workoutType && item.filters.workoutType.map((type) => (
                <React.Fragment key={type}>
                    <i id="check-icon" className="fa-regular fa-circle-check"></i>
                    <span className="thin-text-list">{capitalizeFirstLetter(type)}</span>
                </React.Fragment>
            ))}
            </div>
            <div id="levels-container" className="white-container">
            <div className="inline-title"> Levels:</div>
            {item.filters.level && item.filters.level.map((level) => (
                <React.Fragment key={level}>
                    <i id="check-icon" className="fa-regular fa-circle-check"></i>
                    <span className="thin-text-list">{capitalizeFirstLetter(level)}</span>
                </React.Fragment>
            ))}
           
            </div>
        </div>
      );
  }
  
  export default StudioFacilities;