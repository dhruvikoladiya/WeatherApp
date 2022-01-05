const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

const publicdirpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../template/views')
const partialspath=path.join(__dirname,'../template/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirpath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Andrew Mead'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'user'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helptext:'This is some help text.',
        title:'Help',
        name:'User'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
        
        res.send({
            forecast: forecastdata,
            location,
            address: req.query.address
        })
    })
    })
    
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'user',
        msg:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'user',
        msg:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})