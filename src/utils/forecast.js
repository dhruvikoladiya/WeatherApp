const request=require('postman-request')

// const forecast=(longitude,latitude,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=847b54de2491502d6f6ca7447dfa5ae8&query='+latitude+','+longitude+'&units=f'
//     request({url: url,json: true},(error,response)=>{
//         if(error){
//             callback('Unable to connect weather service!.',undefined)
//         }else if(response.body.error){
//             callback('Unable to find data!.',undefined)
//         }else{
//             callback(undefined,response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feelslike ' + response.body.current.feelslike + ' degrees out.')
//         }
//     })
// }

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=847b54de2491502d6f6ca7447dfa5ae8&query='+latitude+','+longitude+'&units=f'
    request({ url,json: true},(error, { body }={})=>{
        if(error){
            callback('Unable to connect weather service!.',undefined)
        }else if(body.error){
            callback('Unable to find data!.',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feelslike ' + body.current.feelslike + ' degrees out.wind_speed is ' + body.current.wind_speed)
        } 
    })
}

module.exports=forecast