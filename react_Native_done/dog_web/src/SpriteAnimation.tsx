 import { useEffect, useRef, useState } from'react';                                     

  type Props = {
    imagePath: string;
    frameCount: number;                          
    frameWidth: number;
    frameHeight: number;                         
    fps?: number;                              
    scale?: number;
  };                                             
  
  export default function SpriteAnimation({      
    imagePath,
    frameCount,
    frameWidth,         
    frameHeight,
    fps = 8,
    scale = 3,
    }: Props) {
    const [frame, setFrame] = useState(0);
    const intervalRef = useRef<any>(null);       
  
    useEffect(() => {                            
      intervalRef.current = setInterval(() => {
        setFrame((prev) => (prev + 1) % frameCount);                                   
        }, 1000 / fps);
    
        return () => clearInterval(intervalRef.current);
    }, [frameCount, fps]);
                                                 
    return (
      <div style={{                              
        width: frameWidth * scale,             
        height: frameHeight * scale,
        overflow: 'hidden',
        display: 'inline-block',
      }}>
        
        <img
          src={imagePath}                        
          style={{                             
            width: frameWidth * frameCount * scale,                                         
            height: frameHeight * scale,
            marginLeft: -frame * frameWidth * scale,                                       
            display: 'block',
          }}
        />                                       
      </div>
    );                                           
  } 