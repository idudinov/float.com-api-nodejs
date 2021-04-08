
export type PaginatedResponse<T> = {
    items: T[],
    totalCount: number,
    totalPages: number,
    currentPage: number,
    perPage: number,
};

export type PaginationRequest = {
    page: number,
    'per-page': number,
};

export type DateRangeParams = {
    /** Start of date range in format YYYY-MM-DD */
    start_date?: string,

    /** End of date range in format YYYY-MM-DD */
    end_date?: string,
};

export type ListLoggedTimeRequest = DateRangeParams & {
    /** ID of the person for whom to list logged time. **Required if project_id omitted** */
    people_id: number,

    /** ID of the project for which to list logged time. **Required if people_id omitted** */
    project_id: number,
};

export type TasksRequestParams = Partial<ListLoggedTimeRequest>;
