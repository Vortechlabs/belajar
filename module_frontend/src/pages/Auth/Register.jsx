import React, { useState } from 'react'
import axios from '../../Services/api'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleRegister = async(event) => {
        event.preventDefault();
        try{
            await axios.post('/signup', {username, password});
            setUsername("")
            setPassword("")
            navigate('/auth/signin')
            Swal.fire("SignUp Success")
        }catch(e){
            if(e.response){
                if(e.response.status === 422){
                    Swal.fire(e.response.data.errors);
                }else if(e.response.status === 500){
                    Swal.fire('Server error, please try again later!');
                }
            }else{
                Swal.fire('Network error or server did not respond');
            }
        }
    }

  return (
    <main>
    <div className="hero py-5 bg-light">
       <div className="container text-center"> 
          <h2 className="mb-3">
             Sign Up - Gaming Portal
          </h2> 
          <div className="text-muted">
             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
       </div>
    </div>

    <div className="py-5">
       <div className="container"> 

          <div className="row justify-content-center ">
             <div className="col-lg-5 col-md-6"> 
                
                <form onSubmit={handleRegister}>

                   <div className="form-item card card-default my-4">
                      <div className="card-body">
                         <div className="form-group">
                            <label htmlFor="username" className="mb-1 text-muted">Username <span className="text-danger">*</span></label>
                            <input id="username" type="text" placeholder="username" className="form-control" name="username" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}/>
                         </div>  
                      </div>
                   </div>
                   <div className="form-item card card-default my-4">
                      <div className="card-body">
                         <div className="form-group">
                            <label htmlFor="password" className="mb-1 text-muted">Password <span className="text-danger">*</span></label>
                            <input id="password" type="password" placeholder="Password" className="form-control" name="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}/>
                         </div>  
                      </div>
                   </div>
                   
 
                   <div className="mt-4 row">
                      <div className="col">
                         <button type='submit' className="btn btn-primary w-100">Sign Up</button>
                      </div>
                      <div className="col">
                         <Link to='/auth/signin'><button className="btn btn-danger w-100">Sign In</button></Link>
                      </div>
                   </div>
                </form>

             </div>
           </div>  
          
       </div>
    </div>
  </main>
  )
}

export default Register