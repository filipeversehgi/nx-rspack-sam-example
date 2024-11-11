import { loadRemote } from '@module-federation/runtime';

async function bootstrapLoad() {
  const { bootstrap } = await loadRemote<MyNestApp>('my-nest-app');

  bootstrap();
}

void bootstrapLoad();
