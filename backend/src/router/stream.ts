import { Router } from 'express';
import SSE from '../core/sse';

const router = Router();


const sleep = (t: number) => new Promise((resolve) => setTimeout(() => resolve(void 0), t));

router.get<'/:id', { id: string }>('/:id', (request, response) => {
    const ts = request.params.id;
    const localSSE = new SSE([`${ts} hello!`])
    localSSE.init(request, response);
    let count = 0;
    let tm = setInterval(async () => {
        const random = Math.floor(Math.random() * 10);
        localSSE.send(JSON.stringify({
            data: new Array(random).fill(0).map((_, i) => i),
            ts,
            timer: new Date().valueOf()
        }), 'data');
        count++;
        if (count === 5) {
            await sleep(3000);
            localSSE.send(JSON.stringify({
                isEnd: true,
                ts,
                timer: new Date().valueOf()
            }), 'data');
            clearInterval(tm);
        }
    }, 20 * 1000);
})

export default router;
