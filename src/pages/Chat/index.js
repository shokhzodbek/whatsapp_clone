import React,{useEffect,useState} from 'react'
import './styles.css'
import {Avatar,IconButton} from '@material-ui/core'
import { AttachFile,InsertEmoticon,Mic,MoreVert,Search } from '@material-ui/icons'

import { useHistory, useParams } from "react-router-dom";
import db from '../../firebase'
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase'

function Chat() {
      const [avatar,setAvatar] = useState('')
      const [roomName,setRoomName] = useState('')
      const {roomId} = useParams()
      const [messages,setMessages] = useState([])
      const [input,setInput] = useState('') 
      const [{user},dispatch] = useStateValue()

      useEffect(()=>{
            setAvatar(Math.random()*1000)
      },[])
      const sendMessage = (e)=>{
            e.preventDefault();

            db.collection('rooms').doc(roomId).collection('messages')
            .add({
                  message:input,
                  name:user?.displayName,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setInput('')

      }

      useEffect(()=>{
            if(roomId){
                db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot=>(setRoomName(snapshot.data()?.name)))


                db.collection('rooms').doc(roomId)
                .collection('messages').orderBy('timestamp','asc')
                .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
            }

            
           
      },[roomId])

  

      return (
            <div className="chat">
                  <div className="chat_header">
                  <Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>
                  <div className="chat_info">
                  <h4>{roomName}</h4>
                  <p>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toDateString()}</p>
                  </div>
                  
                  <div className='chat_headerRight'>
                        <IconButton>
                              <Search/>
                        </IconButton>
                        <IconButton>
                              <AttachFile/>
                        </IconButton>
                        <IconButton>
                              <MoreVert/>
                        </IconButton>
                  </div>
                  </div>
                  <div className="chat_body">
                  {messages.map(item=>(
                         
                         <p className={`chat_message ${item.name===user?.displayName && 'chat_res'}`}>
                         <span className="chat_name">{item?.name}</span>
                               {item?.message} <span className="timestamp">{new Date(item.timestamp?.toDate()).toDateString()}</span>
                         </p>
             
                  ))} </div>
                 
                  <div className="chat_footer">
                        <InsertEmoticon/>
                        <form>
                              <input value={input} onChange={(e)=>setInput(e.target.value)}/>
                              <button type="submit" onClick={sendMessage}>s</button>
                        </form>
                        <Mic/>
                  </div>
                  
            </div>
      )
}

export default Chat
