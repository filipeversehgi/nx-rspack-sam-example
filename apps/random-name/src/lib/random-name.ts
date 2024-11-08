import { BROWSER_LOG_KEY } from '@module-federation/sdk';

export function randomName(): string {
  return 'random-name' + BROWSER_LOG_KEY;
}
