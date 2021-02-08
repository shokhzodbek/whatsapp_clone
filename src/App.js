import Chat from './pages/Chat'
import Sidebar from './components/Sidebar'
import {useState} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import {useStateValue} from './StateProvider'
const App =()=> {
   const [{user},dispatch] = useStateValue()
  return (
    
    <div className="app">
      {!user?<Login/>:(
          <div className="app_body">
          <Router>
              <Sidebar/>
             <Switch>
               <Route path="/room/:roomId">
              <Chat/>
               </Route>
               <Route path="/">
                 <Chat/>
               </Route>
               
              </Switch>
       </Router>
       </div>
     
      )}
      </div>
      
  );
}

export default App;
