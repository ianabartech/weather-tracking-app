
class Forecast{

    //change and put your api key in this.key or you can also use dotenv
    constructor(){
        this.key = 'aBSA8FJWy9yXDzEFDlE379T6ymJXZ7rC';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    }

    //This execute the two asynchronous function; getCity and getWeather to get
    //the actual weather of the selected city.
    async updateCity(userInputCity){
        const cityFrom = await this.getCity(userInputCity);
        const weatherFrom = await this.getWeather(cityFrom.Key);
    
        return {cityFrom, weatherFrom};
    };

    //This get the city data from the api, fetch it and get the response.
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    };

    //This get the weather data from the api, fetch it and get the response.
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    };
}
