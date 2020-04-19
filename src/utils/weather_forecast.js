const r=require('request')
const weather_forecast=(long,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=a9ee52cef3d445428a926ae7ea4b0f05'+'&query='+lat+','+long
    r({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to network',undefined)

        }
        else if(response.body.error)
        {
            callback('unable to find weather',undefined)
        }
        else
        {
            const data={
                temp:response.body.current.temperature,
                feels_like:response.body.current.feelslike
            }
            callback(undefined,data)
        }
    })
}
module.exports=weather_forecast