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
    //正在编辑哪张卡
    const [editingId, setEditingId] = useState(null)
    // 是否显示表单，一开始不显示，点击 "Add Card" 才显示
    const [showForm, setShowForm] = useState(false)
    // // 是否 "正在" 保存 
    const [saving, setSaving] = useState(false)
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
    
    
    // startEdit — 点编辑时发生什么  
    const startEdit = (card) => {                                    
        //把卡片内容填进表单
        setForm({ front: card.front, back: card.back })  
        setEditingId(card._id)   // 记录正在编辑哪张卡
        setShowForm(true)        // 显示表单
    }       
    
    

    // 新建和编辑共用一个表单  
    // 同一个表单，通过 editingId 判断是新建还是编辑：
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            // // editingId 有值 = 编辑模式
            if (editingId) {
                await updateCard(editingId, form)
            } else {
                // editingId 没有值 = 新建模式
                // 按钮文字也跟着变：下面的 {editingId ? 'Save Changes' : 'Add Card'}
                await createCard(deckId, form)
            }
            resetForm()
            fetchCards()
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }
    

        const handleDelete = async (id) => {
            await deleteCard(id)
            setCards(prev => prev.filter(c => c._id !== id))
        }
        

    // 点取消、保存成功后都会调用这个，把表单恢复到初始状态。— 重置所有状态 
      const resetForm = () => {                                        
        setForm({ front: '', back: '' })  // 清空输入框
        setEditingId(null)                // 退出编辑模式              
        setShowForm(false)                // 隐藏表单
      }                                                                

      

    
    return (
        
        <div className="max-w-3xl mx-auto px-4 py-8">
            
            <h1>Manage Cards</h1>
            <form 
            onSubmit={handleCreate}>
            <input 
            required 
            value={form.front} 
            onChange={e =>
                setForm({...form, front: e.target.value})}
                placeholder="Front" />
            <input 
            required 
            value={form.back} 
            onChange={e =>
                setForm({...form, back: e.target.value})} 
            placeholder="Back"
            />
            <button type="submit">Add Card</button>
            </form>
            {/* {cards.map(card => (
                <div key={card._id}>
                <p>{card.front} / {card.back}</p>
                <button onClick={() =>
                    handleDelete(card._id)}
                >
            Delete
            </button>
            </div>
            ))} */}
        </div>
        )


}