const path = require('path')
const mapBox =  require('./utils/mapBox')
const forcast = require('./utils/forcast')
const express = require('express')
const hbs = require('hbs')

//define Path for Express Config 
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsDirectoryPath = path.join(__dirname , '../templates/views')
const parthialDirectoryPath = path.join(__dirname , '../templates/partials')
const app = express()
const port = process.env.PORT || 3000

// set up handle bars engine and views location
app.set('view engine' , 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(parthialDirectoryPath)

// set up static directory to serve
 app.use(express.static(publicDirectoryPath))

 app.get('' , (request , response)=> {

    response.render('index'   , {
        title : 'Weather App ' ,
        name : 'Wesam Khallaf'
    })
})

    app.get('/about' , (request , response)=> {

        response.render('about' , {
            title : 'about me' ,
            name : 'Wesam Khallaf'
        } ) }
    )

    app.get('/help' , (request , response)=> {

        response.render('help' , {
            title : 'Dynamic help page' ,
            data : 'lorumipsum lorumipsum lorumipsum lorumipsum lorumipsum lorumipsum' ,
            name:'Wesam Khallaf'
        } ) }
    )






app.get('/weather' , (request , response) => {


    if(!request.query.address) {
        return response.send( {
             error :'you must provide address '
         }
 
     )}
 
 
     console.log(request.query.address)

     mapBox.findGeoData (request.query.address , (error , data)=> {

        if (error) {
           return  response.send({
                error
            })
            

        }
        

        forcast.updateUrl(data , (error , weatherData)=>{

            if( error) {
                return  response.send({
                    error
                })
            }
            
           // console.log('It is currently' +  weatherData.tempreture + ' and it feels like :' + weatherData.feelslike)
           // console.log ('weather description   is  :'  +   weatherData.weather_description )
           // console.log('chance of rain is :' + weatherData.chanceOfRain)



 response.send({ 
                location : request.query.address ,
                lattitude : data.lattitude ,
                longitude : data.longitude , 
                degree : weatherData.temperature ,

                weather_description :weatherData.weather_description ,
                feels_like : weatherData.feelslike , 
                ChanceOfRain : weatherData.chanceOfRain ,
                city : weatherData.city ,
                windDirection :weatherData.windDirection  ,
                windSpeed : weatherData.windSpeed




                
            })




            
        }    )


           
        

     })

    

})





app.get('/help/*' , (request , response) => {

    response.render('404' , {
        title : '404' ,
        errorMessage : '  this article not found' , 
        name : ' Wesam Khalalf'

    })
})

app.get('*' , (request , response) => {

    response.render('404' , {
        title : '404' ,

        errorMessage : ' This page does not exist ' ,
        name : ' Wesam Khalalf'
    })

})


app.listen(port  , () => {
    console.log(' server is up in port '+ port)
})