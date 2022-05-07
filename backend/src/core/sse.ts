import { EventEmitter } from 'events';
import { dataListener, serializeListener } from './utils';
import type { Request, Response } from 'express';
import type { Initial, Options, SSEInitial } from './type';
/**
 * Server-Sent Event instance class
 * @extends EventEmitter
 */
class SSE extends EventEmitter {
    options: Options;
    /**
     * init connect message
     * 
     * this is the first message which send to client
     * 
     */
    initial: SSEInitial = [];
  /**
   * Creates a new Server-Sent Event instance
   * 
   * @param initial init first send message
   * 
   * @param options tell sse server how deal with init message
   */
    constructor(initial?: Initial, options?: Options) {
        super();
        this.updateInit(initial);
        if (options) {
          this.options = options;
        } else {
          this.options = { isSerialized: true };
        }
    }

    /**
     * The SSE route handler
     */
    init = <RT extends Request, RP extends Response>(req: RT, res: RP) => {
        let id = 0;
        req.socket.setTimeout(0);
        req.socket.setNoDelay(true);
        req.socket.setKeepAlive(true);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('X-Accel-Buffering', 'no');
        if (req.httpVersion !== '2.0') {
          res.setHeader('Connection', 'keep-alive');
        }
        if (this.options.isCompressed) {
          res.setHeader('Content-Encoding', 'deflate');
        }

        // Increase number of event listeners on init
        this.setMaxListeners(this.getMaxListeners() + 2);

        this.on('data', dataListener(res, id));

        this.on('serialize', serializeListener(res, id));

        if (this.initial.length) {
          if (this.options.isSerialized) {
              this.serialize(this.initial);
          } else if (this.initial.length > 0) {
              this.send(this.initial, this.options.initialEvent);
          }
        }

        // Remove listeners and reduce the number of max listeners on client disconnect
        req.on('close', () => {
          console.log('sse close')
          this.removeListener('data', dataListener);
          this.removeListener('serialize', serializeListener);
          this.setMaxListeners(this.getMaxListeners() - 2);
        });
    }

  /**
   * Update the data initially served by the SSE stream
   * @param {array} data array containing data to be served on new connections
   */
  updateInit = (data?: Initial) => {
    if (data) {
      this.initial = Array.isArray(data) ? data : [data];
    }
  }

  /**
   * Empty the data initially served by the SSE stream
   */
  dropInit() {
    this.initial = [];
  }

  /**
   * Send data to the SSE
   * @param {(object|string)} data Data to send into the stream
   * @param [string] event Event name
   * @param [(string|number)] id Custom event ID
   */
  send(data: Initial, event?: string, id?: number) {
    this.emit('data', { data, event, id });
  }

  /**
   * Send serialized data to the SSE
   * @param {array} data Data to be serialized as a series of events
   */
  serialize(data: Initial) {
    if (Array.isArray(data)) {
      this.emit('serialize', data);
    } else {
      this.send(data);
    }
  }
}

export default SSE;
