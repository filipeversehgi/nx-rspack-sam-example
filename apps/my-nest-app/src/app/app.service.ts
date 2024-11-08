import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomName?: string }> {
    console.log('- Started Get Data');

    let randomNameVal = 'not-defined';
    try {
      const mod = await import('@nx-lambda/random-name');
      console.log('-mod', mod);
      randomNameVal = mod.randomName();
    } catch (error) {
      console.error('- Random Name Error');
      console.log(error);
    }
    console.log('- Random Name Ran');
    return { message: 'Hello API', randomName: randomNameVal };
  }
}
