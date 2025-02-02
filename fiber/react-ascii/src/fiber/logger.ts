import fs from 'fs'
import path from 'path'

class Logger {
  private logFile: string

  constructor(logFile = 'debug.log') {
    this.logFile = path.resolve(process.cwd(), logFile)

    // Create log file if it doesn't exist
    if (!fs.existsSync(this.logFile)) fs.writeFileSync(this.logFile, '')
  }

  log(...args: unknown[]): void {
    const timestamp = new Date().toISOString()
    const logItems = args.map(arg => {
      if (arg === null) return 'null'
      if (arg === undefined) return 'undefined'
      if (typeof arg === 'object') return JSON.stringify(arg)
      return String(arg)
    })

    const logMessage = `[${timestamp}] ${logItems.join(' ')}\n`

    try {
      fs.appendFileSync(this.logFile, logMessage)
    } catch (error) {
      console.error('Failed to write to log file:', error)
    }
  }
}

export const logger = new Logger()
