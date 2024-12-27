/* eslint-disable @typescript-eslint/no-explicit-any */
import Renderer from './renderer'
import MidiWriter from 'midi-writer-js'
import type { Writer } from 'midi-writer-js/build/types/writer'
import type { MidiTrackProps, MidiNoteProps } from '../types'

import type { Track } from 'midi-writer-js/build/types/chunks/track'

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
  children: React.ReactNode[]
}

interface NoteElement {
  type: 'midiNote'
  props: MidiNoteProps
}

type MidiInstance = TrackElement | NoteElement

function isElementType(element: React.ReactNode | MidiInstance, type: string): boolean {
  return (
    typeof element === 'object' && element !== null && 'type' in element && element.type === type
  )
}

function hasChildren(element: unknown): boolean {
  return Boolean(element && typeof element === 'object' && 'children' in element)
}

// Generate MIDI File from JSX
const generateMIDI = (elements: (React.ReactNode | MidiInstance)[], options: RenderOptions) => {
  // check that all top elements are tracks
  if (!elements.every(element => isElementType(element, 'midiTrack'))) {
    throw new Error('All top elements must be tracks')
  }

  const tracks = elements.map(element => {
    const trackElement = element as TrackElement
    const track = new MidiWriter.Track()
    // Set track properties
    if (trackElement.props.instrument) {
      track.addEvent(
        new MidiWriter.ProgramChangeEvent({
          instrument: trackElement.props.instrument
        })
      )
    }
    ;(trackElement as any).children.forEach((child: any) => parseChilds(child, track))
    return track
  })

  const writer = new MidiWriter.Writer(tracks)
  options.onComplete(writer)
}

function parseChilds(element: React.ReactNode | MidiInstance, track: Track): void {
  if (isElementType(element, 'midiNote')) {
    const noteElement = element as NoteElement
    track.addEvent(
      new MidiWriter.NoteEvent({
        pitch: noteElement.props.pitch,
        velocity: noteElement.props.velocity,
        duration: noteElement.props.duration
      })
    )
  } else {
    if (hasChildren(element)) {
      ;(element as any).children.forEach((child: React.ReactNode | MidiInstance) => {
        parseChilds(child, track)
      })
    }
  }
}
