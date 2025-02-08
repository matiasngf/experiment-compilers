import { useInput } from 'react-ascii'

import { Enemies } from './enemies'
import { Player } from './player'

export function App() {
  useInput(event => {
    if (event.name === 'escape') {
      process.exit(0)
    }
  })
  return (
    <>
      <Enemies />
      <Player />
    </>
  )
}
