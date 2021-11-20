export default function promiseTimeout(ms) {
  let timeoutRef;
  let rejectRef;

  const delay = new Promise((resolve, reject) => {
    timeoutRef = setTimeout(() => {
      resolve('timeout done');
    }, ms);
    rejectRef = () => {
      reject(new Error('cancel timeout'));
    };
  });

  return {
    delay,
    cancel() {
      clearTimeout(timeoutRef);
      rejectRef();
    },
  };
}