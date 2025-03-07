/** Renderer container for JSCAD */

import { createImageGenerator } from '@/utils/run-generation'
import { ChildrenManager } from '../utils/children-manager'
import { Instance, TextInstance } from '@/fiber/types'

export interface ContainerParams {
  containerElement: HTMLImageElement
  apiKey: string
}

export class Container {

  private containerElement: HTMLImageElement
  private imageGenerator: ReturnType<typeof createImageGenerator>


  constructor(params: ContainerParams) {
    this.containerElement = params.containerElement
    this.imageGenerator = createImageGenerator(params.apiKey)
  }

  public children = new ChildrenManager<Instance | TextInstance>()

  queue: RenderQueueItem[] = []

  get prompt() {
    return `
      I have a structure that describes my scene.
      This structure is a JSON object that represents a scene that you need to draw like a painting.
      Even tho it's expressed in JSON, this IT IS NOT A UI, it can be a realistic image or painting.
      This is more like a description of a scene, not a UI.
      STRUCTURE:
      ${JSON.stringify(this.children.array.map(c => c.getJson()))}
    `
  }

  public async render() {
    

    const now = Date.now()
    const controller = new AbortController()

    const queueElement: RenderQueueItem = {
      id: crypto.randomUUID(),
      prompt: this.prompt,
      status: 'idle',
      timestamp: now,
      controller,
      run: async () => {
        queueElement.status = 'pending'
        try {
          const imageUrl = await this.imageGenerator(this.prompt, "1024x1024", controller.signal)
          this.containerElement.src = imageUrl
          console.log('done');
          queueElement.status = 'success'
          // filter other queries
          this.queue = this.queue.filter(item => item.timestamp >= now)
          this.runQueries()
        } catch (error) {
          queueElement.status = 'error'
          console.error(error)
          this.runQueries()
        }
      }
    }

    this.queue.push(queueElement)

    this.runQueries()
  }

  private runQueries() {
    console.log('runQueries', (Object.values(this.queue).map(item => ({status: item.status, id: item.id}))))
    // filter error queries
    this.queue = this.queue.filter(item => item.status !== 'error')

    if (this.queue.length === 0) return

    const latest = this.queue[this.queue.length - 1]

    if (latest.status === 'pending' || latest.status === 'success') {
      console.log('latest is pending or solved');
      return
    }

    const latestTime = latest.timestamp

    const activeQueries = this.queue.filter(item => {
      const isPending = item.status === 'pending'
      const isYoungerThan1Second = latestTime - item.timestamp < 1000

      return isPending && isYoungerThan1Second
    })

    console.log({activeQueries});
    
  
    // there is a current query waiting, don't run another one
    if (activeQueries.length > 0) {
      console.log('there is a current query waiting, don\'t run another one');
      return
    }

    // no pendign queries, get the latestle and run it
    const idleQueries = this.queue.filter(item => item.status === 'idle')

    
    if (idleQueries.length === 0) {
      console.log('no idle queries, don\'t run another one');
      return
    }
    
    console.log({idleQueries});

    const idleQuery = idleQueries[idleQueries.length - 1]

    idleQuery.run()

    console.log('running', idleQuery.id);
  }
}

interface RenderQueueItem {
  id: string
  prompt: string
  status: 'idle' | 'pending' | 'success' | 'error'
  timestamp: number
  controller: AbortController
  run: () => Promise<void>
}
