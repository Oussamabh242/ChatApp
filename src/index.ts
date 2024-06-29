import express, { Request, Response } from 'express';
import { router } from './routes/user.routes';
import dotenv from "dotenv" ; 
import bodyParser from "body-parser" ; 

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()) ; 


app.use("/users",router) ; 

app.get('/', (req: Request, res: Response) => {; 
  res.send('Hello, TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});