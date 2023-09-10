const searchBarElem = document.querySelector(".search-bar");
const tempElem = document.querySelector(".temprature");
const cityElem = document.querySelector(".city");
const dateElem = document.querySelector(".date");
const dayElem = document.querySelector(".day");
const timeElem = document.querySelector(".time");
const conditionElem = document.querySelector(".condition");
const weatherElem = document.querySelector(".weather-img");
const mainContainerElem = document.querySelector(".main-container");
const weatherOutputElem = document.querySelector(".weather-output");

searchBarElem.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    const cityName = searchBarElem.value;
    searchBarElem.value = "";
    if (cityName === "") return;
    fetchAndUpdateUi(cityName);
  }
});

const apiKey = "73fb86b5c79b4a51a8f142823230209";

const fetchAndUpdateUi = async (cityName) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
  const data = await fetch(url);
  const json = await data.json();
  console.log(json);
  const { name, localtime, localtime_epoch } = json.location;
  const time = localtime.split(" ")[1];
  const date = localtime.split(" ")[0];
  const dayCount = new Date(localtime_epoch * 1000).getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[dayCount];
  const condition = json.current.condition.text;
  const temp = json.current.temp_c;
  const iconLink = json.current.condition.icon;
  updateUi(name, time, date, day, condition, temp);
};

const updateUi = (location, time, date, day, condition, temp) => {
  console.log(time);
  let wholeDate = Number(time.split(":")[0]);
  console.log(wholeDate);
  if (wholeDate > 18 || wholeDate < 4) {
    console.log("true");
    mainContainerElem.style.background = `url("./image/night.jpg")`;
    mainContainerElem.style.backgroundSize = "cover";
    weatherOutputElem.style.backgroundColor = "#00003B";
  } else {
    mainContainerElem.style.background = `url("./image/day.jpg")`;
    mainContainerElem.style.backgroundSize = "cover";
    weatherOutputElem.style.backgroundColor = "rgba(214, 178, 48, 0.882)";
  }
  tempElem.innerHTML = `${temp}&deg;C`;
  dateElem.textContent = date;
  timeElem.textContent = time;
  cityElem.textContent = location;
  conditionElem.textContent = condition;
  dayElem.textContent = day;
  const conditionType = condition.split(" ");
  if (conditionType.includes("rain")) {
    weatherElem.setAttribute("src", "./image/raining.png");
  } else if (conditionType.includes("sunny")) {
    weatherElem.setAttribute("src", "./image/sunny.png");
  } else if (conditionType.includes("cloudy")) {
    weatherElem.setAttribute("src", "./image/cloudy.png");
  } else {
    weatherElem.setAttribute("src", "./image/day-cloudy.png");
  }
};
