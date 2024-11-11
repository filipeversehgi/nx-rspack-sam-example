import { Injectable } from '@nestjs/common';
import { loadRemote } from '@module-federation/runtime';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomName?: string }> {
    console.log('- Started Get Data');

    let randomNameVal = 'not-defined';
    try {
      const { randomName } = await loadRemote<RandomNameModule>('random-name');
      console.log('-mod', randomName);
      randomNameVal = randomName();
    } catch (error) {
      console.error('- Random Name Error');
      console.log(error);
    }
    console.log('- Random Name Ran');
    return { message: 'Hello API', randomName: randomNameVal };
  }
}
