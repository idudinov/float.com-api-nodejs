import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert } from '../utils';
import { LoggedTime, Person, Project, Task } from './types';
import {
    ListLoggedTimeRequest,
    PaginatedResponse,
    PaginationRequest,
    TasksRequestParams,
} from './api.types';

export const Version = 'v3';

const Endpoint = `https://api.float.com/${Version}`;

export type Options = {
    token: string,
    userAgent: string,
};

export class Client {

    private readonly _api: AxiosInstance;

    constructor(readonly options: Options) {
        assert(!!options?.token, 'Float API token should be specified');
        assert(!!options?.userAgent, 'User Agent should be specified (requirements from Float.com: https://dev.float.com/overview_authentication.html#identify-yourself)');

        this._api = axios.create({
            baseURL: Endpoint,
            headers: {
                Authorization : `Bearer ${options.token}`,
                'User-Agent': options.userAgent,
            },
        });
    }

    /**
     * Search for all people in your organization.
     *
     * @returns The list of people */
    async getPeople(pagination: PaginationRequest = null): Promise<PaginatedResponse<Person>> {
        const response = await this._api.get('people', { params: pagination }) as AxiosResponse<Person[]>;
        return getPaginatedResult(response);
    }

    /**
     * List projects
     *
     * @returns The list of projects
     */
    async getProjects() {
        const response = await this._api.get('projects') as AxiosResponse<Project[]>;
        return getPaginatedResult(response);
    }

    /**
     * Returns a list of logged time for the specified person or project within the specified date range
     *
     * @returns An array of logged time entries for the specified person/project between the specified dates
     */
    async getLoggedTime(options: ListLoggedTimeRequest): Promise<LoggedTime[]> {
        const response = await this._api('logged-time', { params: options }) as AxiosResponse<LoggedTime[]>;
        return response.data;
    }

    /**
     * List tasks. This includes any tasks or repeating task sets that start or end within the date range specified.
     *
     * @returns List of tasks.
     */
    async getTasks(params?: TasksRequestParams): Promise<PaginatedResponse<Task>> {
        const response = await this._api('tasks', { params: params });
        return getPaginatedResult(response);
    }
}

function getPaginatedResult<T>(response: AxiosResponse<T[]>): PaginatedResponse<T> {
    return {
        items: response.data,
        totalCount: parseNumber(response.headers['X-Pagination-Total-Count']),
        totalPages: parseNumber(response.headers['X-Pagination-Page-Count']),
        currentPage: parseNumber(response.headers['X-Pagination-Current-Page']),
        perPage: parseNumber(response.headers['X-Pagination-Per-Page']),
    };
}

function parseNumber(v: any): number {
    switch (typeof v) {
        case 'number': {
            return v;
        }

        case 'string': {
            return +v || null;
        }

        default: {
            return undefined;
        }
    }
}
