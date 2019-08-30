let rover1 = {
  name:"rover1",  
  direction: "N",
  x:0,
  y:0,
  travelLog: [{x:0,y:0}],
   };

let rover2 = {
    name:"rover2",
    direction: "S",
    x:1,
    y:1,
    travelLog: [{x:1,y:1}],
     };

let obstacles = [
    {x:0,
    y:2},
    
    {x:2,
    y:0},
    
    {x:3,
    y:3}];


function turnLeft (robot){
  switch (robot.direction) {
    case "N":
      robot.direction = "W";
      break;
    case "W":
      robot.direction = "S";
      break;
    case "S":
      robot.direction = "E";
      break;
    case "E":
      robot.direction = "N";
      break;
  }
  console.log(`turnLeft was called! ${robot.name} is now facing ${robot.direction}`);

}

function turnRight(robot) {
  switch (robot.direction) {
    case "N":
      robot.direction="E";
      break;
    case "E":
      robot.direction="S";
      break;
    case "S":
      robot.direction="W";
      break;
    case "W":
      robot.direction="N";
      break;
  }
  console.log(`turnRight was called! ${robot.name} is now facing ${robot.direction}`);
}

//====================== without obstacle and without other robot ============================

function moveForward(robot){
  console.log("moveForward was called !");

  if (robot.direction === "N" && robot.y>0) {
    robot.y--;
  } else if (robot.direction === "W" && robot.x>0) {
    robot.x--;
  } else if (robot.direction === "S"&& robot.y<9) {
    robot.y++;
  } else if (robot.direction === "E"&& robot.x<9) {
    robot.x++;
  } else { console.log (`${robot.name} can't move forward, it's the grid boundary`);}
  
  console.log(`${robot.name}’s coordinates are : x=${robot.x}, y=${robot.y}`);

  let newPosition= {x:robot.x,
                    y:robot.y};

  robot.travelLog.push(newPosition);
       
  for(let i=0; i< robot.travelLog.length; i++){
    console.log(`the spaces the ${robot.name} has traveled over are ${i} ==> x=${robot.travelLog[i].x}, y=${robot.travelLog[i].y}`);
    }
  }

  
  
function moveBackward(robot){
  console.log("moveBackward was called !");

  if (robot.direction === "N" && robot.y<9) {
    robot.y = robot.y+=1;
  } else if (robot.direction === "W" && robot.x<9) {
    robot.x = robot.x+=1;
  } else if (robot.direction === "S"&& robot.y>0) {
    robot.y = robot.y-=1;
  } else if (robot.direction === "E"&& robot.x>0) {
    robot.x = robot.x-=1;
  } else { console.log (`${robot.name} can't move backward, it's the grid boundary`);}
  
  console.log(`${robot.name}’s coordinates are : x=${robot.x}, y=${robot.y}`);

  let newPosition= {x:robot.x,
                    y:robot.y};

  robot.travelLog.push(newPosition);

  for(let i=0; i< robot.travelLog.length; i++){
    console.log(`the spaces ${robot.name} has traveled over are ${i} ==> x=${robot.travelLog[i].x}, y=${robot.travelLog[i].y}`);

  }
}

function commandList(command,robot) {
  for (i = 0; i < command.length; i++) {
    if (command[i]== "l") {
      turnLeft(robot);
    } else if (command[i]=="r") {
      turnRight(robot);
    } else if (command[i]=="f") {
      moveForward(robot);
    }
      else if (command[i]=="b") {
      moveBackward(robot);
    } else { 
        console.log("command is no valid");
     }
    }
  }
  

//====================== with obstacles ============================



function moveForwardWithObstacles (robot) {
  let blockingObstacles = 0
  
  for (let i = 0; i< obstacles.length; i++) {
   if ((robot.direction === "N" && robot.x===obstacles[i].x && robot.y===obstacles[i].y+1) || (robot.direction === "E" && robot.y===obstacles[i].y && robot.x===obstacles[i].x-1) || (robot.direction === "S" && robot.x===obstacles[i].x && robot.y===obstacles[i].y-1) || (robot.direction === "W" && robot.y===obstacles[i].y && robot.x===obstacles[i].x+1)) {
   
   blockingObstacles++;
  
  } else {
     continue;
  }
}

if (blockingObstacles===0) {
  moveForward(robot)

} else {console.log (`${robot.name} can't move forward there's an obstacle`); }

}



function moveBackwardWithObstacles (robot) {
  let blockingObstacles = 0
  
  for (let i = 0; i< obstacles.length; i++) {
   if ((robot.direction === "S" && robot.x===obstacles[i].x && robot.y===obstacles[i].y+1) || (robot.direction === "W" && robot.y===obstacles[i].y && robot.x===obstacles[i].x-1) || (robot.direction === "N" && robot.x===obstacles[i].x && robot.y===obstacles[i].y-1) || (robot.direction === "E" && robot.y===obstacles[i].y && robot.x===obstacles[i].x+1)) {
   
   blockingObstacles++;
  
  } else {
     continue;
  }
}

if (blockingObstacles===0) {
  moveBackward(robot)

} else {console.log (`${robot.name} can't move backward there's an obstacle`); }

}

function commandListWithObstacles(command,robot) {
  for (i = 0; i < command.length; i++) {
    if (command[i]== "l") {
      turnLeft(robot);
    } else if (command[i]=="r") {
      turnRight(robot);
    } else if (command[i]=="f") {
      moveForwardWithObstacles(robot);
    }
      else if (command[i]=="b") {
      moveBackwardWithObstacles(robot);
    } else { 
        console.log("command is no valid");
     }
    }
  }

