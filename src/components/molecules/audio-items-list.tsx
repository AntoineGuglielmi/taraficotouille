'use client'

import { Play, Pause } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type AudioItemsListProps = {
  className?: string
  audios: Array<{
    audio: ArrayBuffer
    audioId: string
  }>
}

export default function AudioItemsList({
  className,
  audios,
}: AudioItemsListProps) {
  const [audiosURLS, setAudiosURLS] = useState<
    Array<{
      audioUrl: string
      audioId: string
    }>
  >([])

  // Refs pour chaque élément audio
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})

  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null,
  )

  useEffect(() => {
    setAudiosURLS(
      audios.map(({ audio, audioId }) => {
        const blob = new Blob([audio], { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(blob)
        return { audioUrl, audioId }
      }),
    )
  }, [audios])

  const toggleAudio = (audioId: string) => {
    const audio = audioRefs.current[audioId]

    if (!audio) return

    if (currentlyPlayingId === audioId) {
      audio.pause()
      audio.currentTime = 0
      setCurrentlyPlayingId(null)
    } else {
      // Stop the previous one
      if (currentlyPlayingId && audioRefs.current[currentlyPlayingId]) {
        audioRefs.current[currentlyPlayingId]?.pause()
        audioRefs.current[currentlyPlayingId]!.currentTime = 0
      }

      audio.play()
      setCurrentlyPlayingId(audioId)

      // Reset state when audio ends
      audio.onended = () => {
        setCurrentlyPlayingId(null)
      }
    }
  }

  return (
    <ul className={`flex gap-2 ${className}`}>
      {audiosURLS.map(({ audioUrl, audioId }) => (
        <li key={audioId}>
          <div className="flex items-center gap-2">
            <div
              onClick={() => toggleAudio(audioId)}
              className="h-[50px] w-[50px] rounded-full bg-amber-500 flex items-center justify-center cursor-pointer"
            >
              {currentlyPlayingId === audioId ? (
                <Pause className="text-white" />
              ) : (
                <Play className="text-white" />
              )}
            </div>
            <audio
              src={audioUrl}
              ref={(el) => {
                audioRefs.current[audioId] = el
              }}
              className="hidden"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
