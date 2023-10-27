class LeakDetector {
  constructor(value) {
    if (!globalThis.gc) {
      throw new Error(
        "Garbage Collector is not exposed, please run Node with `--expose-gc`"
      );
    }

    // When `finReg` is GCed the callback we set will no longer be called,
    this.finReg = new FinalizationRegistry(() => {
      this.isRefHeld = false;
    });
    this.finReg.register(value, undefined);

    this.isRefHeld = true;

    // Ensure value is not leaked by the closure created by the "weak" callback.
    value = null;
  }

  async isLeaking() {
    globalThis.gc();

    // wait some ticks to allow GC to run properly, see https://github.com/nodejs/node/issues/34636#issuecomment-669366235
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setImmediate(resolve));
    }

    return this.isRefHeld;
  }
}

module.exports = { LeakDetector };
