# react-midi-fiber

*A React renderer for midi files.*

The objetive of this experiment is to learn how to use fiber to create a custom renderer for react.

## Usage

```tsx
import { render } from 'react-midi-fiber'

const App = () => (
  <>
    <midiTrack instrument={81}>
      <midiNote pitch={['C5']} duration={4} velocity={100} />
      <midiNote pitch={['E5']} duration={4} velocity={100} />
      <midiNote pitch={['G5']} duration={4} velocity={100} />
      <midiNote pitch={['C6']} duration={8} velocity={100} />
    </midiTrack>
  </>
)

render(<App />, {
  onComplete: writer => {
    // get data
    const midiData = writer.buildFile()

    // save file or play it
    fs.writeFileSync(path.join(__dirname, 'output.mid'), midiData)
  }
})
```

## Components

### midiTrack

Renders a midi track.

### props

- `instrument`: The instrument to use for the track.

### midiNote

Renders a midi note.

### props

- `pitch`: The pitch of the note.
- `duration`: The duration of the note.
- `velocity`: The velocity of the note.
