import { useState } from "react";

//第一步：接收数据  
export default function FlashCard({ front , back }) {
//第二步：记录是否翻转 
  const [flipped, setIsFlipped] = useState(false);


  return (
    <div 
    className="perspective w-full h-64 cursor-pointer select-none"
    onClick={ () => setIsFlipped( (f) => !f )}
    >
        {/*  flipped 是 true 时，加上 flipped 这个 CSS 类名
        index.css :    .card-inner.flipped {    */}
      <div className={`card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        
        {/* Front */}
        <div className="card-face bg-white rounded-2xl shadow-xl flex items-center justify-center p-8 border-2 border-indigo-100">
          <p className="text-2xl font-semibold text-gray-800 text-center">{front}</p>
        </div>

        {/* Back */}
        <div className="card-face card-back bg-indigo-600 rounded-2xl shadow-xl flex items-center justify-center p-8">
          <p className="text-2xl font-semibold text-white text-center">{back}</p>
        </div>
      </div>

        {/* 底部提示文字也跟着变            */}
      <p className="text-center text-xs text-gray-400 mt-2">
        {flipped ? 'Click to see front' : 'Click to reveal answer'}
      </p>
    </div>
  );
}