import { loadRemote } from '@module-federation/runtime';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomColor?: string }> {
    let randomColorVal = 'not-defined';
    try {
      console.log('Loading remote module');
      const { randomColor } = await loadRemote<RandomColorName>('random-color');
      // const { randomColor } = await import('random-color')
      console.log('Random color', randomColor);
      randomColorVal = randomColor();
    } catch (error) {
      console.log('Error loading remote module');
      console.log(error);
    }
    return {
      message: 'Hello API, Hello Again!',
      randomColor: randomColorVal + '-updated',
    };
  }
}
