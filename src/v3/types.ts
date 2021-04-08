
export enum PersonType {
    Employee = 1,
    Contractor = 2,
    UnassignedRole = 3,
}

export enum BoolNumber {
    No = 0,
    Yes = 1,
}

export enum EmployeeType {
    PartTime = 0,
    FullTime = 1,
}

export enum ActiveState {
    Archived = 0,
    Active = 1,
}

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
    auto_email?: BoolNumber,

    /** Full-time or part-type. 1 = Full-time, 0 = Part-time */
    employee_type?: EmployeeType,

    /** Hours that a part-time person is available for scheduling each day in order from Sunday to Saturday  */
    work_days_hours?: number[],

    /** Is this person active or archived? 1 = Active, 0 = Archived  */
    active?: ActiveState,

    /** Is this person an 1 = Employee (default), 2 = Contractor, 3 = Unassigned Role?  */
    people_type_id?: PersonType,

    tags?: PeopleTag[],

    /** Date the person started  */
    start_date?: string,

    /** Date the person finished  */
    end_date?: string,

    /** Default hourly rate for fee-based projects (decimal) */
    default_hourly_rate?: string,

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

export enum BudgetTypes {
    TotalHours = 1,
    TotalFee = 2,
    HourlyFee = 3,
}

export type Project = {
    /** The ID of this project. Read-only: ignored when creating a project  */
    project_id?: number,

    /** The name of the project  */
    name: string,

    /** The ID of the project's client  */
    client_id?: number,

    /** Project's color in hexadecimal  */
    color?: string,

    /** Notes for this project  */
    notes?: string,

    /** List of tags  */
    tags?: string[],

    /** Is there a project budget? 1 = Total hours, 2 = Total fee, 3 = Hourly fee  */
    budget_type?: BudgetTypes,

    /** The budget amount for Total hours or Total fee budgets (decimal)  */
    budget_total?: string,

    /** The default hourly rate for fee-based budgets  */
    default_hourly_rate?: number,

    /** Is this project billable? 0 = Billable, 1 = Non-billable  */
    non_billable?: 0 | 1,

    /** Is this project tentative? 1 = Yes, 0 = No  */
    tentative?: BoolNumber,

    /** Is this project active or archived? 1 = Active, 0 = Archived  */
    active?: ActiveState,

    /** Account ID of the assigned project manager  */
    project_manager?: number,

    /** Do all project managers have scheduling rights? 1 = Yes, 0 = No  */
    all_pms_schedule?: BoolNumber,

    /** Date this record was created (read-only)  */
    created?: string,

    /** Date this record was last modified (read-only) */
    modified?: string,
};

export type ProjectTag = {
    /** The name of the tag  */
    tag_name: string,

    /** The project that this tag belongs to */
    project_id: number,
};

export type Task = {
    /** The ID of this task. Read-only: ignored when creating a task */
    task_id?: number,

    /** The ID of the project that this task belongs to  */
    project_id: number,

    /** The ID of the project phase that this task belongs to  */
    phase_id?: number,

    /** Start date of this task  */
    start_date: string,

    /** End date of this task  */
    end_date: string,

    /** Start time of this task in 24 hr format  */
    start_time?: string,

    /** Number of hours per day to spend on this task  */
    hours: number,

    /** The ID of the person assigned to this task (omit when using people_ids field)  */
    people_id?: number,

    /** List of one or more people IDs assigned to this task (ignored if people_id is set)  */
    people_ids?: number[],

    /** Status of this task. 1 = Tentative, 2 = Confirmed, 3 = Complete  */
    status?: number,

    /** Is this task a priority? 1 = Priority, 0 = Not a priority  */
    priority?: number,

    /** Name of this task  */
    name?: string,

    /** Additional notes about the task  */
    notes?: string,

    /** Frequency that this task repeats. 0 = No repeat, 1 = Weekly, 2 = Monthly, 3 = Every 2 Weeks  */
    repeat_state?: number,

    /** Date that the repeating task will cease  */
    repeat_end_date?: string,

    /** Account ID of person who created this task (read-only)  */
    created_by?: number,

    /** Date this record was created (read-only)  */
    created?: string,

    /** Account ID of person who last modified this task (read-only)  */
    modified_by?: number,

    /** Date this record was last modified (read-only) */
    modified?: string,
};

export type LoggedTime = {
    /** Unique ID of the logged time entry */
    logged_time_id?: string,

    /** Date of the logged time entry */
    date: string,

    hours: number,

    /** Is the logged time entry billable? (1 = true, 0 = false) */
    billable: number,

    /** Additional notes about this logged time entry  */
    notes?: string,

    /** The ID of the person for whom this entry was logged  */
    people_id: number,

    /** The ID of the project on which this entry was logged  */
    project_id: number,

    /** The ID of the project phase for which this entry was logged  */
    phase_id?: number,

    /** The ID of the scheduled task against which this entry was logged  */
    task_id?: number,

    /** The name of the task against which this entry was logged  */
    task_name?: string,

    /** Date/time this record was created. Read-only  */
    created?: string,

    /** ID of the account that created this record read-only  */
    created_by?: number,

    /** Date/time this record was last modified read-only  */
    modified?: string,

    /** ID of the account that last modified this record. read-only */
    modified_by?: number,
};
