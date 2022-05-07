export interface ChunkData {
    id?: string | number;
    event?: string;
    data: unknown;
}

export type Initial = string | number | Record<string, unknown> | string[] | number[] | Record<string, unknown>[] | (string|number|Record<string, unknown>)[];
export type Options = {
    isSerialized?: boolean;
    initialEvent?: string;
    isCompressed?: boolean;
} & Record<string, unknown>;

export type SSEInitial = Exclude<Initial, string | number | Record<string, unknown>>;