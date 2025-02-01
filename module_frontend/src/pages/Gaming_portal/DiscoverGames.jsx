import React, { useEffect, useState } from 'react'
import axios from '../../Services/api'
import UserNav from '../../components/UserNav';
import Swal from 'sweetalert2';
import thumbnail from '../../assets/example_game/v1/thumbnail.png'
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

function DiscoverGames() {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try{
                const response = await axios.get('/games');
                setGames(response.data);
            }catch(e){
                Swal.fire(e.message)
            }finally{
                setLoading(false)
            }
        }


        fetchGames();
    }, []);
    
    if(loading){
        return <Loader />
    }

  return (
    <>
    <UserNav />
    
    <main>

    <div className="hero py-5 bg-light">
    <div className="container text-center">
        <h1>Discover Games</h1>
    </div>
    </div>

    <div className="list-form py-5">
    <div className="container">
        <div className="row">
        <div className="col">
            <h2 className="mb-3">{games.length} Game Avaliable</h2>
        </div>

        <div className="col-lg-8" style={{ textAlign: 'right' }}>
            <div className="mb-3">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary">Popularity</button>
                <button type="button" className="btn btn-outline-primary">Recently Updated</button>
                <button type="button" className="btn btn-outline-primary">Alphabetically</button>
            </div>
            
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary">ASC</button>
                <button type="button" className="btn btn-outline-primary">DESC</button>
            </div>
        </div>
        </div>
        </div>
        

        <div className="row">
        {games.map((game) => (
        
        <div className="col-md-6" key={game.id}>
            <Link to={`/DetailGames/${game.id}`} className="card card-default mb-3">
            <div className="card-body">
                <div className="row">
                <div className="col-4">
                    <img src={thumbnail} alt="Demo Game 1 Logo" style={{ width: '100%' }} />
                </div>
                <div className="col">
                    <h5 className="mb-1">{game.title} <small className="text-muted">{game.created_by}</small></h5>
                    <div>{game.description}</div>
                    <hr className="mt-1 mb-1" />
                    <div className="text-muted">#scores submitted : 203</div>
                </div>
                </div>
            </div>
            </Link>
        </div>
        
        ))}
        </div>

    </div>
    </div>

    </main>
    </>
  )
}

export default DiscoverGames