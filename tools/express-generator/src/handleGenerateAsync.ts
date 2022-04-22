export type GenerateMode = 'development' | 'production';

export const handleGenerate = (mode: GenerateMode, callback?: Function) => {
  console.log({ mode, callback });
  
}

export const handleGenerateAsync = (mode: GenerateMode) => {
  return new Promise<void>((resolve, reject) => {
    handleGenerate(mode, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
}