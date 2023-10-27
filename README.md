✅ doesn't "leak":

```sh
node --expose-gc --experimental-vm-modules cjs.js
```

❌ "leaks":

```sh
node --expose-gc --experimental-vm-modules esm.js
```
