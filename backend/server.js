import dotenv from 'dotenv';
dotenv.config();
const PORT = 2000 || process.env.PORT;
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import users_router from './routes/users_router.js';
import connect_to_db  from './config/mongo_db_connection.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    credentials : true,
    origin : 'http://localhost:3000'
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
    res.locals.__dirname = __dirname;
    next();
});

app.use('/api/users',users_router);

connect_to_db()
.then(() => {
    console.log("Connected to database Pdf Signature DB");
    app.listen(PORT,()=>{
        console.log('Connected to server on PORT: ',PORT);
    });
}).catch((err) => {
   console.log(err);
});



