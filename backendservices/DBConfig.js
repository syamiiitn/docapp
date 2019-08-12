//importing mongo client
const mc=require('mongodb').MongoClient;
const url="mongodb+srv://yamini:yamini@cluster0-pbaxe.mongodb.net/test?retryWrites=true&w=majority"
var dbo;
function initdb(){
    mc.connect(url,{useNewUrlParser:true},
        (err,db)=>{
            if(err){
                console.log('error in connecting to db');
            }
            else{
                console.log('database connected...');
            dbo=db.db("docApp");
            }
            
        });
}
function getdb(){
    console.log("dbo intailized")
    return dbo;
}
module.exports={
    getdb,
    initdb
};