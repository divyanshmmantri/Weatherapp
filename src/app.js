const path=require('path')
const express =require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const weather_forecast=require('./utils/weather_forecast')
const port=process.env.PORT || 3000
// for paths
const pathd=path.join(__dirname,'../public')
const path2=path.join(__dirname,'../temp')
const partial_path=path.join(__dirname,'../temp/partials')
//
// for handlers
app.set('view engine','hbs')
app.set('views',path2)
hbs.registerPartials(partial_path)

//
// for static web pages
app.use(express.static(pathd))
//
// app.get('',(req,res)=>{
//     res.send('Hello world!')


// })
// app.get('/help',(req,res)=>{
//     res.send('Help!')
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1 style="text-align:center">CONTACTS</h1>')
    
// })
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        owner:'Created by Divyansh'
    })
       
    
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page for weather app',
        owner:'Created by Divyansh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        res.send({
            error:'You should enter address'
        })
    }
    else{
        geocode(req.query.address,(error,data)=>{
            if(error)
            {
                res.send({
                    error:error
                })
            }
            else{
                weather_forecast(data.longitude,data.latitude,(error,tdata)=>{
                    if(error){
                        res.send({
                            error:error
                        })
                    }
                    else{
                        res.send({
                            location:data.location,
                            temperature:tdata.temp,
                            feels_like:tdata.feels_like
                        })
                    }
                })
            }
        })
        

    }
})
app.get('*',(req,res)=>{
    res.send('page not found')
})
app.listen(port,()=>{
    console.log('server is set ')
})