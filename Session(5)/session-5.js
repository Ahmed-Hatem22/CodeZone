const express=require(`express`);

const app=express();
const cors=require('cors');
require(`dotenv`).config();

const url=process.env.Mongo_URL;
//console.log(url);

const mongoose = require('mongoose');
mongoose.connect(url).then(()=>{
    console.log('Connected to MongoDB')
});
app.use(cors());
app.use(express.json());

const coursesRouter =require(`./routes/courses-route`);
const usersRouter =require(`./routes/user-route`);

app.use(`/api/courses`,coursesRouter) ;
app.use(`/api/users`,usersRouter) ;

//global middelware for not found routes
app.all(`*`,(req, res,next)=>{
    res.status(404).json({ status: 'error', });  // 404 Not Found
})
//global error handler
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({ status: 'error',message:error.message,code:error.statusCode||500,data:null});
})

var port= 3000;

app.listen(port, () => {
    console.log('Server is running on port '+port);
    //console.log ("Server is running on port4000");
});
