let weather = {
  apiKey: "b78814471b952a320749948208df2d1b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { temp_max, temp_min } = data.main;
    const { country } = data.sys;
    // date and time like "Thursday 4 March 2022"
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const today = date.toLocaleDateString("en-US", options);

    // convert temp to integer
    const tempInt = Math.floor(temp);
    const tempMaxInt = Math.floor(temp_max);
    const tempMinInt = Math.floor(temp_min);
 
    document.querySelector(".city").innerText = name + ", " + country;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = tempInt + "°c";
    document.querySelector(".min-max").innerText = tempMinInt + "°c / " + tempMaxInt + "°c";
    document.querySelector(".today").innerText = today;
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("New Delhi");
