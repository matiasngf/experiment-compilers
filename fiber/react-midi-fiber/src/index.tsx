import { render } from './render'
import fs from 'fs'

const App = () => (
  <>
    {/* Drums - Track 1 (Channel 10 is typically for drums in MIDI) */}
    <midiTrack instrument={10}>
      {/* Basic four-on-the-floor beat */}
      {Array(16)
        .fill(null)
        .map((_, i) => (
          <>
            <midiNote pitch={['C2']} duration={4} velocity={i % 4 === 0 ? 100 : 80} /> {/* Kick */}
            {i % 2 === 1 && <midiNote pitch={['F#2']} duration={4} velocity={90} />} {/* Hi-hat */}
            {i % 4 === 2 && <midiNote pitch={['D2']} duration={4} velocity={85} />} {/* Snare */}
          </>
        ))}
    </midiTrack>

    {/* Bass Synth - Track 2 */}
    <midiTrack instrument={38}>
      {/* Synth Bass */}
      {/* Bass line pattern */}
      <midiNote pitch={['C2']} duration={8} />
      <midiNote pitch={['C2']} duration={8} />
      <midiNote pitch={['G2']} duration={8} />
      <midiNote pitch={['E2']} duration={8} />
      {/* Repeat pattern */}
      <midiNote pitch={['F2']} duration={8} />
      <midiNote pitch={['F2']} duration={8} />
      <midiNote pitch={['C2']} duration={8} />
      <midiNote pitch={['G2']} duration={8} />
    </midiTrack>

    {/* Lead Synth - Track 3 */}
    <midiTrack instrument={81}>
      {/* Lead Synth */}
      {/* Main melody */}
      <midiNote pitch={['C4', 'E4']} duration={4} />
      <midiNote pitch={['G4']} duration={8} />
      <midiNote pitch={['F4']} duration={8} />
      <midiNote pitch={['E4']} duration={4} />
      <midiNote pitch={['C4']} duration={4} />
      <midiNote pitch={['D4', 'F4']} duration={4} />
      <midiNote pitch={['E4']} duration={8} />
      <midiNote pitch={['G4']} duration={8} />
    </midiTrack>

    {/* Pad Synth - Track 4 */}
    <midiTrack instrument={91}>
      {/* Pad Synth */}
      {/* Atmospheric pads */}
      <midiNote pitch={['C3', 'E3', 'G3']} duration={16} velocity={60} />
      <midiNote pitch={['F3', 'A3', 'C4']} duration={16} velocity={60} />
    </midiTrack>
  </>
)

render(<App />, {
  onComplete: writer => {
    fs.writeFileSync('output.mid', writer.buildFile())
    console.log('MIDI saved as output.mid')
  }
})
