# สร้าง Back-End
- mkdir server & cd server
- npm i -g nodemon
- npm init -y
- npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
- ใน package.json
  - "type": "module", (ต่อจาก main) //แก้ error
  - "dev": "nodemon index.js"
- สร้างไฟล์ index.js
    import express from 'express';
    import bodyParser from 'body-parser';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import multer from 'multer';
    import helmet from 'helmet';
    import morgan from 'morgan';
    import path from 'path';
    import { fileURLToPath } from 'url';

    // CONFIGURATION
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    dotenv.config()
    const app = express()
    app.use(express.json())
    app.use(helmet())
    app.use(helmet.crossOriginEmbedderPolicy({ policy: "cross-origin" }))
    app.use(morgan("common"))
    app.use(bodyParser.json({ limit: "30mb", extended: true }))
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
    app.use(cors())
    app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

    // FILE STORAGE
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "public/assets")
        },
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage })
    ----------------------------------

- create mongodb
  - สร้างไฟล์ .env
    PORT = 3001 //front-end

- สร้างโฟลเดอร์ build/assets เพื่อใช้ในการเก็บเว็บ (ลูกของ server)

**************************
app.use(bodyParser.json({ extended: true })) 
คือ ปกติมันจะ handle อยู่ใน type ของ string / array
แต่ถ้า extended: true คือ เอาทุก type ข้อมูล
**************************

- ทำการเชื่อมต่อฐานข้อมูล mongodb atlas และ mongodb compass
- file post.json / user.json ในโฟลเดอร์ data

## วิธีเชื่อต่อฐานข้อมูลเข้ากับ Back-End
- copy path จาก mongodb atlas ไปวางใน .env  
  -> MONGO_URL = mongodb+srv://dtctrd:<password>@cluster0.mntf6gr.mongodb.net/?retryWrites=true&w=majority