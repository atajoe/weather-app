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
console.log(city_container);

form_input.addEventListener('keypress', (e) =>{
    if (e.key === "Enter"){
        e.preventDefault();
        console.log('Form submitted!')
        let city_data = e.target.value
        pingWeatherAPI(city_data).catch((e) => console.log(e));
    }
})

// city_container.classList.add('fade-in2')
// console.log(city_container.classList)
// console.log(form_input)


function fades(){
    if (city_parent.classList.contains("fade-in2")){
        city_parent.classList.remove("fade-in2")
        city_parent.classList.add("fade-in")
    
    } else if (city_parent.classList.contains("fade-in"))
        city_parent.classList.remove("fade-in")
        city_parent.classList.add("fade-in2")
    
}

function render_city_to_page(data_object){
    let weather_object = data_object;
    let temp = weather_object.main.temp;
    let feelslike = weather_object.main.feels_like;
    let windy = weather_object.wind.speed;
    let humid = weather_object.main.humidity;
    city_container.innerHTML = weather_object.name;
    render_temp_to_page(temp);
    render_details_to_page(feelslike,windy,humid);
    return;
}

function render_temp_to_page(temp){
    temperature_container.style.display = "flex";
    temperature.innerHTML = temp;
    return;

}

function render_details_to_page(feels_like,windy,humid){
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
async function pingWeatherAPI(city){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`);
    


    let data = await response.json();
    console.log(data);
    render_city_to_page(data);
    console.log('This is the temperature: ', data.main.temp);
    reset();

    return 'All Done!';





}

// pingWeatherAPI('San Diego').catch((e) => console.log(e));

   