import { loadRemote } from '@module-federation/runtime';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomColor?: string }> {
    let randomColorVal = 'not-defined';
    try {
      const { randomColor } = await loadRemote<RandomColorName>('random-color');
      // const { randomColor } = await import('random-color')
      randomColorVal = randomColor();
    } catch (error) {
      console.log(error);
    }
    return { message: 'Hello API', randomColor: randomColorVal };
  }
}
