import express from 'express'
// import cors from 'cors'
import dotenv from 'dotenv'
import listingRoutes from './routes/listingRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT
const app = express()
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials: true,
// }))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/listings', listingRoutes)
app.use('/api/users', userRoutes)


const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


app.listen(PORT)