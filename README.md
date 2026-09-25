# LRU Cache

A simple **Least Recently Used (LRU) Cache** implementation using JavaScript. The cache supports `put()` and `get()` operations while maintaining **O(1) average time complexity**.

## Features

* Stores key-value pairs with a fixed capacity
* Retrieves values using `get(key)`
* Inserts or updates values using `put(key, value)`
* Automatically removes the least recently used item when capacity is exceeded
* A successful `get()` makes that key the most recently used
* Rejects non-positive cache capacities

## Data Structures Used

### 1. Hash Map

JavaScript's built-in `Map` is used to store each key and its corresponding linked-list node.

```text
Key → Node
```

The `Map` allows the cache to find a node quickly without searching through the entire list.

**Why?**

* Fast lookup
* Fast insertion
* Fast deletion
* Average **O(1)** time complexity

### 2. Doubly Linked List

A doubly linked list is used to maintain the order of recently used items.

Each node contains:

* `key`
* `value`
* `prev` — points to the previous node
* `next` — points to the next node

The list uses two special nodes:

* `head` → represents the most recently used side
* `tail` → represents the least recently used side

The actual cache nodes are stored between them.

## How LRU Ordering Is Maintained

The cache maintains the following order:

```text
HEAD → Most Recently Used → ... → Least Recently Used → TAIL
```

### When `put()` adds a new key

The new key is placed at the front of the list because it is the most recently used.

Example:

```text
A → B
```

After:

```text
put(C, 30)
```

the order becomes:

```text
C → A → B
```

If the capacity is exceeded, the node next to `tail` is removed because it is the least recently used item.

### When `get()` successfully finds a key

The accessed node is removed from its current position and moved to the front.

For example:

```text
A → B → C
```

After:

```text
get(B)
```

the order becomes:

```text
B → A → C
```

Therefore, `C` is now the least recently used item.

## How the Map and Linked List Work Together

The two data structures have different responsibilities:

```text
Map
 ↓
Find the node quickly

Doubly Linked List
 ↓
Maintain the LRU order
```

For example, when `get("A")` is called:

1. The `Map` checks whether `"A"` exists.
2. If it does not exist, `-1` is returned.
3. If it exists, the `Map` provides the corresponding node.
4. The node is moved to the front of the linked list.
5. Its value is returned.

This combination allows both lookup and ordering operations to remain efficient.

## Time Complexity

| Operation          | Average Time |
| ------------------ | -----------: |
| `get(key)`         |         O(1) |
| `put(key, value)`  |         O(1) |
| Remove LRU item    |         O(1) |
| Move item to front |         O(1) |

The overall average time complexity for `get()` and `put()` is **O(1)**.

This is possible because:

* `Map` provides average O(1) lookup and deletion.
* A doubly linked list allows a known node to be removed and inserted at the front in O(1).

## Space Complexity

The cache stores at most `capacity` actual nodes.

Therefore:

**Space Complexity: O(capacity)**

The `Map` and doubly linked list both store references to the cache entries, so the total additional space remains proportional to the cache capacity.

## Project Structure

```text
LRU-Cache/
├── src/
│   └── LRUCache.js
├── tests/
│   └── test.js
└── README.md
```

## Requirements

* Node.js installed on the system

No external testing framework is required. The tests use Node.js's built-in `assert` module.

## How to Run

Open a terminal in the project root directory.

Run:

```bash
node tests/test.js
```

The test program checks:

* Basic `put()` and `get()`
* LRU eviction
* The assessment example
* Updating an existing key
* LRU order changes after `get()`
* Capacity of 1
* Invalid capacities

The assessment example also prints the actual operations and returned values, for example:

```text
LRU Eviction - Assessment Example
put(A, 10)
put(B, 20)
get(A) -> 10
put(C, 30)
get(B) -> -1
get(C) -> 30
get(A) -> 10
```

If all tests pass, the program displays:

```text
All LRU Cache tests passed!
```
