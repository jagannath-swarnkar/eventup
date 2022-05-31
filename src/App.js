import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DialogHoc from './hoc/dialogHoc';
import DrawerHoc from './hoc/drawerHoc';
import LoaderHoc from './hoc/loader';
import Homepage from './pages';
import JoinConference from './pages/conference/JoinConference';
import StartConference from './pages/conference/StartConference';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage/>
          </Route>
          <Route path="/j/:roomId">
            <JoinConference />
          </Route>
          <Route path="/s/:roomId">
            <StartConference />
          </Route>
        </Switch>
      </Router>
      <LoaderHoc></LoaderHoc>
      <DrawerHoc></DrawerHoc>
      <DialogHoc></DialogHoc> 
    </div>
  )
}

export default App


// import React, { useEffect, useState } from 'react'
// import Conference from './pages'
// import { useHistory } from 'react-router';

// const App = () => {
//   const history = useHistory()
//   const [roomName] = useState(generateRoomWithoutSeparator())
//   const [randomChar] = useState(randomAlphanumString(5))
//    const {pathname="" } = history?.location
//   const roomId = pathname?.split('/')[1]
//   useEffect(()=>{
//     if(!roomId){
//       history.push(`${roomName}_${randomChar}`)
//     }
//   },[])
  
//   return (
//     <div>
//       <Conference roomId={roomId}></Conference>
//     </div>
//   )
// }

// export default App
