import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATION จัดการ Traffic ต่างๆ ให้อยู่ในรูปของ format ที่เราต้องการ เพราะว่าเวลาที่ข้อมูลวิ่งมา มันจะอยู่ในรูปแบบของ stream / data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(bodyParser.json({ extended: true })); //แปลงตัวซิ้งข้อมูลให้อยู่ในรูปแบบ json object / ปกติมันจะ handle อยู่ใน type ของ string, array แต่ถ้า extended: true คือ เอาทุก type ข้อมูล
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); //จัดการ security ในส่วนของ render เวลาเรา response ออกไป
app.use(morgan()); //ใช้ในการเก็บ logs
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //เปิดใช้งานให้มัน cross origin กันได้
app.use(cors());//เปิดใช้งาน cross origin
const buildPath = path.join(__dirname, "build")// โฟลเดอร์ที่ใช้เป็นตัวเว็บ
app.use(express.static(buildPath));


// FILE STORAGE
const storage = multer.diskStorage({ //multer ตัวจัดการการเก็บไฟล์
  destination: (req, file, cb) => {
    cb(null, "build/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log(`Server Prot: ${PORT}`)
})

//MONGOOSE SETUP
// const PORT = process.env.PORT || 6001;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Prot: ${PORT}`));
//   })
//   .catch((error) => console.log(`${error} did not connect`));
