import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { getDueCards , submitReview } from "../services/api";
import FlashCard from "../components/FlashCard";

export default function StudyPage() {
    const { deckId } = useParams()
    const navigate = useNavigate()
    const [cards, setCards] = useState([])
    const [ index ,setIndex ] = useState(0)
    const [ done ,setDone ] = useState(false)

    useEffect(() =>{
        getDueCards(deckId).then( res =>
        setCards(res.data)).catch(console.error)
    },[deckId])

     const handleReview = async (quality) => {
      await submitReview(cards[index]._id, quality)
      if (index + 1 >= cards.length) {
        setDone(true)
      } else {
        setIndex(i => i + 1)
      }
    }
    if(done){
        return(
            <div>
                <h1>done</h1>
                <button onClick={ ()=>{navigate('/')}}>
                    Back to Home
                </button>
            </div>
    
        ) } 

    if(cards.length === 0){
       return <div><h1>No cardsdue</h1><button onClick={() =>
        navigate('/')}>Back</button></div>
    }

    return (
        <div>
            <p>Card {index + 1} of {cards.length}</p>
            <FlashCard card={cards[index]} onReview={handleReview} />
            <button onClick={() =>handleReview(0)}>Forgot</button>
            <button onClick={() => handleReview(3)}>Hard</button>
            <button onClick={() => handleReview(5)}>Easy</button>
        </div>
    )
}