import promiseRetry from '../retry';

interface promiseRetryDecoratorArguments{
  settings: { retries: number, timeout: number; },
  onError?: (error: any, retry: () => void, reject: (reason?: any) => void) => void,
  onRetrying?: (retryCount: number, stopRetry?: () => void) => void,
  onRetryFailed?: (err: any) => void,
  context?: any;
}

/**
 * @param {Object} settings
 * @param {number} [settings.retries = 5]
 * @param {number} [settings.timeout = 2000]
 * @param {Function} [settings.onError]
 * @param {Function} [settings.onRetrying]
 * @param {Function} [settings.onRetryFailed]
 */
export default function promiseRetryDecorator({ settings = { retries: 5, timeout: 2000 }, onError, onRetrying, onRetryFailed } : promiseRetryDecoratorArguments) {
  return function (_target: any, _name: any, descriptor: any) {
    const oldFn = promiseRetry({
      retryFunction: descriptor.value,
      settings,
      onError,
      onRetrying,
      onRetryFailed
    });

    descriptor.value = function (...args: any[]) {
      return oldFn.apply(this, args);
    };
    return descriptor;
  };
}
