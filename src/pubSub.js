const events = (() => {
  const eventsEmited = {};
  const on = (eventName, fn) => {
    eventsEmited[eventName] = eventsEmited[eventName] || [];
    eventsEmited[eventName].push(fn);
  };

  const off = (eventName, fn) => {
    if (eventsEmited[eventName]) {
      for (let i = 0; i < eventsEmited[eventName].length; i += 1) {
        if (eventsEmited[eventName][i] === fn) {
          eventsEmited[eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  const emit = (eventName, data) => {
    if (eventsEmited[eventName]) {
      eventsEmited[eventName].forEach((fn) => {
        fn(data);
      });
    }
  };

  return { on, off, emit };
})();
export { events };
