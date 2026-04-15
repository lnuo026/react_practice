import { useNavigate } from 'react-router-dom'

export default function DeckCard({ deck, onDelete }) {
  const navigate = useNavigate()

  return(
    <div>
        <h3>{deck.title}</h3>
        <p>{deck.description}</p>
        <button 
            onClick={() =>navigate(`/study/${deck._id}`)}>Study
        </button>
        <button 
            onClick={() =>navigate(`/deck/${deck._id}`)}>Manage
        </button>
        <button 
            onClick={() =>onDelete(deck._id)}>Delete
            </button>
      </div>

  )


}