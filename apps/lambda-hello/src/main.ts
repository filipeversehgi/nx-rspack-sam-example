import { loadRemote } from '@module-federation/runtime';

async function bootstrapLoad() {
  const { bootstrap } = await loadRemote<MyNestApp>('my-nest-app');
  // const { bootstrap } = await import('my-nest-app');

  bootstrap();
}

void bootstrapLoad();
