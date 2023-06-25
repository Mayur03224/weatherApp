const url = "https://api.openweathermap.org/data/2.5/weather?";
const container = document.querySelector(".container").innerHTML;
const APIkey = "031939e6ecdb70228e8e25afdf70578c";
let cityName = document.getElementById("cityName");
const image = document.getElementById("image");
const country = document.getElementById("country");
const humadity = document.getElementById("humadity");
const windSpeed = document.getElementById("windSpeed");
let errorMsg = document.querySelector(".error");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    getLocation();
  } else {
    console.log("you browser does not support this feature");
  }
});

const getLocation = () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    fetchWeatherData(latitude, longitude);
  });
};

const fetchWeatherData = async (latitude, longitude) => {
  try {
    const data = await fetch(
      `${url}lat=${latitude}&lon=${longitude}&appid=${APIkey}`
    );
    const javascriptObj = await data.json();
    console.log(javascriptObj);
    showData(javascriptObj);
  } catch (err) {
    console.log(err);
    `while fetching the api there is a problem${err}`;
  }
};

// let history=[]

// const data = fetchWeatherData().then((data)=>{
//   console.log(data)
//   const mapHistory = history.push(data)
//   const jsondata = JSON.stringify(mapHistory);
//   window.localStorage.setItem('userHistory', jsondata)
// }).catch((err)=>{
//   console.log(err)
// })
// data()

function showData(javascriptObj) {
  if (javascriptObj.message == "city not found") {
    console.log(javascriptObj)
    cityName.innerHTML = `${javascriptObj.message}`;
    country.innerHTML = "";
    windSpeed.innerHTML = "";
    humadity.innerHTML = "";
  } else {
    cityName.innerHTML = javascriptObj.name;
    country.innerHTML = javascriptObj.sys.country;
    humadity.innerHTML = `Humadity ${javascriptObj.main.humidity}%`;
    windSpeed.innerHTML = `Speed ${javascriptObj.wind.speed}km/h`;
    const icon = javascriptObj.weather[0].icon;
    console.log(icon);
    var iconurl = `http://openweathermap.org/img/w/${icon}.png`;
    image.src = `${iconurl}`;

    // if (desc==''){
    // console.log(`sorry there is no image`)
    // errorMsg.innerHTML='there is no image for this weather'
    // }
    // else if (desc == 'rain') {
    //   image.src="../images/rain.png"
    // }
    // else if (desc == 'few clouds') {
    //   image.src="../images/mist.png"
    // }
    // else if (desc == 'snow') {
    //   image.src="../images/snow.png"
    // }

    // else{
    //       image.src="../images/localimage"

    // }
  }
}

const cityData = document.getElementById("cityData");
async function CityData(Value) {
  const data = await fetch(`${url}q=${Value}&appid=${APIkey}`);
  const jsonObj = await data.json();
  showData(jsonObj);
}

function getCityData() {
  let errorMsg = document.querySelector(".error");
  let cityValue = cityInput.value;
  if (cityValue == "") {
    console.log("enter something");
    errorMsg.innerHTML = "Please Enter city name";
    errorMsg.classList.add("error");
  } else {
    errorMsg.innerHTML = "";
    CityData(cityValue);
  }
}
