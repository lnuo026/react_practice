import { useState, useMemo } from 'react';
import SpriteAnimation from './SpriteAnimation';

  const ANIMATIONS = [
    { path: '/assets/dog/Akita-Idle.png', frameCount: 10 },
    { path: '/assets/dog/Akita-walk.png', frameCount: 8 },
    { path: '/assets/dog/Akita-run.png', frameCount: 8 },
    { path: '/assets/dog/Akita-stretching.png', frameCount: 10 },
    { path: '/assets/dog/Akita-lying-down.png', frameCount: 7 },
    { path: '/assets/dog/Akita-licking1.png', frameCount: 4 },
    { path: '/assets/dog/Akita-licking2.png', frameCount: 4 },
    { path: '/assets/dog/Akita-bark.png', frameCount: 3 },
    { path: '/assets/dog/Akita-itching.png', frameCount: 2 },
    { path: '/assets/dog/Akita-sitting.png', frameCount: 1 },
    { path: '/assets/dog/Akita-sleeping.png', frameCount: 1 },
  ];

  const DIALOGS = [
    'Hi, My name is Hammer!',
    "This is Nora's territory!",
    'Nora is fierce, how dare u!',
    'Private property! No trespassing!',
    'Who are you? Leave your name!',
  ];

  const GRASS = ['/assets/grass/tile_0000.png', '/assets/grass/tile_0001.png'];
  const TILE = 40;

  export default function App() {
    const [currentAnim, setCurrentAnim] = useState(
      () => ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]
    );
    const [dogX, setDogX] = useState(() => Math.random() * (window.innerWidth - 400));
    const [dogY, setDogY] = useState(() => Math.random() * (window.innerHeight * 0.4));
    const [isRed, setIsRed] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [message, setMessage] = useState('');
    const [inputText, setInputText] = useState('');

    const cols = Math.ceil(window.innerWidth / TILE);
    const rows = Math.ceil(window.innerHeight / TILE) + 2;

    const tileMap = useMemo(
      () => Array.from({ length: cols * rows }, () => GRASS[Math.floor(Math.random() * 2)]),
      []
    );

    const handleRefresh = () => {
      setCurrentAnim(ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]);
      setDogX(Math.random() * (window.innerWidth - 400));
      setDogY(Math.random() * (window.innerHeight * 0.4));
    };

    const handleDogClick = () => {
      setCurrentAnim(ANIMATIONS[2]);
      setShowDialog(true);
      setTimeout(() => setShowDialog(false), 3000);
    };

    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', cursor: 'url(/assets/sign/mouse.png), auto' }}>

        {/* 草地背景 */}
        {tileMap.map((src, i) => (
          <img key={i} src={src} style={{
            position: 'absolute',
            left: (i % cols) * TILE,
            top: Math.floor(i / cols) * TILE,
            width: TILE, height: TILE,
          }} />
        ))}


        {/* Refresh 按钮 */}
        <div style={{ position: 'absolute',
                      top: 50,
                      left: 0,
                      right: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      zIndex: 20
                    }}>
          <button onClick={handleRefresh} style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            backgroundColor: '#333', color: 'white',
            border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer',
          }}>
            🦴 refresh
          </button>
        </div>

        {/* 房子 */}
        <div onClick={() => setIsRed(!isRed)} style={{
          position: 'absolute', right: 170, bottom: 270,
          width: 128, height: 128, overflow: 'hidden', cursor: 'pointer',
        }}>
          <img src="/assets/house/DOG_HOUSE.png" style={{
            width: 384, height: 128,
            marginLeft: isRed ? -128 : 0,
          }} />
        </div>

        {/* inlinecss */}
        {/* 告示牌 */}
        <div onClick={() => setShowInput(true)} style={{
          position: 'absolute', right: 300, bottom: 260,
          width: 64, height: 64, cursor: 'pointer', textAlign: 'center',
        }}>
          <img src="/assets/sign/sign.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          {message && <div style={{ fontSize: 15, color: '#f0eaea', fontFamily: "'Press Start 2P', monospace" }}>{message.slice(0, 6)}</div>}
        </div>

        {/* 小狗 */}
        <div onClick={handleDogClick} style={{
          position: 'absolute', left: dogX, top: dogY, cursor: 'pointer',
        }}>

          <SpriteAnimation
            imagePath={currentAnim.path}
            frameCount={currentAnim.frameCount}
            frameWidth={100} frameHeight={100}
            fps={8} scale={4}
          />
        </div>

        {/* 对话气泡 */}
        {showDialog && (
          <div style={{
            position: 'absolute', left: dogX + 15, top: dogY + 130,
            backgroundColor: 'white', borderRadius: 8, padding: 8,
            border: '3px  dashed #fdcdcd', zIndex: 10,
            fontFamily: "'Press Start 2P', monospace", fontSize: 10,
          }}>
            {DIALOGS[Math.floor(Math.random() * DIALOGS.length)]}
          </div>
        )}

        {/* 留言 Modal */}
        {showInput && (
          <div onClick={() => setShowInput(false)} style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              backgroundColor: 'white', borderRadius: 12,
              padding: 24, width: 300, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center',
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 15 }}>Leave a message</div>
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="type here..."
                maxLength={20}
                autoFocus
                style={{ border: '1px solid #f9dede', borderRadius: 6, padding: 8, width: '100%',fontFamily: "'Press Start 2P', monospace", fontSize: 12 }}
              />
              <button onClick={() => { setMessage(inputText); setShowInput(false); }} style={{
                backgroundColor: '#333', color: 'white',
                border: 'none', borderRadius: 6,
                padding: '10px 20px',fontFamily: "'Press Start 2P', monospace",
              }}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }


