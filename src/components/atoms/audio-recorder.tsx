'use client'

import { useEffect, useRef, useState } from 'react'
import Spinner from './spinner'
import { createAudioAction } from './actions'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

type AudioRecorderProps = {
  className?: string
  entryId: TypeEntryRefined['id']
}

export default function AudioRecorder({
  className,
  entryId,
}: AudioRecorderProps) {
  const audioChunks = useRef<Blob[]>([])
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream!)

        recorder.ondataavailable = (e) => {
          audioChunks.current.push(e.data)
        }

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: 'audio/webm',
          })
          audioChunks.current = []

          const audioFile = new File(
            [audioBlob],
            `recording-${Date.now()}.webm`,
            {
              type: 'audio/webm',
            },
          )

          try {
            await createAudioAction({ audioFile, entryId })

            alert('✅ Enregistrement réussi !')
          } catch (err) {
            console.error('❌ Erreur upload :', err)
            alert('Erreur lors de l’enregistrement.')
          }
        }

        setMediaRecorder(recorder)
      })
    }
  }, [entryId])

  const startRecording = () => {
    if (mediaRecorder) {
      audioChunks.current = []
      mediaRecorder.start()
      setRecording(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setRecording(false)
    }
  }

  return (
    <>
      <div
        onMouseDown={startRecording} // For desktop
        // onTouchStart={startRecording} // For mobile
        onMouseUp={stopRecording} // For desktop
        // onTouchEnd={stopRecording} // For mobile
        // onClick={handleToggleRecording}
        className={`button-primary text-center ${className}`}
      >
        {recording ? (
          <Spinner className="h-[24px] w-[24px] mx-auto" />
        ) : (
          'Maintenir pour enregistrer'
        )}
      </div>
    </>
  )
}
