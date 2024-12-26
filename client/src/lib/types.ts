import type Client from 'pocketbase';

import type {
    LocalAuthStore,
    CollectionService,
    LogService,
    RealtimeService,
    HealthService,
    RecordService
} from 'pocketbase';

export type PocketBaseClient = Client & {
    authStore: LocalAuthStore;
    collections: CollectionService;
    logs: LogService;
    realtime: RealtimeService;
    health: HealthService;
    users: RecordService;
};


