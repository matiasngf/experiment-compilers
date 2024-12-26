export interface MidiTrackProps {
  instrument?: number
  children: React.ReactNode
}

export interface MidiNoteProps {
  pitch: string | string[]
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
