const express=require("express")
const path=require("path")
const hbs=require("hbs")
const geoLocation=require('./utils/geoLocation')
const forecast=require('./utils/forecast.js') 
//create app instance
const app=express()
const pirt=process.env.PORT || 3000

//to setup pathsn for express config
const publicDirPath=path.join(__dirname,"../public")
const viewPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials") 

//setup handle engine and views location
app.set('view engine','hbs')
app.set("views",viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirPath))
// app.get("",(req,res)=>{
//     res.send("hello everyone")
// })



app.get("",(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"pratik"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"pratik"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        helpText:"my help page",
        name:"pratik"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"adress needed"            
        })
    }

    geoLocation.geoLocation(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
            //console.log('data:',data)
        forecast.forecast(latitude,longitude, (error, forecastData=undefined) => {
            if(error){
            return res.send({
                error:error
            })
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
          })
    })

    
})

app.get("/help/*",(req,res)=>{
    res.render('error404',{
        title:"Error",
        name:"pratik",
        message:"help article not found"
    })
})
app.get("*",(req,res)=>{
    res.render('error404',{
        title:"Error",
        name:"pratik",
        message:"my error 404 page"
    })
})

app.listen(port,()=>{
    console.log("server is up on port:"+port)
})