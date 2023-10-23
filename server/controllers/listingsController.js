import db from "../config/mongoConfig.js"
import { ObjectId } from "mongodb"
import getImageUrl from "../middlewares/multerMiddleware.js"

function getAllListings (req, res) {
    db.collection('listings').find({}).sort({"createdAt": -1}).toArray()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(500).json({error: err})
    })
}

function getListingById (req, res) {
    db.collection('listings').findOne({_id: new ObjectId(req.params.id)})
    .then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        if(err)
        res.status(404).json({err})
    })
}

async function addListing (req, res) {
    const imgUrl = await getImageUrl(req)
    db.collection('listings').insertOne({...req.body, img: imgUrl, createdAt: Date.now()}).then(data=>{
        res.status(201).json(data)
    })
}

async function editListing (req, res) {
    let recievedData = {...req.body}
    if(req.file){
        var imgUrl = await getImageUrl(req)
        recievedData.img = imgUrl
    }else{
        delete recievedData.file
    }
    db.collection('listings').updateOne({_id: new ObjectId(req.params.id)}, { $set: {...recievedData}}).then(data=>{
        //for removing delete image from file system(disk storage)
        // req.file && fs.unlink(`server/images/${req.body.prevImg}`, ()=>{})
        res.status(200).json(data)
    })
}

function deleteListing (req, res) {
    db.collection('listings').deleteOne({_id: new ObjectId(req.params.id)}).then(data=>{
        res.status(200).json(data)
    })
}

export {
    getAllListings,
    getListingById,
    addListing,
    editListing,
    deleteListing,
}