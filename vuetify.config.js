global.CSS = { supports: () => false };

class ResizeObserverStub {
  observe () { }
  unobserve () { }
  disconnect () { }
}

window.ResizeObserver = window.ResizeObserver || ResizeObserverStub;
