const mysql = require("../mysql-server");

const uploadRider = async ( req,res) => {
    try{
        console.log("request recieved")
        const  raw  = req.body;
        console.log(req);
    } catch (err){
        console.log(err);
        res.status(500).json({error : err});
    }
}


module.exports = {
    uploadRider
}
