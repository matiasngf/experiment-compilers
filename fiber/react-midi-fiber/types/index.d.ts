/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MidiTrackProps {
  key?: any
  instrument?: number
  children: React.ReactNode
}

export interface MidiNoteProps {
  pitch: string | string[]
  key?: any
  velocity?: number
  duration: number
}

interface MidiElements {
  midiTrack: MidiTrackProps
  midiNote: MidiNoteProps
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends MidiElements {}
  }
}
