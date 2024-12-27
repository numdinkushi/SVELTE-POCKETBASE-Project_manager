import type Client from 'pocketbase';
import type {
    LocalAuthStore,
    CollectionService,
    LogService,
    RealtimeService,
    HealthService,
    RecordService,
} from 'pocketbase';

// Define the type for the PocketBase client with additional services
export type PocketBaseClient = Client & {
    authStore: LocalAuthStore;
    collections: CollectionService;
    logs: LogService;
    realtime: RealtimeService;
    health: HealthService;
    users: RecordService;
    projects: RecordService;
};

// Define the type for the user object
export interface User {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    verified: boolean;
}

// Define the type for the locals object
export interface Locals {
    pb: PocketBaseClient;
    user?: User;
}
