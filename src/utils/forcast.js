const request = require('request')





const  updateUrl = (data , callback) => {

  // access token for wesamkhallaf@yahoo.com is : 44712d197b6415a31200d37566db2930
  // access token for wesamkhallaf@gmail.com is :5b1748aab43679fd017b58ff601b1b32

  
var url ='http://api.weatherstack.com/current?access_key=44712d197b6415a31200d37566db2930&query='
    

url = url + data.lattitude + ',' + data.longitude
console.log(url)
request({url : url , json :true } , (error , response) => {
    
   
    if (error) {
       console.log("unable to connect to weatherstack service")
       callback('unable to connect to weatherstack service' , undefined)


    }

    else if (response.body.error   ) {
      // console.log('unable to find weather info')
       callback('unable to find weather info' , undefined)

   }
    else {
        

   const temperature = response.body.current.temperature
   const feelslike =  response.body.current.feelslike
   const weather_description = response.body.current.weather_descriptions[0]
   const chanceOfRain =  response.body.current.precip
  // const city = response.body.request.query
   const city = response.body.location.name + "  " + response.body.location.country  + "  " + response.body.location.region

   
   
   
   //console.log(city )

   //console.log(temperature)
    //console.log(feelslike)
    //console.log(weather_description)
    //console.log(chanceOfRain)


   
    weather_data = {
      temperature : temperature  ,
        feelslike  ,
        weather_description  , 
        chanceOfRain  , 
        city

    }
 
    callback( undefined , weather_data)
  }

})



}



module.exports = {
    updateUrl : updateUrl 
   

}