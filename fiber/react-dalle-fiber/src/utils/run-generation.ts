interface OpenAIResponse {
  data: { url: string }[]
}

export const createImageGenerator = (key: string) =>
  async function generate(
    prompt: string,
    resolution: '1024x1024' = '1024x1024',
    signal: AbortSignal
  ): Promise<string> {
    // return await test()

    const API_KEY: string = key // Replace with your OpenAI API key
    const API_URL: string = 'https://api.openai.com/v1/images/generations'

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          size: resolution,
          n: 1
        }),
        signal
      })

      if (!response.ok) {
        console.error('Error generating image:', await response.json())
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: OpenAIResponse = await response.json()
      return data.data[0].url
    } catch (error: any) {
      console.error('Error generating image:', error.message)
      throw new Error('Failed to generate image')
    }
  }

export function test() {
  // debug promise
  const randomTime = Math.random() * 2500 + 2000

  const shouldFail = Math.random() < 0.05

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to generate image'))
      } else {
        resolve('https://placecats.com/300/200')
      }
    }, randomTime)
  })
}
