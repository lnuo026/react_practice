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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ← 🤓Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Manage Cards</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/study/${deckId}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Study
          </button>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm({ front: '', back: '' }) }}
            className="border border-indigo-300 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition"
          >
            + Add Card
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col gap-3 border border-indigo-100"
        >
          <h2 className="font-semibold text-gray-700">{editingId ? 'Edit Card' : 'New Card'}</h2>
          <textarea
            required
            value={form.front}
            onChange={(e) => setForm({ ...form, front: e.target.value })}
            placeholder="Front (question / word)"
            rows={2}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
          />
          <textarea
            required
            value={form.back}
            onChange={(e) => setForm({ ...form, back: e.target.value })}
            placeholder="Back (answer / definition)"
            rows={2}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Card'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-center text-gray-400 mt-12">Loading cards...</p>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">No cards yet. Add your first card!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{card.front}</p>
                <p className="text-sm text-gray-500 mt-1 truncate">{card.back}</p>
                <p className="text-xs text-gray-300 mt-1">
                  Next review: {new Date(card.nextReviewDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(card)}
                  className="text-sm text-indigo-500 hover:text-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card._id)}
                  className="text-sm text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}