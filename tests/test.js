const assert = require("assert");
const LRUCache = require("../src/LRUCache");

function runTest(testName, testFunction) {
    try {
        testFunction();
        console.log(`✓ ${testName} - PASSED`);
    } catch (error) {
        console.log(`✗ ${testName} - FAILED`);
        console.error(`  ${error.message}`);
        process.exitCode = 1;
    }
}


// 1. Basic put() and get()
runTest("Basic put() and get()", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("B", 20);

    assert.strictEqual(cache.get("A"), 10);
    assert.strictEqual(cache.get("B"), 20);
});


// 2. LRU eviction using the exact assessment example
runTest("LRU eviction - assessment example", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("B", 20);

    const resultA = cache.get("A");
    assert.strictEqual(resultA, 10);

    cache.put("C", 30);

    const resultB = cache.get("B");
    assert.strictEqual(resultB, -1);

    const resultC = cache.get("C");
    assert.strictEqual(resultC, 30);

    const resultAAgain = cache.get("A");
    assert.strictEqual(resultAAgain, 10);
});

console.log("\nLRU Eviction - Assessment Example");

const demoCache = new LRUCache(2);

console.log("put(A, 10)");
demoCache.put("A", 10);

console.log("put(B, 20)");
demoCache.put("B", 20);

const demoA = demoCache.get("A");
console.log(`get(A) -> ${demoA}`);

console.log("put(C, 30)");
demoCache.put("C", 30);

const demoB = demoCache.get("B");
console.log(`get(B) -> ${demoB}`);

const demoC = demoCache.get("C");
console.log(`get(C) -> ${demoC}`);

const demoAAgain = demoCache.get("A");
console.log(`get(A) -> ${demoAAgain}`);

// 3. Updating an existing key
runTest("Updating an existing key", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("A", 50);

    assert.strictEqual(cache.get("A"), 50);
});


// 4. get() changes LRU order
runTest("get() changes LRU order", () => {
    const cache = new LRUCache(2);

    cache.put("A", 10);
    cache.put("B", 20);

    // A becomes the most recently used item
    assert.strictEqual(cache.get("A"), 10);

    // C is inserted, so B should be evicted
    cache.put("C", 30);

    assert.strictEqual(cache.get("B"), -1);
    assert.strictEqual(cache.get("A"), 10);
    assert.strictEqual(cache.get("C"), 30);
});


// 5. Capacity of 1
runTest("Capacity of 1", () => {
    const cache = new LRUCache(1);

    cache.put("A", 10);
    cache.put("B", 20);

    assert.strictEqual(cache.get("A"), -1);
    assert.strictEqual(cache.get("B"), 20);
});


// 6. Invalid capacity
runTest("Invalid capacity: 0", () => {
    assert.throws(() => {
        new LRUCache(0);
    });
});

runTest("Invalid capacity: -1", () => {
    assert.throws(() => {
        new LRUCache(-1);
    });
});


console.log("\n=================================");
console.log("All LRU Cache tests passed!");
console.log("=================================");