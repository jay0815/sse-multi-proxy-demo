import { Response } from 'express'
import { ChunkData } from './type';

export const dataListener = (res: Response, id: number) => (data: ChunkData) => {
    if (data.id) {
        res.write(`id: ${data.id}\n`);
    } else {
        res.write(`id: ${id}\n`);
        id += 1;
    }
    if (data.event) {
        res.write(`event: ${data.event}\n`);
    }
    res.write(`data: ${JSON.stringify(data.data)}\n\n`);
    res.flushHeaders();
};

export const serializeListener = (res: Response, id: number) => <T extends unknown[]>(data: T) => {
    const serializeSend = data.reduce((all, msg) => {
        all += `id: ${id}\ndata: ${JSON.stringify(msg)}\n\n`;
        id += 1;
        return all;
    }, '');
    res.write(serializeSend);
};