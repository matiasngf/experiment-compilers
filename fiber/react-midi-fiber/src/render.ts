/* eslint-disable @typescript-eslint/no-explicit-any */
import Renderer from './renderer'
import MidiWriter from 'midi-writer-js'
import type { Writer } from 'midi-writer-js/build/types/writer'
import type { MidiTrackProps, MidiNoteProps } from '../types'

interface RenderOptions {
  onComplete: (writer: Writer) => void
}

export const render = (element: React.ReactNode, options: RenderOptions) => {
  const container = { children: [] }
  const node = Renderer.createContainer(
    container, // containerInfo
    0, // tag (0 = legacy)
    null, // parentComponent
    false, // isServer
    false, // renderCompleted
    '', // identifierPrefix
    error => {
      // onRecoverableError
      console.error(error)
    },
    null // globalContext
  )

  Renderer.updateContainer(element as any, node, null, () => {
    generateMIDI(container.children, options)
  })
}

interface TrackElement {
  type: 'midiTrack'
  props: Omit<MidiTrackProps, 'children'> & {
    children: MidiInstance[]
  }
}

interface NoteElement {
  type: 'midiNote'
  props: Omit<MidiNoteProps, 'children'> & {
    children: MidiInstance[]
  }
}

type MidiInstance = TrackElement | NoteElement

// Generate MIDI File from JSX
const generateMIDI = (elements: MidiInstance[], options: RenderOptions) => {
  // check that all top elements are tracks
  if (!elements.every(element => element.type === 'midiTrack')) {
    throw new Error('All top elements must be tracks')
  }

  const tracks = elements.map(element => {
    const track = new MidiWriter.Track()
    // Set track properties
    if (element.props.instrument) {
      track.addEvent(
        new MidiWriter.ProgramChangeEvent({
          instrument: element.props.instrument
        })
      )
    }
    element.props.children.forEach(note => {
      if (note.type === 'midiNote') {
        track.addEvent(
          new MidiWriter.NoteEvent({
            pitch: note.props.pitch,
            duration: note.props.duration,
            velocity: note.props.velocity
          })
        )
      }
    })
    return track
  })

  const writer = new MidiWriter.Writer(tracks)
  options.onComplete(writer)
}
