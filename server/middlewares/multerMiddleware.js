import multer from "multer";
import { cloudinaryConfig, uploader } from "../config/cloudinaryConfig.js";

// for storing locally or on a server with storageaccess
// const storage = multer.diskStorage({
//     destination: function(req, file, callback){
//         return callback(null, 'server/images')
//     },

//     filename: function(req, file, callback){
//         return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// for thirdpary storage like mongodb-blob or cloudinary
const storage = multer.memoryStorage()

export default async function getImageUrl (req) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const data = await uploader.upload(dataURI)
    return data.url
}

export const uploadFile = multer({storage}).single('file')
