import jwt from 'jsonwebtoken'
import db from '../config/mongoConfig.js'
import { ObjectId } from 'mongodb'
export default function verifyUserAuth(req, res, next, tokenArg=null) {
    const token = req.cookies.token || tokenArg
    if(!token) {
        res.status(401).json({message: 'Unauthorized action'})
    }else {
        jwt.verify(token, process.env.TOKEN_KEY, async(err, data)=>{
            if(!err) {
                let user = await db.collection('users').findOne({_id: new ObjectId(data.id)})
                if(user){
                    if(!req.body.verify){
                        req.user = user
                        next()
                    }else{
                        res.status(200).json({message: "authenticated"})
                    }
                }else {
                    res.status(500).json({message: 'User not found'})
                }
            }else {
                res.status(401).json({message: 'token expired'})
            }
        })
    }
}