import { useCallback, useEffect, useRef, useState } from 'react'
import musicSrc from '../assets/TalkingCuteChiptune.mp3'

export function useChiptuneMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(musicSrc)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    audioRef.current?.play()
    setIsPlaying(true)
  }, [])

  const stop = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    isPlaying ? stop() : play()
  }, [isPlaying, play, stop])

  return { isPlaying, toggle }
}
