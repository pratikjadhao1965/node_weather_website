const request=require('request')
const geoLocation=(location,callback)=>{
    const uri="https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?access_token=pk.eyJ1IjoicHJhdGlramFkaGFvIiwiYSI6ImNrOWdsNTBjZzBtM2gzbGp3ZndnY244dm8ifQ.SEH4myx3MirXHupp6ZHb3w&limit=1"

request({uri,json:true},(error,{body}={})=>{
    if(error){
        callback("unable to connect network",undefined)
    }else if(body.features.length===0){
        callback("no matching result for search",undefined)
    }else{
    
    callback(undefined,{
        'latitude':body.features[0].center[1],
        'longitude':body.features[0].center[0],
        'location':body.features[0].place_name
        })
    }
})
}
module.exports={
    'geoLocation':geoLocation
}