import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext';
import Swal from 'sweetalert2';
import axios from '../../Services/api'

function ManageGamesForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();
  const {token} = useAuth();

  const generateSlug = (title)=> {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
  }

  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);


  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      await axios.post('/games', {title, description, slug},{
      headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      setTitle(),
      setDescription(),
      setSlug(),
      navigate('/ManageGames')
    }catch(e){
      if(e.response){
        if(e.response.status === 422){
          Swal.fire(e.response.errors);
        }else if(e.response.status === 500){
          Swal.fire('Server error please try again later!');
        }else{
          Swal.fire('Network Error or Server did not respond');
        }
      }
    }
  }

  return (
    
   <main>
   <div className="hero py-5 bg-light">
      <div className="container text-center"> 
         <h2 className="mb-3">
            Manage Games - Gaming Portal
         </h2>
      </div>
   </div>

   <div className="py-5">
      <div className="container"> 

         <div className="row justify-content-center ">
            <div className="col-lg-5 col-md-6"> 
               
               <form onSubmit={handleSubmit} method='POST'>
                  <div className="form-item card card-default my-4">
                     <div className="card-body">
                        <div className="form-group">
                           <label htmlFor="title" className="mb-1 text-muted">Title <span className="text-danger">*</span></label>
                           <input id="title" type="text" placeholder="Title" className="form-control" name="title"  value={title}
                         onChange={(e) => setTitle(e.target.value)}/>
                        </div>  
                     </div>
                  </div>
                  <div className="form-item card card-default my-4">
                     <div className="card-body">
                        <div className="form-group">
                           <label htmlFor="description" className="mb-1 text-muted">Description <span className="text-danger">*</span></label>
                           <textarea name="description" className="form-control" placeholder="Description" id="description" cols="30" rows="5"  value={description}
                         onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>  
                     </div>
                  </div>
                  <div className="form-item card card-default my-4">
                     <div className="card-body">
                        <div className="form-group">
                           <label htmlFor="thumbnail" className="mb-1 text-muted">Thumbnail <span className="text-danger">*</span></label>
                           <input type="file" name="thumbnail" className="form-control" id="thumbnail" />
                        </div>  
                     </div>
                  </div>
                  <div className="form-item card card-default my-4">
                     <div className="card-body">
                        <div className="form-group">
                           <label htmlFor="game" className="mb-1 text-muted">File Game <span className="text-danger">*</span></label>
                           <input type="file" name="game" className="form-control" id="game" />
                        </div>  
                     </div>
                  </div>

                  <div className="mt-4 row">
                     <div className="col">
                        <button type='submit' className="btn btn-primary w-100">Submit</button>
                     </div>
                     <div className="col">
                        <Link to='/ManageGames' className="btn btn-danger w-100">Back</Link>
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

export default ManageGamesForm