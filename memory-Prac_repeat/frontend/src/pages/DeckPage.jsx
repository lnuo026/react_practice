// 管理某个卡组里的卡片：                                       
//   - 查看所有卡片                                                   
//   - 新建卡片                                                       
//   - 编辑卡片                                                       
//   - 删除卡片  
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCards, createCard, updateCard, deleteCard } from '../services/api'

export default function DeckPage() {
const { deckId } = useParams()
    const [cards, setCards] = useState([])
    const [form, setForm] = useState({ front: '', back: '' })

    const fetchCards = async () => {
      const res = await getCards(deckId)
      setCards(res.data)
    }

    useEffect(() => {
      fetchCards()
    }, [deckId])

    const handleCreate = async (e) => {
      e.preventDefault()
      await createCard(deckId, form)
      setForm({ front: '', back: '' })
      fetchCards()
    }

    const handleDelete = async (id) => {
      await deleteCard(id)
      setCards(prev => prev.filter(c => c._id !== id))
    }



  return (
    <div>
      <h1>Deck Page</h1>
    </div>
  );
}