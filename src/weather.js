const API_KEY = 'f578d5af4d16236c8f31a0808db12f43';

const form_input = document.querySelector('.form-group');
const value = document.querySelector('input[type="text"]');
const weather_condition = document.querySelector('#description');
const temperature_container = document.querySelector('.temperature-container');
const details_container = document.querySelector('.further-details');
const city_container = document.querySelector('#city-container');
const city_parent = document.querySelector('.city-data');
const temperature = document.getElementById('temperature');
const feelslike = document.getElementById('feelslike');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const error = document.querySelector('.error');

form_input.addEventListener('keypress', (e) =>{
    if (e.key === "Enter"){
        e.preventDefault();
        console.log('Form submitted!')
        let city_data = e.target.value
        pingWeatherAPI(city_data).catch((e) => render_error());
    }
})

function fades(){
    if (city_parent.classList.contains("fade-in2") && temperature_container.classList.contains("fade-in2") && details_container.classList.contains("fade-in2")){
        city_parent.classList.remove("fade-in2")
        temperature_container.classList.remove("fade-in2")
        details_container.classList.remove("fade-in2")  
    } 
    city_parent.offsetWidth;
    temperature_container.offsetWidth;
    details_container.offsetWidth;
    city_parent.classList.add("fade-in2");
    temperature_container.classList.add("fade-in2");
    details_container.classList.add("fade-in2");
    return;
    
}

function render_city_to_page(data_object){
    let weather_object = data_object;
    city_container.innerHTML = weather_object.name;
    return;
}

function render_temp_to_page(data_object){
    let weather_object_temp = data_object.main.temp;
    temperature_container.style.display = "flex";
    temperature.innerHTML = weather_object_temp;
    return;

}

function render_details_to_page(data_object){
    let weather_object_details = data_object
    let feels_like = weather_object_details.main.feels_like;
    let windy = weather_object_details.wind.speed;
    let humid = weather_object_details.main.humidity;
    details_container.style.display = "flex";
    feelslike.innerHTML = `Feels like: ${feels_like}`;
    wind.innerHTML = `Wind: ${windy} mph`;
    humidity.innerHTML = `Humidity: ${humid}%`;
    return;
}

function reset(){
    value.value = "";
    return;
}

function render_error(){
    return error.style.visibility = "visible";
}

function render_success(){
    return error.style.visibility = "hidden";
}


function render_weather_request(data){
    render_city_to_page(data);
    render_temp_to_page(data);
    render_details_to_page(data)
    fades()
    return reset();
}

async function pingWeatherAPI(city){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`);
        let status_code = response.status
        if (status_code === 400 || status_code === 404){
            throw new Error('Response invalid!')
        }
        let data = await response.json()
        render_success()
        return render_weather_request(data)
        
}


   