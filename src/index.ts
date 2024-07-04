import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.routes';
import dotenv from "dotenv" ; 
import bodyParser from "body-parser" ; 
import cors from "cors" ;
import cookieParser from "cookie-parser" ;
import { requestRouter } from './routes/request.routes';
import {prisma} from './utils/_db' ; 


const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version' , 
  ],
  exposedHeaders: ['refreshtoken', 'Authorization'] ,
  
  credentials: true 
};



dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()) ; 
app.use(cors(corsOptions)) ; 
app.use(cookieParser()) ; 

app.use("/users",userRouter) ; 
app.use("/requests" , requestRouter) ; 

app.get('/', (req: Request, res: Response) => {; 
  res.send('Hello, TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Connected to the database') ; 
});