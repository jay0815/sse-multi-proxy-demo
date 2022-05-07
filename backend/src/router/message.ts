import { Router } from 'express';
import rateLimit from 'express-rate-limit'

// set up rate limiter: maximum of five requests per minute
const limiter = rateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 5
});

const router = Router();

router.use(limiter).get('/', (_, response) => {
    const timer = new Date().valueOf();
    response.set({
        'Content-Type': "application/json; charset=utf-8"
    });
    response.send({
        message: 'server response ok',
        ts: timer,
    })
})

export default router;
