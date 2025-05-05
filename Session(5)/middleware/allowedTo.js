module.exports =(...role)=>{

    return(req,res,next)=>{
        if(!role.includes(req.currentUser.role)){
            return next(console.error(`this role is not authorized`,401)
            )
        }
        next ();
    }
}