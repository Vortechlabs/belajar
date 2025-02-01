import React, { useEffect, useState } from 'react'
import UserNav from '../../components/UserNav';
import { Link } from 'react-router-dom';
import axios from '../../Services/api'
import Swal from 'sweetalert2';
import thumbnail from '../../assets/example_game/v1/thumbnail.png'
import Loader from '../../components/Loader';

function ManageGames() {
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
    <div className="container">
        <Link to='/ManageGamesForm' className="btn btn-primary">
            Add Game
        </Link>
    </div>
    </div>

    <div className="list-form py-5">
    <div className="container">
        <h6 className="mb-3">List Games</h6>

        <table className="table table-striped">
            <thead>
                <tr>
                    <th width="100">Thumbnail</th>
                    <th width="200">Title</th>
                    <th width="500">Description</th>
                    <th width="180">Action</th>
                </tr>
            </thead>
            <tbody>
            {games.map((game) => (
            <tr key={game.id}>
                <td><img src={thumbnail} alt="Demo Game 1 Logo" style={{ width: '100%' }}/></td>
                <td>{game.title}</td>
                <td>{game.description}</td>
                <td>
                    <Link to={`/DetailGames/${game.id}`} className="btn btn-sm btn-primary">Detail</Link>
                    <Link to={`/ManageGamesFormUpdate/${game.id}`} className="btn btn-sm btn-secondary">Update</Link>
                    <Link to={`/Delete/${game.id}`}  className="btn btn-sm btn-danger">Delete</Link>
                </td>
            </tr>
            ))}
            
            </tbody>
        </table>

    </div>
    </div>

    </main>
    </>
  )
}

export default ManageGames