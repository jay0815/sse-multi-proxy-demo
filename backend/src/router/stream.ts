import { Router } from 'express';
import SSE from '../core/sse';

const router = Router();

router.get<'/:id', { id: string }>('/:id', (request, response) => {
    const timer = request.params.id;
    const localSSE = new SSE([`${timer} hello!`])
    localSSE.init(request, response);
    let count = 0;
    let tm = setInterval(() => {
        localSSE.send(JSON.stringify({
            data: [1,2,3,4,5,6,7],
            timer,
        }), 'data');
        count++;
        if (count === 2) {
            localSSE.send(JSON.stringify({
                isEnd: true,
                timer
            }), 'data');
            clearInterval(tm);
        }
    }, 20 * 1000);
})

export default router;
