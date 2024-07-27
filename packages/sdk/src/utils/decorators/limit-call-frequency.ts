export function limitCallFrequency({ timesInSecond, maxSizeInSecond, getSize } : { timesInSecond: number, maxSizeInSecond: number, getSize: (...args: any) => number}) {
  return function (target: any, name: string, descriptor: any) {
    const oldFn = descriptor.value;
    const map = new Map();
    descriptor.value = function (...args: any) {
      let value = map.get(this);
      if (!value) {
        value = {
          callCountInSecond: 0,
          timestamp: 0,
          totalSizeInSecond: 0
        };
        map.set(this, value);
      }
      if (value.timestamp === 0) {
        value.timestamp = Date.now();
      } else if (Date.now() - value.timestamp > 1000) {
        value.timestamp = Date.now();
        value.callCountInSecond = 0;
        value.totalSizeInSecond = 0;
      }
      if (getSize) {
        value.totalSizeInSecond += getSize(...args);
      }
      if (
        value.timestamp !== 0 &&
        Date.now() - value.timestamp < 1000 &&
        (value.callCountInSecond >= timesInSecond || value.totalSizeInSecond > maxSizeInSecond)
      ) {
        throw new Error(JSON.stringify({
          code: -1,
          message: 'limit call error'
        }));
      }
      value.callCountInSecond++;
      return oldFn.apply(this, args);
    };
    return descriptor;
  };
}
