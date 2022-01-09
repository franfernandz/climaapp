/*función para tomar el clima */
let weather = {
	"apiKey": "Acá va la API Key",
	fetchWeather: function(city) {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" 
			+ city 
			+"&units=metric&lang=sp&appid=" /* toma la temperatura en celsius */
			+ this.apiKey
		)
		
		/*.then((response)=>response.json())
		.then((data)=>this.displayWeather(data));*/
		.then((response) => {
			if (!response.ok) {
				alert("No se encontro el clima de esa ciudad");
				throw new Error("No se encontró el clima de esa ciudad");
			}
			return response.json();
		})
		.then((data) => this.displayWeather(data))
	},

	displayWeather: function(data) {
		const { name } = data; /* nombre de la ciudad */
		const { icon, description } = data.weather[0]; /*icono y descripción del clima */
		const { temp, humidity } = data.main; /* temperatura y humedad */
		const { speed } = data.wind; /*velocidad del viento */

		document.querySelector(".city").innerText = "El clima en " + name+":";
		document.querySelector(".temp").innerText = Math.round(temp) +  " °C".replace(/[^a-zA-Z ]/, "");
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".humidity").innerText = "Humedad: " + humidity + "%";
		document.querySelector(".wind").innerText = "Velocidad del viento: " + speed + " km/h";

	/* esta función oculta el texto de los campos html mientras carga ciudades */
		document.querySelector(".weather").classList.remove("loading"); 

	/* función para que la foto de fondo sea de la ciudad elegida */
		document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name + "')"
	},

	/* funcón para funcionamiento de barra de búsqueda */
	search: function() {
		this.fetchWeather(document.querySelector(".search-bar").value);
	}
};

/* Funcionamiento del botón de búsqueda */

document.querySelector(".search button").addEventListener("click", function(){
		weather.search();

});

/* Toma búsqueda con Enter */
document.querySelector(".search-bar").addEventListener("keyup", function(event){
	if(event.key=="Enter") {
		weather.search();
	}
});

weather.fetchWeather("Buenos Aires");
