import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'

import { render } from 'react-midi-fiber'

import { SpaceAdventure } from './music'

function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  const [parsedMidi, setParsedMidi] = useState<Midi | null>(null)

  const isPlayingRef = useRef(isPlaying)
  isPlayingRef.current = isPlaying

  // load midi

  useEffect(() => {
    render(<SpaceAdventure />, {
      onComplete: writer => {
        // parse midi
        const midiData = writer.buildFile()
        const parsedMidi = new Midi(midiData)
        setParsedMidi(parsedMidi)
        setLoading(false)
      }
    })
  }, [])

  // play midi

  const synthsRef = useRef<Tone.PolySynth[]>([])

  useEffect(() => {
    if (!parsedMidi) return
    if (isPlaying) {
      const now = Tone.now() + 0.01

      parsedMidi.tracks.forEach(track => {
        const synth = new Tone.PolySynth(Tone.Synth, {
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1
          }
        }).toDestination()
        synthsRef.current.push(synth)
        // schedule all notes
        track.notes.forEach(note => {
          synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
        })
      })
    } else {
      while (synthsRef.current.length) {
        const synth = synthsRef.current.shift()
        synth?.disconnect()
      }
    }
  }, [parsedMidi, isPlaying])

  return (
    <>
      {loading && <div>Loading...</div>}
      <button id="play-button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Play'} Music
      </button>
    </>
  )
}

function App() {
  return (
    <>
      <Player />
    </>
  )
}

export default App
