const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    //creating local variable for convenient

    console.log(data);


    //destructure properties
    const {cityFrom, weatherFrom} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityFrom.EnglishName}</h5>
        <div class="my-3">${weatherFrom.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherFrom.Temperature.Metric.Value}</span>
            <span>&deg;</span>
        </div>
    `;

    //update the nigh/day & icon images
    const iconSrc = `img/icons/${weatherFrom.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weatherFrom.IsDayTime ? 'img/day.svg': 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //remove d-none (bootstrap) class if present;
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const userInputCity = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(userInputCity)
    .then(data => updateUI(data))
    .catch((err)=> {
        console.log(err);
    });

    //set local storage
    localStorage.setItem('city', userInputCity);

});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => {
            updateUI(data);
        })
        .catch(err => console.log(err));
}

