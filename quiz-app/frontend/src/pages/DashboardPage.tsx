import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { apiFetch } from '../lib/api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const BROWN = '#4a3728'
const PIXEL = "'Press Start 2P', cursive"
const BAR_COLORS = ['#f783ac','#74c0fc','#ffd43b','#69db7c','#b197fc','#f783ac','#74c0fc','#ffd43b','#69db7c','#b197fc']

interface Stats {
  bestLevel: number
  avgAccuracy: number
  totalSessions: number
  recentSessions: { score: number; accuracy: number; level: number; playedAt: string }[]
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-cream pixel-border-lg p-5 ${className}`}>
      {children}
    </div>
  )
}

function Tag({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <div className="inline-block pixel-border-sm mb-4" style={{ background: bg, padding: '8px 18px' }}>
      <span className="font-pixel text-[13px] text-brown">{children}</span>
    </div>
  )
}

export default function DashboardPage() {
  const user = useAuthStore(s => s.user)
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    apiFetch('/game/stats').then(setStats).catch(() => {})
  }, [])

  const chartData = stats?.recentSessions
    ? [...stats.recentSessions].reverse().map((s, i) => ({ name: `#${i + 1}`, score: s.score }))
    : []

  return (
    <div className="grass-bg min-h-screen flex flex-col items-center gap-5 px-6 py-8 pb-24">
      <div className="w-full max-w-[640px] flex flex-col gap-5">

        {/* 玩家信息 */}
        <Panel className="flex items-center gap-5">
          {user?.photoURL ? (
            <img src={user.photoURL} className="w-[72px] h-[72px] border-[4px] border-brown shadow-[3px_3px_0_#4a3728] shrink-0" />
          ) : (
            <div className="w-[72px] h-[72px] bg-gold border-[4px] border-brown shadow-[3px_3px_0_#4a3728] flex items-center justify-center text-[36px] shrink-0">
              🧑
            </div>
          )}
          <div className="flex flex-col gap-3">
            <span className="font-pixel text-[18px] text-brown">{user?.displayName ?? 'Player'}</span>
            <span className="font-pixel text-xs text-tan">{user?.email}</span>
          </div>
        </Panel>

        {/* 游戏入口 */}
        <div
          onClick={() => navigate('/item-match')}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'translate(3px,3px)'
            e.currentTarget.style.boxShadow = `3px 3px 0 ${BROWN}`
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = `6px 6px 0 ${BROWN}`
          }}
          className="bg-pink pixel-border-xl p-7 cursor-pointer flex items-center gap-5"
        >
          <span className="text-[56px] leading-none">🧩</span>
          <div className="flex flex-col gap-3">
            <span className="font-pixel text-[20px] text-brown">ITEM MATCH</span>
            <span className="font-pixel text-[13px] text-mocha leading-loose">
              记住3件物品<br />从4组中选出相同的一组
            </span>
          </div>
          <span className="ml-auto font-pixel text-2xl text-brown">▶</span>
        </div>

        {/* 统计三格 */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '平均准确率', value: stats?.avgAccuracy !== undefined ? `${stats.avgAccuracy}%` : '—', bg: '#74c0fc' },
            { label: '最高分',   value: stats?.recentSessions?.length
                ? String(Math.max(...stats.recentSessions.map(s => s.score))) : '—', bg: '#69db7c' },
            { label: '总局数',   value: stats?.totalSessions != null ? String(stats.totalSessions) : '—', bg: '#ffd43b' },
          ].map(card => (
            <Panel key={card.label} className="text-center">
              <Tag bg={card.bg}>{card.label}</Tag>
              <div className="font-pixel text-[30px] text-brown">{card.value}</div>
            </Panel>
          ))}
        </div>

        {/* 柱形图 */}
        <Panel>
          <Tag bg="#b197fc">近期得分</Tag>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="25%">
                <XAxis
                  dataKey="name"
                  tick={{ fill: BROWN, fontSize: 12, fontFamily: PIXEL }}
                  axisLine={{ stroke: BROWN, strokeWidth: 2 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: BROWN, fontSize: 12, fontFamily: PIXEL }}
                  axisLine={{ stroke: BROWN, strokeWidth: 2 }}
                  tickLine={false}
                  width={44}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(74,55,40,0.08)' }}
                  contentStyle={{
                    background: '#fef9e7', border: `3px solid ${BROWN}`,
                    borderRadius: 0, fontFamily: PIXEL, fontSize: '12px',
                    color: BROWN, boxShadow: `3px 3px 0 ${BROWN}`,
                  }}
                />
                <Bar dataKey="score" radius={0}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} stroke={BROWN} strokeWidth={2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="py-9 text-center">
              <span className="font-pixel text-[13px] text-tan leading-loose">
                还没有游戏记录<br />完成一局后显示进步曲线
              </span>
            </div>
          )}
        </Panel>

        {/* 返回按钮 */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/home')}
            onMouseDown={e => {
              e.currentTarget.style.transform = 'translate(2px,2px)'
              e.currentTarget.style.boxShadow = '2px 2px 0 #4a3728'
            }}
            onMouseUp={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = '4px 4px 0 #4a3728'
            }}
            className="px-9 py-3 bg-sand text-brown pixel-border rounded-none font-pixel text-base cursor-pointer"
          >
            ← 返回主页
          </button>
        </div>

      </div>
    </div>
  )
}
