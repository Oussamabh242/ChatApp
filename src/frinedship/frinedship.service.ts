import { Injectable } from '@nestjs/common';
import { CreateFrinedshipDto } from './dto/create-frinedship.dto';
import { UpdateFrinedshipDto } from './dto/update-frinedship.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrinedshipService {
 constructor(private readonly prisma : PrismaService){} 

  async findAll(id :string) {
    const frinedships = await this.prisma.friend.findMany({
      where : {
        OR : [
          {user1 : id} , 
          {user2 : id}
        ]
      } , 
      select : {
        sender : {
          select : {
            id : true ,
            fullName : true
          }
        } ,
        reciver : {
          select : {
            id :true , 
            fullName : true 
          }
        }
      }

    })  ; 
    let x = [] ;
    frinedships.forEach( (elm )=>{
      let obj ;
      if (elm.sender.id == id ) {
        obj = {
          friendID : elm.reciver.id ,
          fullName : elm.reciver.fullName
        }
      }else {
        obj = {
          friendID : elm.sender.id , 
          fullName : elm.sender.fullName
        }
      } 
      x.push(obj)
      
    })  
    return x  ;

      
  }

  

  

  
}
