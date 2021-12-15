const request = require('request')





const findGeoData = (city , callback ) => {


    const mapBoxAccessToken = 'pk.eyJ1Ijoid2VzYW1raGFsbGFmIiwiYSI6ImNrd25lZDFucTAzb3Ayd3BudmJjNGJmNDUifQ.RbFqc0VMHr4DTf0mL3WlMw'

const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(city)+'.json?access_token='+ mapBoxAccessToken

  

request({url : mapBoxUrl , json :true } , (error , response) => {
    
   

     if (error) {

     
        callback('unable to connect to geolocation mapBox service ' , undefined)
        


     }
     else if (response.body.error   || response.body.features.length == 0) {
        callback('unable to find location of this city , try another search  !' , undefined)

     }
     else {
    const lattitude = response.body.features[0].geometry.coordinates[1]
    const longitude = response.body.features[0].geometry.coordinates[0]
    const placeName =  response.body.features[0].place_name

     console.log(lattitude)
     console.log(longitude)

    callback(undefined , { longitude : longitude , lattitude : lattitude , placeName: placeName})
    }


    

})
}









module.exports = {
    findGeoData : findGeoData 
   

}





