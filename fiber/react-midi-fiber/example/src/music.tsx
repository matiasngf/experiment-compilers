import { Fragment } from 'react'

// Melody patterns
function MainTheme() {
  return (
    <>
      {/* Main motif */}
      <midiNote pitch={['C5']} duration={4} velocity={100} />
      <midiNote pitch={['E5']} duration={4} velocity={100} />
      <midiNote pitch={['G5']} duration={4} velocity={100} />
      <midiNote pitch={['C6']} duration={8} velocity={100} />

      {/* Response */}
      <midiNote pitch={['B5']} duration={4} velocity={90} />
      <midiNote pitch={['G5']} duration={4} velocity={90} />
      <midiNote pitch={['E5']} duration={8} velocity={90} />
    </>
  )
}

// Bass pattern with a space-y feel
function BassPattern() {
  return (
    <>
      <midiNote pitch={['C2']} duration={8} velocity={85} />
      <midiNote pitch={['G2']} duration={8} velocity={75} />
      <midiNote pitch={['C3']} duration={8} velocity={70} />
      <midiNote pitch={['G2']} duration={8} velocity={75} />
    </>
  )
}

// Arpeggiated background pattern
function SpaceArpeggio() {
  const arpeggioNotes = [
    { pitch: ['C4', 'E4'], duration: 16 },
    { pitch: ['E4', 'G4'], duration: 16 },
    { pitch: ['G4', 'C5'], duration: 16 },
    { pitch: ['E4', 'G4'], duration: 16 }
  ]

  return (
    <>
      {arpeggioNotes.map((note, i) => (
        <midiNote key={i} pitch={note.pitch} duration={note.duration} velocity={60} />
      ))}
    </>
  )
}

export function SpaceAdventure() {
  return (
    <>
      {/* Lead Synth */}
      <midiTrack instrument={81}>
        <MainTheme />
        <MainTheme />
      </midiTrack>

      {/* Bass Track */}
      <midiTrack instrument={38}>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Fragment key={i}>
              <BassPattern />
            </Fragment>
          ))}
      </midiTrack>

      {/* Arpeggiated Background */}
      <midiTrack instrument={91}>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <Fragment key={i}>
              <SpaceArpeggio />
            </Fragment>
          ))}
      </midiTrack>
    </>
  )
}
