[VM's context when evaluating ESM script not garbage-collected (works with CJS)](https://github.com/nodejs/node/issues/50964)

✅ doesn't "leak":

```sh
node --expose-gc --experimental-vm-modules cjs.js
```

❌ "leaks":

```sh
node --expose-gc --experimental-vm-modules esm.js
```
