const express = require('express');

//used in 11 line path.join
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./model/contact')

const app = express();

//Set EJS as templating engine
app.set('view engine', 'ejs');
//looks for folder views in current directory
app.set('views', path.join(__dirname, 'views'));

//parser middleware
app.use(express.urlencoded());

//using static files and look for folder assets
app.use(express.static("assets"));

var contactList = [{
        name: "a",
        phone: "123"
    },
    {
        name: "a2",
        phone: "1232"
    },
    {
        name: "a3",
        phone: "12322"
    }
]

app.get('/', function (req, res) {
    //returning index.ejs file feom view folder
    Contact.find({}).then((data)=>{
        return res.render("index", {
            title: "my contacts-list",
            contact_List: data
        });
    })
    .catch(err=>{
        console.log("error in finding")
    })
    
})

app.get('/practice', function (req, res) {
    //returning index.ejs file feom view folder
    return res.send('<h1>Practice</h1>')
})

app.post('/create-contact', function (req, res) {
    // return res.redirect('/practice')
    //when data is send from form to server it is encoded and its string to decode and convert it to object we need parser
    ////parser middleware
    //app.use(express.urlencoded()); due to this
    // console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then((data) => {
        console.log("********", data)
        return res.redirect("back");
    })
})

app.get('/delete-contact', function (req, res) {
    // console.log(req.query);
    //{phone:123}
    //get the id from query in the url

    let id =  req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id).then((data)=>{
       console.log("deleted");
       return res.redirect("back");
    })
    .catch((err)=>{
        console.log('err in deleting obejct')
        return;
    })

    //find the contact in the database using id and delete it
    //params are  /user/10
    //query are /user/?phone=10
    
    
    //123

})


app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(port);
})