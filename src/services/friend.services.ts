import { prisma } from "../utils/_db";

type Friend = {
  friendId : String
  friendName : String
}

type FriendList = Friend[] ; 

export async function getFriends(userId : string):Promise<FriendList> {
  let friends = await prisma.friend.findMany({
    where : {
      OR : [
        {userId1 : userId} ,
        {userId2 : userId}
      ]
    },
    select : {
      userId2 : true, 
      userId1 : true , 
      user1 : {
        select : {
          id : true , 
          fullName : true
        }
      },
      user2 : {
        select : {
          id : true , 
          fullName : true
        }
      }
  }
  }) ; 

  let friendList : FriendList = []; 
  friends.forEach(elem => {
    let friend : Friend = {friendId : "", friendName: ""};
    if( elem.userId1 == userId) {
      friend.friendId = elem.userId2; 
      friend.friendName = elem.user2.fullName;
    }  
    else {
      friend.friendId = elem.userId1; 
      friend.friendName = elem.user1.fullName;
    }
    friendList.push(friend)
  });
  return friendList


  }

//function makeFriendList(arr : any ):FriendList{
//  let friends : FriendList = []; 
//  arr.forEach(elem => {
//    if elme. 
//  });
//  return friends
//}
