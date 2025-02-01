import React, { useEffect, useState } from 'react'
import UserNav from '../../components/UserNav';
import { Link, useParams } from 'react-router-dom';
import axios from '../../Services/api'
import Swal from 'sweetalert2';
import thumbnail from '../../assets/example_game/v1/thumbnail.png'
import Loader from '../../components/Loader';

function DetailGames() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    
        useEffect(() => {
            const fetchDetailGames = async () => {
                try{
                    const response = await axios.get(`/games/${id}`);
                    setGames(response.data);
                    console.log('Fetched game data:', response.data);
                }catch(e){
                    Swal.fire(e.message)
                }finally{
                    setLoading(false)
                }
            }
    
    
            fetchDetailGames();
        }, [id]);

        
        if(loading){
            return <Loader />
         }

  return (
    
    <>
    
    <UserNav />

    
    <main>
      <div className="hero py-5 bg-light">
         <div className="container text-center"> 
            <h2 className="mb-1">
              {games.title}
            </h2> 
            
            <a href="profile.html" className="btn btn-success">By {games.created_by}</a>
            <div className="text-muted">
             {games.description}
            </div>
            <h5 className="mt-2">Last Versions v2 (2024-04-09 22:45:41)</h5>
         </div>
      </div>

      <div className="py-5">
         <div className="container"> 

            <div className="row justify-content-center ">
               <div className="col-lg-5 col-md-6"> 
                                
                <div className="row">
                  <div className="col">
                    <div className="card mb-3">
                      <div className="card-body">
                          <h5>Top 10 Leaderboard</h5>
                          <ol>
                            <li>Player5 (3004)</li>
                            <li>Player2 (2993)</li>
                            <li>Player3 (2000)</li>
                            <li>Player4 (1195)</li>
                            <li><b>Player1 (1190)</b></li>
                            <li>Player6 (1093)</li>
                            <li>Player7 (1055)</li>
                            <li>Player8 (1044)</li>
                            <li>Player9 (1005)</li>
                            <li>Player10 (992)</li>
                          </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img src={thumbnail} alt="Demo Game 1 Logo" style={{width: '100%'}}/>
                    <a href="../../assets/example_game/v1/game.zip" download className="btn btn-primary w-100 mb-2 mt-2">Download Game</a>
                  </div>
                </div>

                
                <Link to='/ManageGames' className="btn btn-danger w-100">Back</Link>

               </div>
             </div>  
            
         </div>
      </div>
    </main>
    </>
  )
}

export default DetailGames