//============with an other Rover=====================

function moveForwardWithAnotherRobot (robot) {
  let theRobot;
  let otherRobot;

  switch(robot){
    case rover1:
      theRobot=rover1;
      otherRobot=rover2;
    break;
    
    case rover2:
       theRobot=rover2;
       otherRobot=rover1
    break; 
    }
  
  if ((theRobot.direction === "N" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y+1) || (theRobot.direction === "E" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x-1) || (theRobot.direction === "S" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y-1) || (theRobot.direction === "W" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x+1)) {
   
      console.log (`${theRobot.name} can't move forward ${otherRobot.name} is already in this place`);
    
    } else {
       moveForward(theRobot);
    }
  
}

function moveBackwardWithAnotherRobot (robot) {
  let theRobot;
  let otherRobot;

  switch(robot){
    case rover1:
      theRobot=rover1;
      otherRobot=rover2;
    break;

    case rover2:
       theRobot=rover2;
       otherRobot=rover1
    break; 
    }
  
  if ((theRobot.direction === "S" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y+1) || (theRobot.direction === "W" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x-1) || (theRobot.direction === "N" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y-1) || (theRobot.direction === "E" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x+1)) {
   
      console.log (`${theRobot.name} can't move forward ${otherRobot.name} is already in this place`);
    
    } else {
       moveBackward(theRobot);
    }
  
}

function commandListWithAnOtherRobot(command,robot) {
  for (i = 0; i < command.length; i++) {
    if (command[i]== "l") {
      turnLeft(robot);
    } else if (command[i]=="r") {
      turnRight(robot);
    } else if (command[i]=="f") {
      moveForwardWithAnotherRobot (robot);
    }
      else if (command[i]=="b") {
        moveBackwardWithAnotherRobot (robot);
    } else { 
        console.log("command is no valid");
     }
    }
  }

//============with an other robot and obstacles=====================

function moveForwardWithAnotherRobotAndObstacles (robot) {
  let theRobot;
  let otherRobot;
  let blockingObstacles = 0;
  let blockingRobot = 0;
    
  switch(robot){
    case rover1 :
      theRobot=rover1;
      otherRobot=rover2;
    break;
    
    case rover2 :
       theRobot=rover2;
       otherRobot=rover1
    break; 
    }
  
    for (let i = 0; i< obstacles.length; i++) {
      if ((theRobot.direction === "N" && theRobot.x===obstacles[i].x && theRobot.y===obstacles[i].y+1) || (theRobot.direction === "E" && theRobot.y===obstacles[i].y && theRobot.x===obstacles[i].x-1) || (theRobot.direction === "S" && theRobot.x===obstacles[i].x && theRobot.y===obstacles[i].y-1) || (theRobot.direction === "W" && theRobot.y===obstacles[i].y && theRobot.x===obstacles[i].x+1)) {
      
      blockingObstacles++;
     
     } else {
        continue;
     }
   }
   
   if ((theRobot.direction === "N" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y+1) || (theRobot.direction === "E" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x-1) || (theRobot.direction === "S" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y-1) || (theRobot.direction === "W" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x+1)) {
   
    blockingRobot++;
          
  } 
  
  if (blockingObstacles===0 && blockingRobot===0) {

    moveForward(theRobot)
   
   } else {console.log (`${robot.name} can't move forward there's an obstacle or the other robot`); }
   
   }
    
  
   function moveBackwardWithAnotherRobotAndObstacles (robot) {
    let theRobot;
    let otherRobot;
    let blockingObstacles = 0;
    let blockingRobot = 0;
      
    switch(robot){
      case rover1 :
        theRobot=rover1;
        otherRobot=rover2;
      break;
      
      case rover2 :
         theRobot=rover2;
         otherRobot=rover1
      break; 
      }
    
      for (let i = 0; i< obstacles.length; i++) {
        if ((theRobot.direction === "S" && theRobot.x===obstacles[i].x && theRobot.y===obstacles[i].y+1) || (theRobot.direction === "W" && theRobot.y===obstacles[i].y && theRobot.x===obstacles[i].x-1) || (theRobot.direction === "N" && theRobot.x===obstacles[i].x && theRobot.y===obstacles[i].y-1) || (theRobot.direction === "E" && theRobot.y===obstacles[i].y && theRobot.x===obstacles[i].x+1)) {
        
        blockingObstacles++;
       
       } else {
          continue;
       }
     }
     
     if ((theRobot.direction === "S" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y+1) || (theRobot.direction === "W" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x-1) || (theRobot.direction === "N" && theRobot.x===otherRobot.x && theRobot.y===otherRobot.y-1) || (theRobot.direction === "E" && theRobot.y===otherRobot.y && theRobot.x===otherRobot.x+1)) {
     
      blockingRobot++;
            
    } 
    
    if (blockingObstacles===0 && blockingRobot===0) {
  
      moveBackward(theRobot)
     
     } else {console.log (`${robot.name} can't move backward there's an obstacle or the other robot`); }
     
     }
      


   function commandListWithAnOtherRobotAndObstacles(command,robot) {
    for (i = 0; i < command.length; i++) {
      if (command[i]== "l") {
        turnLeft(robot);
      } else if (command[i]=="r") {
        turnRight(robot);
      } else if (command[i]=="f") {
        moveForwardWithAnotherRobotAndObstacles (robot);
      }
        else if (command[i]=="b") {
          moveBackwardWithAnotherRobotAndObstacles (robot);
      } else { 
          console.log("command is no valid");
       }
      }
    }