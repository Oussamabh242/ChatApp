import { Request, Response } from "express";

import {getFriends} from "../services/friend.services"


export const listFriends = async (req: Request, res: Response) => {


  const userId = res.locals.user ;
  console.log(userId)
  const friends = await getFriends(userId) ;
  return res.send(friends)
    
};



