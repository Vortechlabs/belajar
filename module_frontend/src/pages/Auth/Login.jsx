import React, { useEffect, useState } from 'react'
import axios from '../../Services/api'
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/signin', {username, password});
            const {token, user} = response.data;
            console.log(response.data);
            login(token,user);
            navigate('/');
        }catch(e){
            if(e.response){
                if(e.response.status === 401){
                    Swal.fire('The provide credentials are incorrect')
                }else {
                    Swal.fire('An error occurred: ' + e.response.data.message);
                }
            } else {
                Swal.fire('Network error, please try again later.');
            }
        }
    }

  return (
    <main>
        <section className="login">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-5 col-md-6">
                  <h1 className="text-center mb-4">Gaming Portal</h1>
                  <div className="card card-default">
                     <div className="card-body">
                        <h3 className="mb-3">Sign In</h3>
                        
                        <form onSubmit={handleLogin}> 
                           <div className="form-group my-3">
                              <label htmlFor="username" className="mb-1 text-muted">username</label>
                              <input type="text" id="username" name="username" value={username}
                            onChange={(e) => setUsername(e.target.value)} className="form-control" autoFocus />
                           </div> 

                           <div className="form-group my-3">
                              <label htmlFor="password" className="mb-1 text-muted">Password</label>
                              <input type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} name="password"  className="form-control" />
                           </div>
                           
                           <div className="mt-4 row">
                              <div className="col">
                                 <button type="submit" className="btn btn-primary w-100">Sign In</button>
                              </div>
                              <div className="col">
                                 <Link to='/auth/signup'><button className="btn btn-danger w-100">Sign up</button></Link>
                              </div>
                              
                           </div>
                        </form>

                     </div>
                  </div> 
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}

export default Login