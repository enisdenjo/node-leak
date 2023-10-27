const vm = require("node:vm");
const fs = require("node:fs");
const { LeakDetector } = require("./leak-detector");

(async function main() {
  let ctx = {};
  const detector = new LeakDetector(ctx);

  const filename = "test.js";
  const src = fs.readFileSync(filename);
  const module = new vm.SourceTextModule(src.toString(), {
    context: vm.createContext(ctx),
  });

  // module has no dependencies, linker function will never be called
  await module.link(() => {});

  await module.evaluate();

  // deref ctx from this script
  ctx = null;

  if (await detector.isLeaking()) {
    console.error("LEAKING");
    process.exit(1);
  }
  console.log("OK");
})();
