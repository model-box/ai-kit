import { isFunction, isUndefined } from '../utils';

const RETRY_STATE_NOT_START = 0;
const RETRY_STATE_STARTED = 1;
const RETRY_STATE_STOPPED = 2;

interface retryArguments<T> {
  retryFunction: (...args: any[]) => Promise<T>,
  settings: { retries: number, timeout: number; },
  onError?: (error: any, retry: () => void, reject: (reason?: any) => void) => void,
  onRetrying?: (retryCount: number, stopRetry?: () => void) => void,
  onRetryFailed?: (err: Error) => void,
  context?: any;
}
function promiseRetry<T>({ retryFunction, settings, onError, onRetrying, onRetryFailed, context }: retryArguments<T>): (arg?: any) => Promise<T> {
  return function (this: any, ...args) {
    const retries =  settings.retries || 5;
    let retryCount = 0;
    let timer = -1;
    let retryState = RETRY_STATE_NOT_START;
    const run = async (resolve: (arg: any) => void, reject: (arg: any) => void) => {
      const ctx = context || this;
      try {
        const result = await retryFunction.apply(ctx, args);
        retryCount = 0;
        resolve(result);
      } catch (error) {
        const stopRetry = () => {
          clearTimeout(timer);
          retryCount = 0;
          retryState = RETRY_STATE_STOPPED;
          reject(error);
        };
        const retry = () => {
          if (retryState !== RETRY_STATE_STOPPED && retryCount < retries) {
            retryCount++;
            retryState = RETRY_STATE_STARTED;
            if (isFunction(onRetrying)) {
              // @ts-ignore
              onRetrying.call(this, retryCount, stopRetry);
            }
            timer = window.setTimeout(
              () => {
                timer = -1;
                run(resolve, reject);
              },
              isUndefined(settings.timeout) ? 1000 : settings.timeout
            );
          } else {
            stopRetry();
            if (isFunction(onRetryFailed)) {
              // @ts-ignore
              onRetryFailed.call(this, error);
            }
          }
        };
        if (isFunction(onError)) {
          // @ts-ignore
          onError.call(ctx, error, retry, reject);
        } else {
          retry();
        }
      }
    };

    return new Promise(run);
  };
}

export default promiseRetry;
