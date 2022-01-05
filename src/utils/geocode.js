const request=require('postman-request')

// const geocode=(address, callback)=>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGhydXZpa29sYWRpeWExIiwiYSI6ImNrd2czZzE1YjBrcGsyeG1vZTRtajkwbTUifQ.Fe5_0hFR-00YAzdasQdmcw&limit=1'
//     request({url: url, json: true},(error,response)=>{
//         if(error){
//             callback('unamble to connect location service!', undefined)
//         }else if(response.body.features.length === 0){
//             callback('Unable to find location! Try another search..', undefined)
//         }else{
//             const longitude=response.body.features[0].center[0]
//             const latitude=response.body.features[0].center[1]
//             const location=response.body.features[0].place_name
//             callback(undefined,{
//                 longitude : longitude,
//                 latitude : latitude,
//                 location : location
//             })
//         }
//     })
// }

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGhydXZpa29sYWRpeWExIiwiYSI6ImNrd2czZzE1YjBrcGsyeG1vZTRtajkwbTUifQ.Fe5_0hFR-00YAzdasQdmcw&limit=1'
    request({ url, json: true},(error, { body }={})=>{
        if(error){
            callback('unamble to connect location service!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location! Try another search..', undefined)
        }else{
            const longitude=body.features[0].center[0]
            const latitude=body.features[0].center[1]
            const location=body.features[0].place_name
            callback(undefined,{
                longitude : longitude,
                latitude : latitude,
                location : location
            })
        }
    })
}


module.exports=geocode