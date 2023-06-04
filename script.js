
/**
 * Declare all variables
 */


weatherAPIKey = "ca80ffda470e4eca8e4235808230905";
mapAPIKey = "aG8NIzp3QrvPAfPAcatmWUYjhlHsaOcy";
geoAPIkey = "eec122638c9e4b6397e0c2634019c4bc"

//variables for form and modal
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let progressInput = document.getElementById("progressInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
//local storage
let data = [{}];

//variables for API
let dateTime = document.getElementById("localTime");
let weatherIcon = document.getElementById("weatherIcon");
let weatherTemp = document.getElementById("weatherTemp");
let countryIcon = document.getElementById("countryEmoji");



window.onload = getData();

/**
 *  Get location data from API
 */

async function getData() {

  const apiURL =  "https://ipapi.co/json/"
    
  try {
      const response = await fetch(apiURL, {cache: "no-cache"});
      const result = await response.json();
  
      if (response.ok) {
          console.log("the IP API result is: " , result);
         
          let ipAdress = result.ip;
          
          let countryCode = result.country_code;
          getFlagEmoji(countryCode);
          
          console.log(ipAdress);
          
          getWeatherData(ipAdress);


      }

  } catch (error) {
      if (error) throw error;
      console.log("IP address API error ", error);
  
  }
}


/**
 * Get the weather data from API
 * @param {*} ipAddressInput
 * 
 */

async function getWeatherData(ipAddressInput) {

   const weatherUrl = "https://api.weatherapi.com/v1/current.json?key=" + weatherAPIKey + "&q=" + ipAddressInput + "&aqi=no";
   
  try {
      const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
      const weatherResult = await weatherResponse.json();


      if (weatherResponse.ok) {
          console.log("the Weather API result is: " , weatherResult);

          let theWeather = weatherResult.current.temp_f;
          
          let theWeatherIcon = weatherResult.current.condition["icon"];
          let dateTime = weatherResult.location.localtime;
          
          console.log("The weather is: " + theWeather);
          console.log("The weather icon is: " + theWeatherIcon);
          console.log("The date/time is: " + dateTime);

          outPutWeather(theWeather);
          outputDateTime(dateTime);
          outputWeahterIcon(theWeatherIcon);
      }

     

  } catch (error) {
      if (error) throw error;
      console.log("Weather API error: ", error);
  
  }
}

/**
 * Output the weather from API
 * @param {*} e 
 */

let outPutWeather = (e) => {
  weatherTemp.innerHTML = e;
}

/**
 * Output the date/time from API
 * @param {*} e 
 */

let outputDateTime = (e) => {
  dateTime.innerHTML = e;
}

/**
 * Output the weather icon from API
 * @param {*} e 
 */

let outputWeahterIcon = (e) => {
  weatherIcon.innerHTML = "<img class='weather-icon' src='https:" + e +  "'>";
  
}

/**
 * Output the country emoji from API
 * @param {*} e 
 * @returns the country emoji
 */
let getFlagEmoji = (e) => {
  
  let countryEmoji =  e.toUpperCase().replace(/./g, char => 
        String.fromCodePoint(127397 + char.charCodeAt())
    );
    console.log(countryEmoji);
    countryIcon.innerHTML = countryEmoji;
  }

/**
 * Add event listener and validate form
 */

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });

/**
 * Valid the form and process data
 */  
  
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {

    console.log("success");
    msg.innerHTML = "";
    acceptData();
    // Close the modal
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

  (() => {
    add.setAttribute("data-bs-dismiss", "");
  })();
  }
};

  

/**
 * Push data into local storage
 */

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    progress: progressInput.value,
  });

  console.log("accepting task: " + textInput.value);
  console.log("accepting date: " + dateInput.value);
  console.log("accepting description: " + textarea.value);
  console.log("accepting progress: " + progressInput.value);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(JSON.stringify(data));
  createTasks();
};

/**
 *  Display template and push data into the template. Reset the form. Also displays the edit/delete buttons
 */

let createTasks = () => {
  console.log(JSON.stringify(data));
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold text-center">${x.text}</span>
            <span class="small text-secondary"> ${x.date}</span>
            <span>${x.description}</span>
            <span class="">${x.progress}</span>

            <span class="options text-center">
              <i onClick= "editTask(this)" 
                 data-bs-toggle="modal" 
                 data-bs-target="#form" 
                 class="bi bi-pencil-square crud">
              </i>
              <i onClick ="deleteTask(this);createTasks()" 
                 class="bi bi-trash crud"></i>
            </span>
      </div>
      `);
    });

    console.log("creating task: " + textInput.value);
    console.log("creating date: " + dateInput.value);
    console.log("creating description: " + textarea.value);
    console.log("creating progress: " + progressInput.value);
    console.log(JSON.stringify(data));
    
    resetForm();
  };

  /**
   * Clear the form
   */

  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    // progressInput.value = "";
    textarea.value = "";
  };

  /**
   * Delete a record
   * @param {*} e 
   */

  let deleteTask = (e) => {

    // detelete HTML element
    e.parentElement.parentElement.remove();
  
    // remove from array
    data.splice(e.parentElement.parentElement.id, 1);
  
    // update local storage
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };
  
  /**
   * Edit a record
   * @param {*} e
   */

  let editTask = (e) => {

    console.log(JSON.stringify(data));
    console.log("editing task: " + textInput.value);
    console.log("editing date: " + dateInput.value);    
    console.log("editing description: " + textarea.value);
    console.log("editing progress: " + progressInput.value);

    let selectedTask = e.parentElement.parentElement;
    
    console.log(selectedTask);

    textInput.value = selectedTask.children[0].innerHTML;
    console.log("editing task " + textInput.value);
    
    dateInput.value = selectedTask.children[1].innerHTML;
    console.log("editing date " + dateInput.value);
    
    
    textarea.value = selectedTask.children[2].innerHTML;
    console.log("editing description " + textarea.value);
  
    progressInput.value = selectedTask.children[3].innerHTML;
    console.log("editing progress " + progressInput.value);
    
    deleteTask(e);
    console.log(JSON.stringify(data));
  };
  

  /**
   * Get data from local storage
   */

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log("Get data from local storage" + data);
    createTasks();
  })();
  