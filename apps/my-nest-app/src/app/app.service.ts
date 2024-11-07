import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomName?: string }> {
    // console.log({ BROWSER_LOG_KEY });
    // const { randomName } = await import('random-name');
    // return { message: 'Hello API', randomName: randomName() };
    return { message: 'Hello Im a MF Remote API!' };
  }
}
