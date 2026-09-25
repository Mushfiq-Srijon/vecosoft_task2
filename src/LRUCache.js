class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity must be positive");
        }

        this.capacity = capacity;
        this.cache = new Map();

        this.head = new Node(null, null);
        this.tail = new Node(null, null);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;

        this.head.next.prev = node;
        this.head.next = node;
    }

    _moveToFront(node) {
        this._removeNode(node);
        this._addToFront(node);
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        const node = this.cache.get(key);

        this._moveToFront(node);

        return node.value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);

            node.value = value;

            this._moveToFront(node);

            return;
        }

        const newNode = new Node(key, value);

        this.cache.set(key, newNode);
        this._addToFront(newNode);

        if (this.cache.size > this.capacity) {
            const leastRecentlyUsed = this.tail.prev;

            this._removeNode(leastRecentlyUsed);
            this.cache.delete(leastRecentlyUsed.key);
        }
    }
}

module.exports = LRUCache;