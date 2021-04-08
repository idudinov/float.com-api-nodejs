
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

export type Person = {
    /** The unique identifier for this person. Read-only: ignored when creating a person */
    people_id?: number,

    /** The person's full name  */
    name: string,

    /** Email address for this person */
    email?: string,

    /** The person's job title */
    job_title?: string,

    department?: Department,

    /** Any notes related to this person */
    notes?: string,

    /** Filename of thumbnail image for this person (read-only)  */
    avatar_file?: string,

    /** Should this person's schedule be emailed at start of week? 1 = Yes, 0 = No */
    auto_email?: number,

    /** Full-time or part-type. 1 = Full-time, 0 = Part-time */
    employee_type?: number,

    /** Hours that a part-time person is available for scheduling each day in order from Sunday to Saturday  */
    work_days_hours?: number[],

    /** Is this person active or archived? 1 = Active, 0 = Archived  */
    active?: number,

    /** Is this person an 1 = Employee (default), 2 = Contractor, 3 = Unassigned Role?  */
    people_type_id?: number,

    tags?: PeopleTag[],

    /** Date the person started  */
    start_date?: string,

    /** Date the person finished  */
    end_date?: string,

    /** Default hourly rate for fee-based projects  */
    default_hourly_rate?: number,

    /** Date this record was created (read-only)  */
    created?: string,

    /** Date this record was last modified (read-only) */
    modified?: string,
};

export type Department = {
    /** The ID of this department. Read-only  */
    department_id?: number,

    /** The name of the department */
    name: string,
};

export type PeopleTag = {
    /** The name of the tag */
    name: string,
};

