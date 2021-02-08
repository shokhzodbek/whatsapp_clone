import { Avatar } from '@material-ui/core'
import { Chat, MoreVert,DonutLarge, Search } from '@material-ui/icons'
import React,{useState,useEffect} from 'react'
import SidebarOption from '../SidebarOption'

import db from '../../firebase'
import './styles.css'
import { useStateValue } from '../../StateProvider'
function Sidebar() {
      const [data1,setData] = useState([])
      useEffect(()=>{
       db.collection('rooms').onSnapshot(snapshot=>setData(snapshot.docs.map(doc=>({
             id:doc.id,
             data:doc.data()
       }))))
      },[])

      const [{user},dispatch] = useStateValue()
      return (
            <div className="sidebar">
                  <div className="sidebar_header">
                        <Avatar src={user?.photoURL} />
                        <div className="headerRight">
                              <DonutLarge/>
                              <Chat/>
                              <MoreVert/>

                        </div>
                  </div>
                  <div className="sidebar_search">
                        <div className="headerSearch">
                              <Search/>
                              <input type="text" placeholder="Search"/>
                        </div>
                  </div>
                  <div className="sidebar_chat">
                        <SidebarOption addSidebar/>

                        {data1.map((item)=>(<SidebarOption name={item.data.name} key={item.id} id={item.id}/>))}
                  </div>
                  
            </div>
      )
}

export default Sidebar
