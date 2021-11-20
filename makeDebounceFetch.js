import timeout from './promiseTimeout';

export default function makeDebounceFetch(fn, delay) {
  let createdTimeout;
  let controller;
  function onCancel() {
    controller?.abort();
    createdTimeout?.cancel();
  }

  async function debounced(...args) {
    onCancel();
    controller = new AbortController();
    createdTimeout = timeout(delay);
    await createdTimeout.delay;
    return fn(...args, controller.signal);
  }
  return [
    debounced,
    onCancel,
  ];
}