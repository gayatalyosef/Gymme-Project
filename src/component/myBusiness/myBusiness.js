import React, { useState, useEffect } from "react";
import "./myBusiness.css"
import { useLocation } from 'react-router-dom';
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import axios from 'axios';
import PremiumPopup from "../premiumPopup/premiumPopup";
import {useNavigate} from 'react-router-dom';
import photosURL from "../../utils/studioPhotos";
import AlreadyPremiumPopup from "../alreadyPremiumPopup/alreadyPremiumPopup";

//class for studio object
class studio {
  constructor(name, url, addressString, latCoordinate, lngCoordinate, contactInfo, day, level, workoutType, price, hours, rating, ratingList) {
    this.name = name;
    this.url = url;
    this.addressString = addressString;
    this.latCoordinate = latCoordinate;
    this.lngCoordinate = lngCoordinate;
    this.contactInfo = contactInfo;
    this.day = day;
    this.level = level;
    this.workoutType = workoutType; 
    this.price = price;
    this.hours = hours;
    this.rating = rating
    this.ratingList = ratingList;
  }
}

//main function 
function MyBusiness() {

  const navigate = useNavigate();

  //const for tabs
  const [activeTab, setActiveTab] = useState(0);

  //const for saving the data
  const [studiosData, setStudiosData] = useState([]);

  //consts for new studio
  const [newStudioName, setNewStudioName] = useState("");
  const [newStudioUrl, setNewStudioUrl] = useState('');
  const [newStudioAddress, setNewStudioAddress] = useState('');
  const [newStudioPrice, setNewStudioPrice] = useState([]);
  const [newStudioHours, setNewStudioHours] = useState([]);
  const [newContactInfo, setNewContactInfo] = useState('');
  const [newLatCoordinate, setNewLatCoordinate] = useState("");  
  const [newLngCoordinate, setNewLngCoordinate] = useState("");  
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedWorkOutType, setSelectedWorkOutType] = useState([]);
  const [isNewAddressValid, setIsAddressValid ] = useState(true);
  const photos = photosURL.map(photo =>
    {const variableName = photo.match(/\/([^/.]+)\./)?.[1];
      return variableName || '';
    });
  const [selectedPhoto, setSelectedPhoto] = useState([photos[0], 0]);


  //consts for edit studio
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editNameBeforeChange, setEditNameBeforeChange] = useState('')
  const [selectedDaysEdit, setSelectedDaysEdit] = useState([]);
  const [isEditDays, setIsEditDays] = useState(false);
  const [selectedWorkoutEdit, setSelectedWorkoutEdit] = useState([]);
  const [isEditWorkout, setIsEditWorkout] = useState(false);
  const [selectedLevelEdit, setSelectedLevelEdit] = useState([]);
  const [isEditLevel, setIsEditLevel] = useState(false);
  const [isEditAddressValid, setIsAddressEditValid ] = useState(true);
  const [selectedPhotoEdit, setSelectedPhotoEdit] = useState([]);


  //consts for hours
  const [sundayStartHour, setSundayStartHour] = useState(0);
  const [mondayStartHour, setMondayStartHour] = useState(0);
  const [tuesdayStartHour, setTuesdayStartHour] = useState(0);
  const [wednesdayStartHour, setWednesdayStartHour] = useState(0);
  const [thursdayStartHour, setThursdayStartHour] = useState(0);
  const [fridayStartHour, setFridayStartHour] = useState(0);
  const [saturdayStartHour, setSaturdayStartHour] = useState(0);
  const [sundayEndHour, setSundayEndHour] = useState(0);
  const [mondayEndHour, setMondayEndHour] = useState(0);
  const [tuesdayEndHour, setTuesdayEndHour] = useState(0);
  const [wednesdayEndHour, setWednesdayEndHour] = useState(0);
  const [thursdayEndHour, setThursdayEndHour] = useState(0);
  const [fridayEndHour, setFridayEndHour] = useState(0);
  const [saturdayEndHour, setSaturdayEndHour] = useState(0);
  const[issundayHoursChanged, setIssundayHoursChanged] = useState([false, false]);
  const[ismondayHoursChanged, setIsmondayHoursChanged] = useState([false, false]);
  const[istuesdayHoursChanged, setIstuesdayHoursChanged] = useState([false, false]);
  const[iswednesdayHoursChanged, setIswednesdayHoursChanged] = useState([false, false]);
  const[isthursdayHoursChanged, setIsthursdayHoursChanged] = useState([false, false]);
  const[isfridayHoursChanged, setIsfridayHoursChanged] = useState([false, false]);
  const[issaturdayHoursChanged, setIssaturdayHoursChanged] = useState([false, false]);
    
  const [isPremium, setIsPremium] = useState(0);
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const levels = ['begginers', 'intermediate', 'advanced'];
  const workOutTypes = ['gym', 'pilates', 'yoga', 'hit', 'kickbox'];
  const location = useLocation();
  const username = location.state && location.state.username;
  const [isStudiosInit, setIsStudiosInit] = useState(false);

  //helper function to assist in converting the values of the hours dictionary from strings to integers
  function convertDictValuesToIntegers(dict) {
    var convertedDict = {};
    for (var key in dict) {
      convertedDict[key] = dict[key].map(str => parseInt(str));
    }
    return convertedDict;
  }

  function convertListToIntegers(lst){
    var res = [];
    for(var i = 0; i < lst.length; i++){
      res.push(parseInt(lst[i]));
    }
    return lst;
  }


  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showAlreadyPremiumPopup, setShowAlreadyPremiumPopup] = useState(false);
  
  const handleBackToMapClick = () => {
    navigate("/");
  }
  const setUserAsPremium = () => {
    const data = {
      "username" : username
    };
    fetch('/api/premium_on', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
  }

  //Restricts access to the myBusiness page for unauthenticated users.
  if(username === null){
    navigate("/");
  }

  const handlePremiumClick = () => {
    if(isPremium == 1){
      setShowAlreadyPremiumPopup(true);
    } else {
      setUserAsPremium();
      setShowPremiumPopup(true);
    }
  };
  
  //check if business owner is premium
  const handleIsPremium = () => {
    if (isPremium == 1) return 
  // API- return 1 if the given user is premium, 0 else
  fetch(`/api/is_user_premium?username=${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {setIsPremium(data.premium)
    })
    if (isPremium != 0 && isPremium != 1){
      setIsPremium(0);
    }
}

//handle selected days for add new studio
const handleDayClick = (day) => {
  if (selectedDays.includes(day)) {
    setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
  } else {
    setSelectedDays([...selectedDays, day]);
  }
};

//handle selected days for edit days in studio
const handleDayClickEdit = (day) => {
  if (selectedDaysEdit.includes(day)) {
    setSelectedDaysEdit(selectedDaysEdit.filter((selectedDayEdit) => selectedDayEdit !== day));
  } else {
    setSelectedDaysEdit([...selectedDaysEdit, day]);
  }
  setIsEditDays(true);
};

//handle set level for new studio
const handleLevelClick = (Level) => {
  if (selectedLevels.includes(Level)) {
    setSelectedLevels(selectedLevels.filter((selectedLevel) => selectedLevel !== Level));
  } else {
    setSelectedLevels([...selectedLevels, Level]);
  }
};

//handle set workout type for new studio
const handleWorkOutTypeClick = (workOutType) => {
  if (selectedWorkOutType.includes(workOutType)) {
    setSelectedWorkOutType(selectedWorkOutType.filter((selectedWorkOutType) => selectedWorkOutType !== workOutType));
  } else {
    setSelectedWorkOutType([...selectedWorkOutType, workOutType]);
  }
};

//handle edit workout type for existing studio
const handleworkoutClickEdit = (workout) => {
  if (selectedWorkoutEdit.includes(workout)) {
    setSelectedWorkoutEdit(selectedWorkoutEdit.filter((selectedWorkoutEdit) => selectedWorkoutEdit !== workout));
  } else {
    setSelectedWorkoutEdit([...selectedWorkoutEdit, workout]);
  }
  setIsEditWorkout(true);
};

// handke edit levels for existing studio
const handleLevelClickEdit = (level) => {
  if (selectedLevelEdit.includes(level)) {
    setSelectedLevelEdit(selectedLevelEdit.filter((selectedLevelEdit) => selectedLevelEdit !== level));
  } else {
    setSelectedLevelEdit([...selectedLevelEdit, level]);
  }
  setIsEditLevel(true);
};

//handler to set a photo for new studio
const handlePhotoChange = (event) => {
  setSelectedPhoto([event.target.value, event.target.selectedIndex]);
};

const handlePhotoChangeEdit= (event) => {
  setSelectedPhotoEdit([event.target.value, event.target.selectedIndex]);
};


//clean hours consts after save
const cleanDaysHours = () => {
  setSundayEndHour(0);
  setSundayStartHour(0);
  setMondayStartHour(0);
  setMondayEndHour(0);
  setTuesdayStartHour(0);
  setTuesdayEndHour(0);
  setWednesdayStartHour(0);
  setWednesdayEndHour(0);
  setThursdayStartHour(0);
  setThursdayEndHour(0);
  setFridayStartHour(0);
  setFridayEndHour(0);
  setSaturdayStartHour(0);
  setSaturdayEndHour(0);
  setIssundayHoursChanged([false, false]);
  setIsmondayHoursChanged([false, false]);
  setIstuesdayHoursChanged([false, false]);
  setIswednesdayHoursChanged([false, false]);
  setIsthursdayHoursChanged([false, false]);
  setIsfridayHoursChanged([false, false]);
  setIssaturdayHoursChanged([false, false]);

} 

  //handle enter to edit mode
  const handleEditButtonClick = (index) => {
    setEditIndex(index);
    setEditMode(true);
    setEditNameBeforeChange(studiosData[index].name);
    setSelectedDaysEdit(studiosData[index].day);
    setSelectedLevelEdit(studiosData[index].level);
    setSelectedWorkoutEdit(studiosData[index].workoutType);
    var photoIndex = Array.isArray(studiosData[index].image) ? studiosData[index].image[1]:studiosData[index].image;
    setSelectedPhotoEdit([photos[photoIndex], photoIndex]);


    const startHourSetters = {
      sunday: setSundayStartHour,
      monday: setMondayStartHour,
      tuesday: setTuesdayStartHour,
      wednesday: setWednesdayStartHour,
      thursday: setThursdayStartHour,
      friday: setFridayStartHour,
      saturday: setSaturdayStartHour,
    };

    const endHourSetters = {
      sunday: setSundayEndHour,
      monday: setMondayEndHour,
      tuesday: setTuesdayEndHour,
      wednesday: setWednesdayEndHour,
      thursday: setThursdayEndHour,
      friday: setFridayEndHour,
      saturday: setSaturdayEndHour,
    };

    if (studiosData[index] && studiosData[index].hours) {
      Object.keys(studiosData[index].hours).forEach((day) => {
        const startHour = studiosData[index].hours[day][0];
        const endHour = studiosData[index].hours[day][1];
        startHourSetters[day](startHour);
        endHourSetters[day](endHour);
      });
    }
  };
  
  //save studio info after edit
  const handleSaveButtonClick = (index) => {
    //set new data for the studio
    if(isEditDays){
      studiosData[index].day = selectedDaysEdit;
    }
    if(isEditLevel){
      studiosData[index].level = selectedLevelEdit.map(level => level.toLowerCase());
    }
    if(isEditWorkout){
      studiosData[index].workoutType = selectedWorkoutEdit.map(workout => workout.toLowerCase());
    }

    const newHours = {};
    var isValidHour = true;
    var isValidName = true;
    var isValidAddress = true;
    studiosData[index].image = selectedPhotoEdit;

    days.forEach((day) => { 
      if(selectedDaysEdit.includes(day)){
        const isDayChanged = eval(`is${day}HoursChanged`);
        if(isDayChanged[0]){
          var startHour = eval(`${day.toLowerCase()}StartHour`)
        }
        else{
          var startHour = studiosData[index].hours[day] ? studiosData[index].hours[day][0] : "0";
        }
        if(isDayChanged[1]){
          var endHour = eval(`${day.toLowerCase()}EndHour`)
        }
        else{
          var endHour = studiosData[index].hours[day] ? studiosData[index].hours[day][1] : "0";
        }

        newHours[day] = [startHour, endHour];
        if(parseInt(startHour) === 0 || parseInt(endHour) === 0 || parseInt(endHour) < parseInt(startHour)){
          isValidHour = false;
          alert('Invalid hours');
        }

    }
    });

    if(studiosData[index].name === "" ){
      isValidName = false;
      alert('Invalid name');
    }

    if(studiosData[index].latCoordinate === "" || studiosData[index].lngCoordinate === ""){
      isValidAddress = false;
      alert("Invalid address, address need to be in this format: street and number, tel aviv");
    }
    
    if(isValidHour && isValidName && isValidAddress){
      studiosData[index].hours = newHours;
      //send the new data to server
      const data = {
      "name" : editNameBeforeChange,
      "update_data": {
            "name":studiosData[index].name,
            "url":studiosData[index].url,
            "addressString":studiosData[index].addressString,
            "email": studiosData[index].contactInfo,
            "latCoordinate": studiosData[index].latCoordinate,
            "lngCoordinate": studiosData[index].lngCoordinate,
            "image": studiosData[index].image[1],
            "filters":{
              "days": isEditDays ? selectedDaysEdit : studiosData[index].day, 
              "level": isEditLevel ? selectedLevelEdit : studiosData[index].level, 
              "workoutType": isEditWorkout ? selectedWorkoutEdit : studiosData[index].workoutType, 
              "rating": parseInt(studiosData[index].rating),
              "ratingList": convertListToIntegers(studiosData[index].ratingList),
              "price": studiosData[index].price.map(str => parseInt(str)), 
              "hours":convertDictValuesToIntegers(studiosData[index].hours)},
            "ownerUsername":username}
      };
      fetch('/api/update_studio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
    

      // clean const after sent to server
      setIsEditDays(false);
      setIsEditLevel(false);
      setIsEditWorkout(false);
      cleanDaysHours();
      setEditMode(false);
    }
  };
  

  //handle get pdf for the report
  const PDFViewerGeneral = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    useEffect(() => {
      // Assignment for demo purposes, to be replaced with username 
      var ownerUsername = username;
      fetch(`/api/createGeneralReport?ownerUsername=${ownerUsername}`)
      .then(response => response.blob())
      .then(blob => {
          const pdfUrl = URL.createObjectURL(blob);
          setPdfUrl(pdfUrl);
      })
      .catch(error => console.error('Error:', error));
    }, []);
    return (
      <div className="tab-content">
        {pdfUrl && <iframe className="pdf-frame" src={pdfUrl}></iframe>}
      </div>
    );
  };
  const PDFViewerStudios = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    useEffect(() => {
      // Assignment for demo purposes, to be replaced with username 
      var ownerUsername = username;
      fetch(`/api/createAllStudiosReport?ownerUsername=${ownerUsername}`)
      .then(response => response.blob())
      .then(blob => {
          const pdfUrl = URL.createObjectURL(blob);
          setPdfUrl(pdfUrl);
      })
      .catch(error => console.error('Error:', error));
    }, []);
    return (
      <div className="tab-content">
        {pdfUrl && <iframe className="pdf-frame" src={pdfUrl}></iframe>}
      </div>
    );
  };


  //add new studio for a given user
  const handleAddStudio = () => {
    //set the data for the new studio
    const newHours = {};
    var isValidHour = true;
    var isValidName = true;
    var isValidAddress = true;
    days.forEach((day) => {
      if(selectedDays.includes(day)){
        const startHour = eval(`${day.toLowerCase()}StartHour`); // Get the start hour variable dynamically
        const endHour = eval(`${day.toLowerCase()}EndHour`); // Get the end hour variable dynamically
        newHours[day] = [startHour, endHour];
        if(parseInt(startHour) === 0 || parseInt(endHour) === 0 || parseInt(endHour) < parseInt(startHour)){
          isValidHour = false;
          alert('Invalid hours');
        }
      }
    });

    if (newStudioName === ""){
      isValidName = false;
      alert("Invalid name");
    }

    if(newLatCoordinate === "" || newLngCoordinate === ""){
      isValidAddress = false;
      alert("Invalid address, address need to be in this format: street and number, tel aviv");
    }

    if (isValidHour && isValidName && isValidAddress){
      const newStudio = {
        name: newStudioName,
        url: newStudioUrl,
        addressString: newStudioAddress,
        latCoordinate: newLatCoordinate,
        lngCoordinate: newLngCoordinate,
        contactInfo: newContactInfo,
        day: selectedDays,
        level : selectedLevels.map(level => level.toLowerCase()),
        workoutType: selectedWorkOutType.map(workout => workout.toLowerCase()),
        price: newStudioPrice,
        hours: newHours,
        image: selectedPhoto,
        rating: 5,
        ratingList: [5]
      };

      setStudiosData([...studiosData, newStudio]);
      //send the data to server
      const data = {
        "name": newStudio.name,
        "url": newStudio.url,
        "email": newStudio.contactInfo,
        "addressString": newStudio.addressString,
        "latCoordinate": newStudio.latCoordinate, 
        "lngCoordinate": newStudio.lngCoordinate,
        "image": newStudio.image[1],
        "filters": {
          "days": selectedDays,
          "level": selectedLevels,
          "workoutType": selectedWorkOutType,
          "rating": 5,
          "ratingList": [5],
          "price": newStudio.price,
          "hours": convertDictValuesToIntegers(newStudio.hours),
        },
        "report": {
          "age": {
            "0_20": 0,
            "21_30": 0,
            "31_40": 0,
            "41_50": 0,
            "51_60": 0,
            "61_100": 0
          },
          "numberOfAppearancePerDay": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0,
            "13": 0,
            "14": 0,
            "15": 0,
            "16": 0,
            "17": 0,
            "18": 0,
            "19": 0,
            "20": 0,
            "21": 0,
            "22": 0,
            "23": 0,
            "24": 0,
            "25": 0,
            "26": 0,
            "27": 0,
            "28": 0,
            "29": 0,
            "30": 0,
            "31": 0
          },
          "numberOfAppearancePerMonth": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0
          },
          "numberOfClicksPerDay": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0,
            "13": 0,
            "14": 0,
            "15": 0,
            "16": 0,
            "17": 0,
            "18": 0,
            "19": 0,
            "20": 0,
            "21": 0,
            "22": 0,
            "23": 0,
            "24": 0,
            "25": 0,
            "26": 0,
            "27": 0,
            "28": 0,
            "29": 0,
            "30": 0,
            "31": 0
          },
          "numberOfClicksPerMonth": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0
          }
        },
        "ownerUsername": username,
        "premium": isPremium,
        "comments": [],
      
      };
        fetch('/api/add_studio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())

        //clean const after sent to server
        setNewStudioName("");
        setNewStudioAddress('');
        setNewStudioUrl('');
        setNewContactInfo('');
        setSelectedWorkOutType([]);
        setSelectedLevels([]);
        setNewStudioPrice([]);
        setNewStudioHours([]);
        setSelectedDays([]);
        setSelectedDaysEdit([])
        cleanDaysHours();
        setNewLatCoordinate("");
        setNewLngCoordinate("");
        setSelectedPhoto([photos[0], 0]);
    }
  };
  //set new studio name
  const handleNewStudioNameChange = (event) => {
    setNewStudioName(event.target.value);
  };

  //set new studio url
  const handleNewStudioUrlChange = (event) => {
    setNewStudioUrl(event.target.value);
  };

  //set new studio price
  const handleNewStudioPriceChange = (price) => {
    if(price[0] !== newStudioPrice[0] || price[1] !== newStudioPrice[1]){
      setNewStudioPrice(price);
    }
  };

  //set new studio start hours
  const handleNewStartHourChange = (event, day) => {
    var IsEndChanged = false; 
      switch(day){
      case 'sunday':
        setSundayStartHour(event.target.value);
        IsEndChanged = issundayHoursChanged[1]; 
        setIssundayHoursChanged([true, IsEndChanged]);
        break;

      case 'monday':
        setMondayStartHour(event.target.value);
        IsEndChanged = ismondayHoursChanged[1];
        setIsmondayHoursChanged([true, IsEndChanged]);
        break;

      case 'tuesday':
        setTuesdayStartHour(event.target.value);
        IsEndChanged = istuesdayHoursChanged[1];
        setIstuesdayHoursChanged([true, IsEndChanged]);
        break;

      case 'wednesday':
        setWednesdayStartHour(event.target.value);
        IsEndChanged = iswednesdayHoursChanged[1];
        setIswednesdayHoursChanged([true, IsEndChanged]);
        break;

      case 'thursday':
        setThursdayStartHour(event.target.value);
        IsEndChanged = isthursdayHoursChanged[1];
        setIsthursdayHoursChanged([true, IsEndChanged]);
        break;

      case 'friday':
        setFridayStartHour(event.target.value);
        IsEndChanged = isfridayHoursChanged[1];
        setIsfridayHoursChanged([true, IsEndChanged]);
        break;

      case 'saturday':
        setSaturdayStartHour(event.target.value);
        IsEndChanged = issaturdayHoursChanged[1];
        setIssaturdayHoursChanged([true, IsEndChanged]);
        break;
      }  
  };

  //set new studio end hours  
  const handleNewEndHourChange = (event, day) => {
     var isStartChanged = false;
  switch(day){
    case 'sunday':
      setSundayEndHour(event.target.value);
      isStartChanged = issundayHoursChanged[0];
      setIssundayHoursChanged([isStartChanged, true]);
      break;

    case 'monday':
      setMondayEndHour(event.target.value);
      isStartChanged = ismondayHoursChanged[0];
      setIsmondayHoursChanged([isStartChanged, true]);
      break;

    case 'tuesday':
      setTuesdayEndHour(event.target.value);
      isStartChanged = istuesdayHoursChanged[0];
      setIstuesdayHoursChanged([isStartChanged, true]);
      break;

    case 'wednesday':
      setWednesdayEndHour(event.target.value);
      isStartChanged = iswednesdayHoursChanged[0];
      setIswednesdayHoursChanged([isStartChanged, true]);
      break;

    case 'thursday':
      setThursdayEndHour(event.target.value);
      isStartChanged = isthursdayHoursChanged[0];
      setIsthursdayHoursChanged([isStartChanged, true]);
      break;

    case 'friday':
      setFridayEndHour(event.target.value);
      isStartChanged = isfridayHoursChanged[0];
      setIsfridayHoursChanged([isStartChanged, true]);
      break;

    case 'saturday':
      setSaturdayEndHour(event.target.value);
      isStartChanged = issaturdayHoursChanged[0];
      setIssaturdayHoursChanged([isStartChanged, true]);
      break;
    }  
  };

    //set new contact info for a studio
  const handleNewContactInfoChange = (event) => {
    setNewContactInfo(event.target.value);
  };

  //helper function that validates that the given address is within Tel Aviv
  const isWithinTelAviv = (lat, lng) => {
    const minLat = 32.0554; // Minimum latitude value
    const maxLat = 32.1411; // Maximum latitude value
    const minLng = 34.7313; // Minimum longitude value
    const maxLng = 34.8401; // Maximum longitude value
  
    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
  };

  //get coordinates for a given address and save them
  const getCoordinates = async (address, setValidFunction) => {
    try {
      if (!address) {
        // Address is empty or undefined
        setValidFunction(false);
        return;
      }

      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: "" 
        },
        onerror: () => {}
      });
  
      const { results } = response.data;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        if(isWithinTelAviv(lat, lng)){
          setValidFunction(true);
          return { lat, lng };
        }
        setValidFunction(false);        
      } else {
        //No results found for the address
        setValidFunction(false);
      }
    } catch (error) {
      //Error retrieving coordinates
      setValidFunction(false);
    }
  };

  //set address and coordinates for new studio
  const handleNewStudioAddressChange = (event, setIsValidFunction) => {
    setNewStudioAddress(event.target.value);
    getCoordinates(newStudioAddress, setIsValidFunction)
    .then((coordinates) => {
      setNewLatCoordinate(coordinates.lat);
      setNewLngCoordinate(coordinates.lng);
    })
    .catch((error) => {
      //console.error('Error:', error.message);
    });
  
  };

  //save new name in edit mode
  const handleStudioNameChange = (index, newName) => {
    const updatedStudiosData = [...studiosData];
    updatedStudiosData[index].name = newName;
    setStudiosData(updatedStudiosData);
  };

  //save new url in edit mode
  const handleStudioUrlChange = (index, newName) => {
    const updatedStudiosData = [...studiosData];
    updatedStudiosData[index].url = newName;
    setStudiosData(updatedStudiosData);
  };

  //save new address and coordinates in edit mode
  const handleStudioAdrresChange = (index, newName) => {
    const updatedStudiosData = [...studiosData];
    updatedStudiosData[index].addressString = newName;

    getCoordinates(newName, setIsAddressEditValid)
    .then((coordinates) => {
      setNewLatCoordinate(coordinates.lat);
      setNewLngCoordinate(coordinates.lng);
    })
    .catch((error) => {
      //console.error('Error:', error.message);
    });

    updatedStudiosData[index].latCoordinate = newLatCoordinate;
    updatedStudiosData[index].lngCoordinate = newLngCoordinate;
    setStudiosData(updatedStudiosData);
  };

  //save new contact info in edit mode
  const handleStudioContactInfoChange = (index, newName) => {
    const updatedStudiosData = [...studiosData];
    updatedStudiosData[index].contactInfo = newName;
    setStudiosData(updatedStudiosData);
  };

    //save new price info in edit mode
    const handleStudioPriceFilterChange = (index, newPrice, idx) => {
      const updatedStudiosData = [...studiosData];
      updatedStudiosData[index].price[idx] = newPrice;
      setStudiosData(updatedStudiosData);
    };

  //tabs contant 
  const tabs = [
    {
      //first tab - list of the studios for a given user, with option to add new studio, edit an exsisting one and delete studio
      label: 'My Studios',
      content: (
          <div className="tab-content">
            {studiosData && studiosData.length > 0 ? (
              studiosData.map((studio, index) => (
                <div key={index} className={`studio studio-${index}`} style={{ backgroundColor: '#cce6fac1', padding: '10px', margin: '0px', border: '0px solid #ccc',
                borderRadius: '15px',  marginBottom: '10px' }}>
        
                <div className="category-wrapper">
                  <strong className="edit-title">Name: </strong>
                  {editMode && editIndex === index? (
                  <input className="category-content" type="text" value={studio.name} onChange={(e) => handleStudioNameChange(index, e.target.value)} />
                  ) : (
                    <span className="category-content">{studio.name}</span>
                  )}
                </div>

                <div className="category-wrapper">
                  <strong className="edit-title">URL: </strong> 
                  {editMode && editIndex === index ? (
                  <input className="category-content" type="text" value={studio.url} onChange={(e) => handleStudioUrlChange(index, e.target.value)} />
                  ) : (
                    <span className="category-content">{studio.url}</span>
                  )}
                </div>

                <div className="category-wrapper">
                  <strong className="edit-title">Address: </strong> 
                  {editMode && editIndex === index ? (
                  <input id={isEditAddressValid ? '' : 'edit-input-error'} className="category-content" type="text" value={studio.addressString} onChange={(e) => handleStudioAdrresChange(index, e.target.value)} />
                  ) : (
                    <span className="category-content">{studio.addressString}</span>
                  )}
                </div>

                <div className="category-wrapper">
                  <strong className="edit-title" id="contact-Info-edit"> Contact Info: </strong> 
                  {editMode && editIndex === index? (
                  <input className="category-content" type="text" value={studio.contactInfo} onChange={(e) => handleStudioContactInfoChange(index, e.target.value)} />
                  ) : (
                    <span className="category-content">{studio.contactInfo}</span>
                  )}
                </div>

                <div className="category-wrapper">
                  <strong className="edit-title"> Price: </strong>
                  {editMode && editIndex === index? (
                  <div>
                  <span> start range:</span>
                  <input 
                  type="text"
                  value={studio.price[0]} 
                  onChange={(e) => handleStudioPriceFilterChange(index, e.target.value, 0)} 
                  style={{ width: '50px', marginRight: '10px' }}
                  />
                  end range:
                  <input 
                  type="text"
                  value={studio.price[1]} 
                  onChange={(e) => handleStudioPriceFilterChange(index, e.target.value, 1)} 
                  style={{ width: '50px' }}
                  />
                </div>
                  
                  ) : (
                    <span className="category-content">
                    {studio.price ? studio.price[0] + " - " + studio.price[1] + " ₪": ""}
                    </span>
                  )}
                </div>
              
                <div className="category-wrapper" >
                  <strong className="edit-title">Level: </strong>
                  {editMode && editIndex === index ? (
                      levels.map((level) => (
                        <div key={level} onClick={() => handleLevelClickEdit(level)} style={{marginTop:"3px"}}>
                          <input type="radio" checked={selectedLevelEdit.includes(level)} readOnly />
                          <label style={{fontWeight: "normal"}}>{level}</label>
                        </div>
                      ))
                      ):(
                       <span className="category-content">
                         {Array.isArray(studio.level)
                          ? studio.level.join(', ')
                          : studio.level}
                      </span>
  
                      )}
                </div>

                <div className="days_and_hours">
                  <strong>Days and hours: </strong>
                  {editMode && editIndex === index ? (
                    days.map((day) => (
                    <div key={day} >
                      <input 
                      type="radio" 
                      checked={selectedDaysEdit.includes(day)} 
                      onClick={() => handleDayClickEdit(day)}readOnly />
                      <label>{day}</label>
                      <div>
                          {day} start hour:  
                          <input
                          id={`${day}StartHour`}
                          type="number"
                          value={Number(eval(`${day.toLowerCase()}StartHour`))}
                          min={0}
                          max={23}
                          onChange={(event) => handleNewStartHourChange(event, day)}
                          style={{ width: '50px', marginRight: '10px' }}
                           />
                          {day} end hour:  
                          <input
                          id={`${day}EndHour`}
                          type="number"
                          value={Number(eval(`${day.toLowerCase()}EndHour`))}
                          min={eval(`${day.toLowerCase()}StartHour`)}
                          max={23}
                          onChange={(event) => handleNewEndHourChange(event, day)}
                          style={{ width: '50px' }}
                          />
                      </div>
                    </div>
                    ))
                    ):(
                      <span>
                        {Array.isArray(studio.day) ? (
                        studio.day.map((day, dayIndex) => (
                        <React.Fragment key={day}>
                        {day}:{' '}
                        {studio.hours && studio.hours[day] ? (
                          <>
                        {studio.hours[day].map((hour, hourIndex) => (
                          <span key={hourIndex}>
                            {String(hour)}
                            {hourIndex !== studio.hours[day].length - 1 && '-'}
                          </span>
                        ))}
                        {dayIndex !== studio.day.length - 1 && ', '}
                        </>
                        ) : null}
                        </React.Fragment>
                        ))
                        ) : (
                        <>
                        {studio.day}:{' '}
                        {studio.hours && studio.hours[studio.day] ? (
                        <>
                        {studio.hours[studio.day].map((hour, hourIndex) => (
                        <span key={hourIndex}>
                        {parseInt(hour.$numberInt)}
                        {hourIndex !== studio.hours[studio.day].length - 1 && '-'}
                        </span>
                        ))}
                        </>
                        ) : null}
                        </>
                        )}
                      </span>
                      )}
                </div>

                <div>
                  <strong>Workout Type: </strong>
                  {editMode && editIndex === index? (
                    workOutTypes.map((workout) => (
                      <div key={workout} onClick={() => handleworkoutClickEdit(workout)}>
                        <input type="radio" checked={selectedWorkoutEdit.includes(workout)} readOnly />
                        <label style={{fontWeight: "normal"}}>{workout}</label>
                      </div>
                     ))
                  ):(
                    <span>
                      {Array.isArray(studio.workoutType)
                      ? studio.workoutType.join(', ')
                      : studio.workoutType}
                    </span>
                  )}
                </div>

                <div>
                  {editMode && editIndex === index? (
                    <div>
                        <strong>Select a photo: </strong>
                        <select id="photoSelect" value={selectedPhotoEdit[0]} onChange={handlePhotoChangeEdit}>
                        {photos.map((photo, index) => (
                          <option key={index} value={photo}>{photo}</option>
                        ))}
                      </select>
                    </div>
                    ):(
                      <span></span>
                    )}
                </div>

                <div style={{display: 'inline-block', marginTop: '5px'}}>
                {editMode && editIndex === index ? (
                  <button onClick={() => handleSaveButtonClick(index)}>Save</button>
               ) : (
                <div>
                  <i
                    className="fa-regular fa-pen-to-square"
                    id = "edit"
                    onClick={() => handleEditButtonClick(index)}>
                  </i>
                  </div>
                )}
                </div>
 
                <div style={{ display: 'inline-block', marginLeft: '91%'}}>
                  <i className="fa-regular fa-trash-can"
                    id="trash"
                    onClick={() => handleDeleteStudio(index)}>
                  </i>
                </div>
             </div>
           ))
          ) : (
            <div>No Studios Found</div>
          
          )}
          <div style={{ marginTop: '20px' }}>
          <div className="add-studio-box" 
          style={{ backgroundColor: '#cce6fac1', padding: '10px', margin: '0px'  ,border: '1px solid #ccc', borderRadius: '15px', }}> 
          <div className="add-new-studio-title"> Add New Studio:</div>

          <div>
            <label htmlFor="studioName">Studio Name:</label>
            <input id="studioName" type="text" value={newStudioName} onChange={handleNewStudioNameChange} />
          </div>

          <div>
            <label htmlFor="studioUrl">URL: </label>
            <input id="studioUrl" type="text" value={newStudioUrl} onChange={handleNewStudioUrlChange} />
          </div>

          <div>
            <label htmlFor="studioAddress">Address: </label>
            <input className={isNewAddressValid ? '' : 'input-error'} id="studioAddress" type="text" value={newStudioAddress} onChange={(e) => handleNewStudioAddressChange(e, setIsAddressValid)} />
          </div>

          <div>
            <label htmlFor="contactInfo">Contact Info:</label>
            <input id="contactInfo" type="text" value={newContactInfo} onChange={handleNewContactInfoChange} />
          </div>

          <div>
            <label>Price: </label>
            <MultiRangeSlider
              min={0}
              max={500}
              onChange={({ min, max }) => handleNewStudioPriceChange([min, max])}
              isHours={false}
            />
            
          </div>

          <div>  
            <div className="add_studio_days">
              <label>Days and Hours:</label>
              {days.map((day) => (
        <div key={day}>
          <input
            type="radio"
            checked={selectedDays.includes(day)}
            onClick={() => handleDayClick(day)}
            readOnly
          />
          <label>{day}</label>
          <div>
            {day} start hour:  
            <input
              id={`${day}StartHour`}
              type="number"
              value={editMode ? 0 :  Number(eval(`${day.toLowerCase()}StartHour`))}
              min={0}
              max={23}
              onChange={(event) => handleNewStartHourChange(event, day)}
              style={{ width: '50px', marginRight: '10px' }}
            />
            {day} end hour:  
            <input
              id={`${day}EndHour`}
              type="number"
              value={editMode ? 0 : Number(eval(`${day.toLowerCase()}EndHour`))}
              min={eval(`${day.toLowerCase()}StartHour`)}
              max={23}
              onChange={(event) => handleNewEndHourChange(event, day)}
              style={{ width: '50px' }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="add_studio_level"> 
      <label>Levels:</label>
        {levels.map((level) => (
          <div key={level} onClick={() => handleLevelClick(level)}>
            <input type="radio" checked={selectedLevels.includes(level)} readOnly />
            <label style={{fontWeight: "normal"}}>{level}</label>
          </div>
        ))}
    </div>

    <div className="add_studio_workout_type">
        <label>Workout type:</label>
        {workOutTypes.map((workOutType) => (
          <div key={workOutType} onClick={() => handleWorkOutTypeClick(workOutType)}>
          <input type="radio" checked={selectedWorkOutType.includes(workOutType)} readOnly />
          <label style={{fontWeight: "normal"}}>{workOutType}</label>
          </div>
        ))}
    </div>
  </div>

  <div className="add_photo">
      <label htmlFor="photoSelect">Select a photo:</label>
      <select id="photoSelect" value={selectedPhoto[0]} onChange={handlePhotoChange}>
        {photos.map((photo, index) => (
          <option key={index} value={photo}>{photo}</option>
        ))}
      </select>
    </div>

    <button className="add-studio-btn" onClick={handleAddStudio}>Add Studio</button>
  </div>
  </div>
  </div>
        
  )
    },
     {
       //second tab - General Report
       label: 'General Report',
       content: PDFViewerGeneral()
     },
     {
       //third tab - Studios Report
       label: 'Studios Report',
       content: PDFViewerStudios()
     },
     {
       //third tab - Studios Report
       label: 'My Account',
       content: (
        <div className="my-account-container">
          <div className="account-status">Account status: 
            <span style={{fontWeight: "100"}}> {isPremium ? "Premium":"Basic"} {isPremium ? <i className="fa-solid fa-crown fa-sm" id="crown-icon"></i>:""}
             </span> 
          </div>
          <p className="my-account-text"> 
            Premium users enjoy exclusive benefits designed to enhance your studio's online presence and attract more customers:<br></br><br></br>

            <i className="fa-regular fa-square-check"></i> <span className="my-account-titles" style={{fontWeight: "500"}}>Priority Display:</span> As a Premium client, your studio will be showcased at the top of the list, ensuring prime visibility and increased exposure to potential customers. Stand out from the competition and capture the attention of those seeking fitness services.<br></br><br></br>

            <i className="fa-regular fa-square-check"></i> <span className="my-account-titles" style={{fontWeight: "500"}}>General Reports:</span> Gain access to valuable general reports that provide insights into popular search trends and user preferences within the fitness industry. Stay informed about the latest market trends, allowing you to make data-driven decisions to optimize your business strategies.<br></br><br></br>

            <i className="fa-regular fa-square-check"></i> <span className="my-account-titles" style={{fontWeight: "500"}}>Studio Reports:</span> Receive personalized reports tailored specifically to your studio. These reports offer detailed information on the attention and engagement your studio receives on our platform, helping you gauge user interest and track your online presence effectively. Use this data to refine your marketing efforts and drive more targeted results.

            {!isPremium ? <span style={{fontWeight: "500"}}> <br></br><br></br>Upgrade to Premium today and unlock these remarkable features, ensuring that your studio remains at the forefront of the fitness landscape. Maximize your online visibility and attract more customers to propel your business towards success.<br></br></span> :""}

            {isPremium ? <button id="cancel-subscription-button" onClick={handleCancelPremuim}> Cancel my Premium subscription</button>:""}

          </p>

        </div>)
     }
  ];

  function handleCancelPremuim(){
    setIsPremium(0);
    // API- set premium off (0) for given user name and his studios
    const data = {"username" : username};
    fetch('/api/premium_off', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
  }


  //get info for the current tab 
  function handleTabClick(index) {
    setActiveTab(index);
    setEditMode(false);
    
  }

  function getStudiosForUser(){
    if (!isStudiosInit && studiosData && studiosData.length === 0) {
      setIsStudiosInit(true);
      // // API- return all studios of a given business owner (by his username)
      const ownerUsername = username;
      fetch(`/api/get_all_studios_of_owner?ownerUsername=${ownerUsername}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())

      .then(data => {
        var studioList = [];
        for(var i = 0; i < data.length; i++ ){
          studioList.push(studio = {
            name: data[i]["name"], 
            url: data[i]["url"], 
            addressString: data[i]["addressString"], 
            latCoordinate: data[i]["latCoordinate"],
            lngCoordinate: data[i]["lngCoordinate"], 
            contactInfo: data[i]["email"],
            day: data[i]['filters']['days'],
            level: data[i]['filters']['level'],
            workoutType: data[i]['filters']['workoutType'],
            rating: data[i]['filters']['rating'],
            ratingList: data[i]['filters']['ratingList'],
            hours: data[i]['filters']['hours'],
            price:(data[i]['filters']['price']),
            image: data[i]["image"]

          });
        }
        if(studioList && studioList.length > 0){
          setStudiosData(studioList);
        }
      })
    }
  }

  //delete studio for a given user and studio name
  function handleDeleteStudio(index) {
    const updatedStudiosData = studiosData.filter((studio, i) => i !== index);
    setStudiosData(updatedStudiosData);
    const data = {
      "name":studiosData[index].name
   };
   fetch('/api/remove_studio', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
     .then(response => response.json())
     

  }
  
  return (
    handleIsPremium(),
    getStudiosForUser(),
    <div className="myBusiness-container">
      <button className="backToMap" onClick={handleBackToMapClick}>
          Go Back To Map
        </button>
        {showPremiumPopup && <PremiumPopup onClose={() => setShowPremiumPopup(false)}/>}
        {showAlreadyPremiumPopup && <AlreadyPremiumPopup onClose={() => setShowAlreadyPremiumPopup(false)}/>}
      <div className="title-container">
        <div className='title'> 
              {username}'s  business 
        </div>  
        <button className="go_premium" onClick={handlePremiumClick}>
              Go Premium!  
        </button> 
      </div>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
  }

export default MyBusiness;