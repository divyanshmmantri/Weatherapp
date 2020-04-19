const r=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + ' .json?access_token=pk.eyJ1IjoiMThiY2UwOTU3IiwiYSI6ImNrOHZsdW81MjAxZmYzbG50M3pjdTJlcDcifQ.I4tMO_bXrOhe8jxnKxWPSg'
    r({url:url,json:true},(error,response)=>{
        if(error)
       {
        callback('Unable to connect to network',undefined)
       }
       else if(response.body.features.length===0){
         callback('Unable to find place',undefined)
       }
       else{
              const data={
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
              }
              
              callback(undefined,data)
          
       }
       
    })
}
module.exports=geocode