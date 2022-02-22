import React, { createContext, useEffect, useState } from 'react';
import MessageScreen from './components/MessageScreen';
import socket from "./utils/socket"
import Video from './components/Video';
import Login from './components/entery/Login';

export const context = createContext({id: "123", userName:"noOne"});

function App() {
  const [myID, setMyID] = useState<Types.userObj>({id: "", userName:""})
  useEffect(() => {
    socket.on("getID", (userObj: Types.userObj)=>{
      setMyID(userObj)
    });    
  }, [])

    console.log(myID);
    
  
  return (
    <div className="App">
      <context.Provider value={myID}>
        { !myID.userName  ?
        <Login/> :
        <MessageScreen />
        }
      </context.Provider>
    </div>
  );
}

export default App;
