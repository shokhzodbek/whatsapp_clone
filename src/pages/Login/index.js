import React from 'react'
import {Button} from '@material-ui/core'
import {auth,provider} from '../../firebase'
import './styles.css'

import {useStateValue} from '../../StateProvider'
import {actionType} from '../../reducer'
function Login() {
      const [{},dispatch] = useStateValue()

      const signIn = ()=>{
          auth.signInWithPopup(provider)
          .then(res=>dispatch({
                type:actionType.type,
                user:res.user
          }))
          .catch(error=>alert(error))
      }
      return (
            <div className="login">
                  <div className="login_container">
                        <img src="data:image/png;base64,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"/>
                         <div className="login_info">
                               <h3>Sign in to WhatsApp</h3>
                               <p>Sign In with Google</p>
                         </div>
                         <Button onClick={signIn}>Sign in</Button>

                  </div>
                  
            </div>
      )
}

export default Login
