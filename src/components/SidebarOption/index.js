import React,{useEffect,useState} from 'react'
import { Avatar } from '@material-ui/core'

import db from '../../firebase'
import {Link,useParams} from 'react-router-dom'


import './styles.css'
function SidebarOption({addSidebar,name,id}) {
      const {roomId} = useParams()
      const [messages,setMessages] = useState([]) 
      
      const [avatar,setAvatar] = useState('')
      useEffect(()=>{
            setAvatar(Math.random()*1000)
      },[])
        
      useEffect(()=>{
            if(id){
            db.collection('rooms').doc(roomId).collection('messages')
            .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
       } },[])


      const addChat = ()=>{
             const roomName = prompt("Please enter name for chat")
             if(roomName){
                   db.collection('rooms').add({
                         name:roomName
                   })
             }
      }
      return !addSidebar?(
            <Link to={`/room/${id}`}>
            <div className="sidebar_option">
                  <Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>
                  <div className="option_info">
                        <h3>{name}</h3>
                        <p>{messages[0]?.message}</p>
                  </div>
                  
            </div></Link>):(
                  <div onClick={addChat} className="sidebar_option">
                        <h4 className="add">Add chat</h4>
                  </div>
            
      )
}

export default SidebarOption
