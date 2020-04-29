const request=require('request')
const forecast=(lat,long,callback)=>{

const url="http://api.weatherstack.com/current?access_key=d496c33c208520be0077fbff2dbcbcc9&query="+lat+","+long+"&units=m"
    request({ url ,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connet to network',undefined)
        }else if(body.error){
            callback("incomplete request made",undefined)
        }else{
            callback(undefined,body.current.weather_descriptions+".\ncurrently it is "+body.current.temperature+" degrees.but it feels like "+body.current.feelslike+" degrees out")
        }
    })
}
module.exports={
    "forecast":forecast
}
