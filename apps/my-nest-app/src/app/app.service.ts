import { BROWSER_LOG_KEY } from '@module-federation/sdk';
import { Injectable } from '@nestjs/common';
import { loadRemote } from '@module-federation/runtime';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; randomName?: string }> {
    console.log({ BROWSER_LOG_KEY });
    // @ts-ignore
    const { randomName } = await loadRemote('RandomName');
    return { message: 'Hello API', randomName: randomName() };
  }
}
