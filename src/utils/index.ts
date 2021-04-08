
export function assert(condition: boolean, error: string | Error): asserts condition {
    if (condition) {
        return;
    }

    if (typeof error === 'string') {
        throw new Error(error);
    }

    throw error;
}
