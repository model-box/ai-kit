export function avoidRepeatedCall() {
  return function (target: any, name: string, descriptor: any) {
    const oldFn = descriptor.value;
    const isCallingSet = new Set();

    descriptor.value = async function (...args: any[]) {
      if (isCallingSet.has(this)) {
        throw new Error(JSON.stringify({
          code: -1,
          message: 'avoid repeated call'
        }));
      }
      try {
        isCallingSet.add(this);
        const result = await oldFn.apply(this, args);

        isCallingSet.delete(this);
        return result;
      } catch (error) {
        isCallingSet.delete(this);
        throw error;
      }
    };
    return descriptor;
  };
}
