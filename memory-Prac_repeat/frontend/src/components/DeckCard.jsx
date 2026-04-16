import { useNavigate } from 'react-router-dom'

export default function DeckCard({ deck, onDelete }) {
  const navigate = useNavigate()

  return(
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{deck.title}</h3>
        {deck.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{deck.description}</p>
        )}
      </div>

      <div className="flex gap-3 text-sm text-gray-500">
        <span>{deck.totalCards} cards</span>
        {deck.dueCards > 0 && (
          <span className="text-orange-500 font-medium">{deck.dueCards} due today</span>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => navigate(`/study/${deck._id}`)}
          className="flex-1 bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Study
        </button>
        <button
          onClick={() => navigate(`/deck/${deck._id}`)}
          className="flex-1 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Manage
        </button>
        <button
          onClick={() => onDelete(deck._id)}
          className="px-3 border border-red-100 text-red-400 text-sm py-2 rounded-lg hover:bg-red-50 transition"
        >
          Delete
        </button>
        </div>
      </div>

  )


}