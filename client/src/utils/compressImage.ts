import Compressor from 'compressorjs';
async function compressImage(image: any) {

  try {
    const compressedFile = await new Promise<File | any>((resolve, reject) => {
      new Compressor(image, {
        quality: 0.6,
        maxWidth: 500,
        maxHeight: 500,
        success: (result: any) => {
          resolve(result);
        },
        error: (error: any) => {
          console.error('Error compressing image:', error);
          reject()
        },
      });
    });

    return compressedFile

  } catch (error: any) {
    return { error: error?.message }
  }
}


export default compressImage