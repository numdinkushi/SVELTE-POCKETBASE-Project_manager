/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Handle } from '@sveltejs/kit';
import type Client from 'pocketbase';
import PocketBase from 'pocketbase';
import type {
  LocalAuthStore,
  CollectionService,
  LogService,
  RealtimeService,
  HealthService,
  RecordService
} from 'pocketbase';

type PocketBaseClient = Client & {
  authStore: LocalAuthStore;
  collections: CollectionService;
  logs: LogService;
  realtime: RealtimeService;
  health: HealthService;
  users: RecordService;
  projects: any
};

interface Locals  {
  pb: PocketBaseClient;
  user?: any;
  projects?: any
}

export const handle: Handle = async ({ event, resolve }) => {
  const pb: PocketBaseClient = new PocketBase('http://localhost:8090') as PocketBaseClient;

  // Ensure the users service is available
  pb.users = pb.collection('users');
  pb.projects = pb.collection('projects');

  (event.locals as Locals).pb = pb;
  (event.locals as Locals).pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if ((event.locals as Locals).pb.authStore.isValid) {
    (event.locals as Locals).user = (event.locals as Locals).pb.authStore.model;
  }

  const response = await resolve(event); 

  // TODO: secure before deployment
  response.headers.set('set-cookie', (event.locals as Locals).pb.authStore.exportToCookie({ secure: false }));

  return response;
};
