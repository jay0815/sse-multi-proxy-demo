import { useEffect, useRef, useState } from "react";

const useSSE = <T extends Record<string, unknown>>(url: string) => {
    const [state, setState] = useState<T>();

    const source = useRef<EventSource>();

    const connectTarget = (id: number) => {
        if ('EventSource' in window) {
            source.current = new EventSource(`${url}/${id}`, { withCredentials: false });
            source.current.addEventListener('open', () => {
                console.log('SSE has connected', source.current?.readyState);
                console.log('event state', source.current?.readyState)
            })
            source.current.addEventListener('data', (e) => {
                const res = JSON.parse(JSON.parse(e.data));
                if (Object.prototype.hasOwnProperty.call(res, 'isEnd') && +res.timer === id) {
                    console.log('SSE dispose');
                    source.current?.close();
                    source.current = undefined;
                }
            });
            source.current.addEventListener('error', () => {
                console.log('SSE has some error', source.current?.readyState);
                source.current?.close();
                source.current = undefined;
            });
        }
    }

    useEffect(() => {
        return () => {
            if (source.current) {
                console.log('SSE dispose');
                source.current.close();
                source.current = undefined;
            }
        }
    }, [])

    return [state, connectTarget];
}

export default useSSE;