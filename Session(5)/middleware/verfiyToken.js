const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']|| req.headers['Authorization'];
if(!authHeader){
    return res.status(401).json({ status: "error", message: "Token is required" }); 
}

    const token = authHeader.split(' ')[1];
try{ 
      const currentUser = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(`currentUser`,currentUser)
      req.currentUser=currentUser;

      next();
      
    }catch(err){
        return res.status(401).json({ status: "error", message: "Invalid Token" });
    }
    
    //console.log("token",token);
   // next(null, token);
}

module.exports = verifyToken;