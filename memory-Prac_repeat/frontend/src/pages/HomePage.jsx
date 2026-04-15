import { useAuth} from "../auth/AuthContext" ;
import { useState, useEffect } from 'react'
import DeckCard from '../components/DeckCard'
import { getDecks, createDeck, deleteDeck } from '../services/api'

export default function HomePage() {   
    const { user } = useAuth()
    const [decks, setDecks] = useState([])
    const [loading, setLoading] = useState(true)
    // 是否显示创建表单，初始隐藏
    const [showForm, setShowForm] = useState(false)
    // 表单里输入的内容
    const [form, setForm] = useState({ title: '', description: '' })
    // 是否正在创建中（防止重复点击）
    const [creating, setCreating] = useState(false)


    // fetchDecks 获取卡组
    const fetchDecks = async () =>{
        try {
            // 发请求给后端,把数据存进状态
            const res = await getDecks()
            setDecks(res.data)
        }catch(err){
            console.error(err)
        }
    }

    // 页面一加载自动执行
    // 页面打开 ，useEffect 触发 fetchDecks，发请求 GET /api/decks
    // 拿到数据，页面重新渲染，显示卡组列表
    useEffect(() => {
        fetchDecks()
    }, [])  // [] 空数组 = 只执行一次



    
    //handleCreate 创建卡组
//   handleCreate 完整流程                   
                                                                   
  const handleCreate = async (e) => {
    e.preventDefault()                                             
    // 表单提交默认会刷新页面，这行阻止它
    // setCreating(true)                     
    // 按钮变成 "Creating..."，同时禁用
    try {
      await createDeck(form)
      // 发请求给后端，等待创建完成
      // await = 等它完成再继续，不会跳过
      setForm({ title: '', description: '' })
      // 清空输入框                                                
      setShowForm(false)
      // 隐藏表单                                                  
      fetchDecks()
      // 重新获取列表，页面显示新卡组         
    } catch (err) { 
      console.error(err)
      // 出错了就打印错误                        
    } finally {                                                    
      setCreating(false)
      // 不管成功失败，按钮恢复 "Create" 
    }                                         
  }  





  const handleDelete = async (id) => {
    if (!window.confirm('Delete this deck and all its cards?')) return
    try {
      await deleteDeck(id)
      setDecks((prev) => prev.filter((d) => d._id !== id))
    } catch (err) {
      console.error(err)
    }
  }
 
//   const totalDue = decks.reduce((sum, deck) => sum + (deck.dueCards || 0), 0)  

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                <h1 className="text-2xl font-bold text-gray-800">My Decks</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Hello, {user?.username}
                </p>
                </div>
            <button
            onClick={() => setShowForm((s) => !s)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
                + New Deck
            </button>            
            </div>
            {showForm && (
                <form onSubmit={handleCreate}>
                    <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Deck title" />
                    <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" />
                    <button type="submit">Create</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}

            {loading ? (
                <p className="text-center text-gray-400 mt-12">Loading decks...</p>
            ) : decks.length === 0 ? (
                <div className="text-center text-gray-400 mt-16">
                <p className="text-lg">No decks yet.</p>
                <p className="text-sm mt-1">Create your first deck to start studying!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {decks.map((deck) => (
                    <DeckCard key={deck._id} deck={deck} onDelete={handleDelete} />
                ))}
                </div>
            )}



         </div>
    );
}