window.onload = function () {
    const chooserCity = document.getElementById("chooserCity"),
        defaultCity = chooserCity.value,
        weatherBlock = document.getElementById("weatherBlock"),
        updatedElements = [...document.querySelectorAll(".updateData")];

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
            const icon = genWeatherIconLink(data);
            element.src = icon;
        },
        windDegree_updater: (element, data) => {
            element.textContent = getWindDirection(data);
        },
    };

    function setWeatherData(city) {
        getWeatherDataByCity(city).then((data) => {
            console.log(data);
            updatedElements.forEach(function (element) {
                const id = element.id,
                    updater = updaters[`${id}_updater`],
                    newData = data[id];
                if (newData && updater && typeof updater === "function") {
                    console.log(id);
                    updater(element, newData);
                }
            });
            toggleWeatherBlock();
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
    const toggleWeatherBlock = () => {
        weatherBlock.classList.toggle("hidden");
    };

    async function getWeatherDataByCity(city) {
        const API_KEY = "428ed9c20a980dc9c96118fc1ca2f88b";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}&lang=uk`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    "Request failed with status " + response.status
                );
            }
            const data = await response.json();
            const {
                main: { temp: temperature, pressure, humidity },
                wind: { speed: windSpeed, deg: windDegree },
                weather: [
                    { description: weatherDescription, icon: weatherIcon },
                ],
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
            console.error("Error:", error.message);
        }
    }

    const onChangeCityHandler = function (event) {
        event.preventDefault();
        toggleWeatherBlock();
        setWeatherData(this.value)
    };
    chooserCity.addEventListener("change", onChangeCityHandler);
    setWeatherData(defaultCity);
};
