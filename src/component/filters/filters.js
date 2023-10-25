import React from "react";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import { arrange_studio_list } from '../../utils/arrangeStudioList';

      
const begginers = "Begginers";
const intermediate = "Intermediate";
const advanced = "Advanced";
const sunday = "sunday";
const monday = "monday";
const tuesday = "tuesday";
const wednesday = "wednesday";
const thursday = "thursday";
const friday = "friday";
const saturday = "saturday";
const gym = "Gym";
const pilates = "Pilates";
const yoga = "Yoga";
const hit = "Hit";
const kickbox = "Kickbox";

function Filters({setApplyAllClicked, updateFilteredStudios, displayedDetails, setDisplayedDetails, activeFilters, setActiveFilters}) {
    const [errMsg, setErrorMsg] = React.useState(["none", ""]);
    //level states
    const [begginnersCheck, setBegginnersCheck] = React.useState(false);
    const [intermediateCheck, setIntermediateCheck] = React.useState(false);
    const [advancedCheck, setAdvancedCheck] = React.useState(false);
    //day states
    const [sundayCheck, setSundayCheck] = React.useState(false);
    const [mondayCheck, setMondayCheck] = React.useState(false);
    const [tuesdayCheck, setTuesdayCheck] = React.useState(false);
    const [wednesdayCheck, setWednesdayCheck] = React.useState(false);
    const [thursdayCheck, setThursdayCheck] = React.useState(false);
    const [fridayCheck, setFridayCheck] = React.useState(false);
    const [saturdayCheck, setSaturdayCheck] = React.useState(false);
    //workoutType states
    const [gymCheck, setGymCheck] = React.useState(false);
    const [PilatesCheck, setPilatesCheck] = React.useState(false);
    const [YogaCheck, setYogaCheck] = React.useState(false);
    const [HITCheck, setHitCheck] = React.useState(false);
    const [KickboxCheck, setKickboxCheck] = React.useState(false);
    //dumbbels color
    const [dumbbellsColor, setDumbbellsColor] = React.useState([
        "#1e3050",
        "#1e3050",
        "#1e3050",
        "#1e3050",
        "#1e3050",
    ]);

    //Handler for all check-boxs
    function checkHandler(isChecked, setFunction, id, filter_type) {
        if (isChecked) {
        isChecked = false;
        var index = activeFilters[filter_type].indexOf(id);
        activeFilters[filter_type].splice(index, 1);
        } else {
        isChecked = true;
        activeFilters[filter_type].push(id);
        }
        setFunction(isChecked);
    }

    //Handler for rating filter
    function ratingFilterHandler(numOfDumbbels) {
        activeFilters["rating"] = numOfDumbbels;
        setActiveFilters(activeFilters);
        var dumbbellsColor = [];
        for (var i = 0; i < numOfDumbbels; i++) {
        dumbbellsColor[i] = "#7acfe6";
        }
        for (i = numOfDumbbels; i < 5; i++) {
        dumbbellsColor[i] = "#1e3050";
        }
        setDumbbellsColor(dumbbellsColor);
    }

    //helper function that takes a dictionary object as input and converts the values of any list properties to lowercase
    function lowerCaseDict(dict){
      const result = {};

      for (const key in dict) {
        if (Array.isArray(dict[key])) {
          result[key] = dict[key].map((value) => {
            if (typeof value === 'string') {
              return value.toLowerCase();
            }
            return value;
          });
        } else {
          result[key] = dict[key];
        }
      }
      return result;
    }


    //Handler to apply the selected filters
    function applyFilters() {
        setApplyAllClicked(true);
        activeFilters["age"] = localStorage.getItem('age');
        setActiveFilters(activeFilters);
        //sends activeFilters to the server and updates filteredStudiosList with the result
        fetch(`/api/filters?filter=${JSON.stringify(lowerCaseDict(activeFilters))}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            var filteredList = arrange_studio_list(data);
            if (filteredList.length !== 0) {
              updateFilteredStudios(filteredList);
              setDisplayedDetails(filteredList[0]);
              //update style of list
              document.getElementById(displayedDetails.name).style.backgroundColor = "";
              document.getElementById(displayedDetails.name).style.color = "";
              document.getElementById(displayedDetails.name).style.borderBottom = "";
              document.getElementById(filteredList[0].name).style.backgroundColor = "#dbdfdf56";
              document.getElementById(filteredList[0].name).style.color = "#4daec9";
              document.getElementById(filteredList[0].name).style.borderBottom = "1px solid #7bcee556";
            } else {
              setErrorMsg(["block", "no matches found"]);
              setTimeout(() => {
                  setErrorMsg(["none", ""]);
              }, 1300);
            }
        })
        .catch((error) => console.log(error));
    }


    return (
        <div className="filters_div">
          <div className="apllyAll-andTitle-container">
            <p className="filters_title"> filters: </p>
            <button className="apply_all_btn" onClick={applyFilters}> apply all </button>
          </div>
          <div id="error_under_applyall" style={{ display: errMsg[0] }}>
            {errMsg[1]}
          </div>
          <p className="filters_medium_title"> days: </p>
          <div className="row">
            <div className="column1">
              <input
                type="checkbox"
                id="sunday"
                onChange={() =>
                  checkHandler(sundayCheck, setSundayCheck, sunday, "days")
                }
              ></input>
              <label htmlFor="sunday"> sunday </label>
            </div>
            <div className="column2">
              <input
                type="checkbox"
                id="monday"
                onChange={() =>
                  checkHandler(mondayCheck, setMondayCheck, monday, "days")
                }
              ></input>
              <label htmlFor="monday"> monday </label>
            </div>
          </div>
          <div className="row">
            <div className="column1">
              <input
                type="checkbox"
                id="tuesday"
                onChange={() =>
                  checkHandler(tuesdayCheck, setTuesdayCheck, tuesday, "days")
                }
              ></input>
              <label htmlFor="tuesday"> tuesday </label>
            </div>
            <div className="column2">
              <input
                type="checkbox"
                id="wednesday"
                onChange={() =>
                  checkHandler(
                    wednesdayCheck,
                    setWednesdayCheck,
                    wednesday,
                    "days"
                  )
                }
              ></input>
              <label htmlFor="wednesday"> wednesday </label>
            </div>
          </div>
          <div className="row">
            <div className="column1">
              <input
                type="checkbox"
                id="thursday"
                onChange={() =>
                  checkHandler(
                    thursdayCheck,
                    setThursdayCheck,
                    thursday,
                    "days"
                  )
                }
              ></input>
              <label htmlFor="thursday"> thursday </label>
            </div>
            <div className="column2">
              <input
                type="checkbox"
                id="friday"
                onChange={() =>
                  checkHandler(fridayCheck, setFridayCheck, friday, "days")
                }
              ></input>
              <label htmlFor="friday"> friday </label>
            </div>
          </div>
          <div className="row">
            <div className="column1">
              <input
                type="checkbox"
                id="saturday"
                onChange={() =>
                  checkHandler(
                    saturdayCheck,
                    setSaturdayCheck,
                    saturday,
                    "days"
                  )
                }
              ></input>
              <label htmlFor="saturday"> saturday </label>
            </div>
          </div>
          <div className="separator_line"> </div>
          <p className="filters_medium_title"> hours range: </p>
          <MultiRangeSlider
            min={6}
            max={23}
            onChange={({ min, max }) => (activeFilters["hours"] = [min, max])}
            isHours = {true}
          />
          <div className="separator_line"> </div>
          <div>
            <p className="filters_medium_title">Price range:</p>
            <MultiRangeSlider
            min={0}
            max={500}
            onChange={({ min, max }) => (activeFilters["price"] = [min, max])}
            isHours={false}
          />
          </div>
          <div className="separator_line"> </div>
          <p className="filters_medium_title"> workout type: </p>
          <div className="row">
            <div className="column3">
              <input
                type="checkbox"
                id="gym-box"
                onChange={() =>
                  checkHandler(gymCheck, setGymCheck, gym, "workoutType")
                }
              ></input>
              <label htmlFor="gym-box"> Gym </label>
            </div>
            <div className="column4">
              <input
                type="checkbox"
                id="Pilates"
                onChange={() =>
                  checkHandler(
                    PilatesCheck,
                    setPilatesCheck,
                    pilates,
                    "workoutType"
                  )
                }
              ></input>
              <label htmlFor="Pilates"> Pilates </label>
            </div>
            <div className="column4">
              <input
                type="checkbox"
                id="Yoga"
                onChange={() =>
                  checkHandler(YogaCheck, setYogaCheck, yoga, "workoutType")
                }
              ></input>
              <label htmlFor="Yoga"> Yoga </label>
            </div>
          </div>
          <div className="row">
            <div className="column3">
              <input
                type="checkbox"
                id="Hit"
                onChange={() =>
                  checkHandler(HITCheck, setHitCheck, hit, "workoutType")
                }
              ></input>
              <label htmlFor="Hit"> Hit </label>
            </div>
            <div className="column4">
              <input
                type="checkbox"
                id="Kickbox"
                onChange={() =>
                  checkHandler(
                    KickboxCheck,
                    setKickboxCheck,
                    kickbox,
                    "workoutType"
                  )
                }
              ></input>
              <label htmlFor="Kickbox"> Kickbox </label>
            </div>
          </div>
          <div className="separator_line"> </div>
          <p className="filters_medium_title"> rating: </p>
          <i
            className="fa-solid fa-dumbbell fa-2xl"
            id="dumbbell"
            onClick={() => ratingFilterHandler(1)}
            style={{ color: dumbbellsColor[0] }}
          ></i>
          <i
            className="fa-solid fa-dumbbell fa-2xl"
            id="dumbbell"
            onClick={() => ratingFilterHandler(2)}
            style={{ color: dumbbellsColor[1] }}
          ></i>
          <i
            className="fa-solid fa-dumbbell fa-2xl"
            id="dumbbell"
            onClick={() => ratingFilterHandler(3)}
            style={{ color: dumbbellsColor[2] }}
          ></i>
          <i
            className="fa-solid fa-dumbbell fa-2xl"
            id="dumbbell"
            onClick={() => ratingFilterHandler(4)}
            style={{ color: dumbbellsColor[3] }}
          ></i>
          <i
            className="fa-solid fa-dumbbell fa-2xl"
            id="dumbbell"
            onClick={() => ratingFilterHandler(5)}
            style={{ color: dumbbellsColor[4] }}
          ></i>
          <div className="separator_line"> </div>
          <p className="filters_medium_title"> level: </p>
          <input
            type="checkbox"
            id="beginners"
            onChange={() =>
              checkHandler(
                begginnersCheck,
                setBegginnersCheck,
                begginers,
                "level"
              )
            }
          ></input>
          <label htmlFor="beginners"> Beginners </label> <br></br>
          <input
            type="checkbox"
            id="intermediate"
            onChange={() =>
              checkHandler(
                intermediateCheck,
                setIntermediateCheck,
                intermediate,
                "level"
              )
            }
          ></input>
          <label htmlFor="intermediate"> Intermediate </label> <br></br>
          <input
            type="checkbox"
            id="advanced"
            onChange={() =>
              checkHandler(advancedCheck, setAdvancedCheck, advanced, "level")
            }
          ></input>
          <label htmlFor="advanced"> Advanced </label>
          <div className="bottom_margin"></div>
        </div>
    );
}
  
export default Filters;