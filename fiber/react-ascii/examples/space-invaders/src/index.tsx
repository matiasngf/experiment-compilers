import { render } from 'react-ascii'

import { App } from './app'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants'
render(<App />, { width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
