import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assert } from '../utils';
import { PaginatedResponse, PaginationRequest, Person } from './types';

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
    async listPeople(pagination: PaginationRequest = null): Promise<PaginatedResponse<Person>> {
        const response = await this._api.get('people', { params: pagination }) as AxiosResponse<Person[]>;
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
