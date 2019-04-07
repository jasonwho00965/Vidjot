const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride=require('method-override');
const path = require('path');
const app = express();

//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Map global primise - get rid of warning
mongoose.Promise = global.Promise;
//connet to mongodb

mongoose.connect('mongodb://localhost/vidjot-dev',{
    useNewUrlParser: true
})
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

//Method override middleware
app.use(methodOverride('_method'));

//Static folder
app.use(express.static(path.join(__dirname,'public')));

const port = 5000;

app.engine('handlebars', exphbs({defaultLayout:'main'}));

app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())




app.get('/', (req,res)=>{
    console.log(req.name);
    res.render('index');
});



app.get('/about',(req,res)=>{
    const title = 'welcome';
    res.render('about',{
        title:title
    });
});





app.use('/ideas',ideas);
app.use('/users',users);

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});
