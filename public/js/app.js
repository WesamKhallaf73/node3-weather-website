console.log('client side java script file loaded')




const weatherForm = document.querySelector('form')
const search = document.querySelector('Input')
const messageOne  = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')
const messageThree  = document.querySelector('#message-3')
const messageFour  = document.querySelector('#message-4')
const messageFive  = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')


weatherForm.addEventListener('submit' , (e)=> {     // e for event  
    e.preventDefault() // this will prevent the form from clearing or resetting consol after submitting
    console.log('form submitted')
    console.log('you are searched  weather for ' + search.value)
    messageOne.textContent = 'loading .... '
    messageTwo.textContent =''
    messageThree.textContent =''
    messageFour.textContent =''
    messageFive.textContent =''
    messageSix.textContent =''

    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data)=>{  //data recieved from back end node server
            if (data.error) {
               return  messageOne.textContent = data.error 
               
               
            }

           // console.log(weatherData)
            console.log(data.degree)
            console.log(data.feels_like)
            console.log(data.location)
            console.log(data.weather_description)
            console.log(data.ChanceOfRain)
            console.log(data.lattitude)
            console.log(data.longitude)

            messageOne.textContent = " location : " +  data.city 
            messageTwo.textContent =  " Temprature : " + data.degree + " degree and  it feels like  " + data.feels_like +" degree "
            messageThree.textContent ="it is " + data.weather_description
           
            messageFour.textContent ="  and chance of rain is " + data.ChanceOfRain
            messageFive.textContent ='wind speed is ' + data.windSpeed
            messageSix.textContent ='wind direction is  ' + data.windDirection
        

           
           // console.log('feels like   ' + weatherData.feelslike)
           // console.log(" weather_description is  : " + weatherData.weather_description)
           // console.log(" chancee Of Rain" + weatherData.chanceOfRain)

        //    location : request.query.address ,
        //    lattitude : data.lattitude ,
        //    longitude : data.longitude , 
        //    degree : weatherData.temperature ,

        //    weather_description :weatherData.weather_description ,
        //    feels_like : weatherData.feelslike , 
        //    ChanceOfRain : weatherData.chanceOfRain


    
        })
    
    })



})