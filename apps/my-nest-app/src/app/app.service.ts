import { BROWSER_LOG_KEY } from '@module-federation/sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomName?: string }> {
    console.log({ BROWSER_LOG_KEY });
    const { randomName } = await import('random-name');
    return { message: 'Hello API', randomName: randomName() };
  }
}
