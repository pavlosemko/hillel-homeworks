window.onload = function () {
    const chooserCity = document.getElementById("chooserCity"),
        defaultCity = chooserCity.value,
        weatherBlock = document.getElementById("weatherBlock"),
        updatedElements = [...document.querySelectorAll(".updateData")];

    function showWeatherBlock() {
        weatherBlock.classList.remove("hidden");
    }
    function hideWeatherBlock() {
        weatherBlock.classList.add("hidden");
    }

    const textUpdater = (element, data) => {
        element.textContent = data;
    };

    const genWeatherIconLink = (icon) => {
        return `https://openweathermap.org/img/wn/${icon}@4x.png`;
    };

    const updaters = {
        temperature_updater: textUpdater,
        pressure_updater: textUpdater,
        humidity_updater: textUpdater,
        windSpeed_updater: textUpdater,
        weatherDescription_updater: textUpdater,
        weatherIcon_updater: (element, data) => {
            element.src = genWeatherIconLink(data);
        },
        windDegree_updater: (element, data) => {
            element.textContent = getWindDirection(data);
        },
    };

    function setWeatherData(city) {
        getWeatherDataByCity(city)
            .then(
                (data) => {
                    updatedElements.forEach((element) => {
                        const id = element.id,
                            updater = updaters[`${id}_updater`],
                            newData = data[id];
                        if (newData && updater && typeof updater === "function") {
                            updater(element, newData);
                        }
                    });
                },
                () => {
                    alert("Шось пішло не так спробуйте пізніще ");
                }
            )
            .then(() => {
                showWeatherBlock();
            });
    }

    function getWindDirection(windDegree) {
        const directions = [
            "Північний",
            "Північно-східний",
            "Східний",
            "Південно-східний",
            "Південний",
            "Південно-західний",
            "Західний",
            "Північно-західний",
        ];

        const index = Math.round(windDegree / 45) % 8;
        return directions[index];
    }

    async function getWeatherDataByCity(city) {
        const API_KEY = "428ed9c20a980dc9c96118fc1ca2f88b",
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}&lang=uk`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }
            const data = await response.json();
            const {
                main: { temp: temperature, pressure, humidity },
                wind: { speed: windSpeed, deg: windDegree },
                weather: [{ description: weatherDescription, icon: weatherIcon }],
            } = data;

            return {
                temperature,
                pressure,
                humidity,
                windSpeed,
                windDegree,
                weatherDescription,
                weatherIcon,
            };
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    const onChangeCityHandler = function (event) {
        event.preventDefault();
        hideWeatherBlock();
        setWeatherData(this.value);
    };
    chooserCity.addEventListener("change", onChangeCityHandler);
    setWeatherData(defaultCity);
};
