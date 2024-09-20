class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity; // The number of buckets
        this.loadFactor = loadFactor; // When to expand
        this.size = 0; // Track the number of stored keys
        this.buckets = new Array(this.capacity).fill(null).map(() => []); // Initialize empty buckets
    }

    // Hash function
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Set key-value pair
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                bucket[i] = [key, value]; // Update value if key already exists
                return;
            }
        }

        // If the key doesn't exist, add a new entry
        bucket.push([key, value]);
        this.size++;

        // Resize if load factor exceeded
        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    // Get value by key
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [storedKey, storedValue] of bucket) {
            if (storedKey === key) {
                return storedValue;
            }
        }
        return null; // Key not found
    }

    // Check if key exists
    has(key) {
        return this.get(key) !== null;
    }

    // Remove key-value pair
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                bucket.splice(i, 1); // Remove the key-value pair
                this.size--;
                return true;
            }
        }
        return false; // Key not found
    }

    // Return the number of keys in the hash map
    length() {
        return this.size;
    }

    // Clear all key-value pairs
    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    // Return an array of all keys
    keys() {
        const keysArray = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keysArray.push(key);
            }
        }
        return keysArray;
    }

    // Return an array of all values
    values() {
        const valuesArray = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                valuesArray.push(value);
            }
        }
        return valuesArray;
    }

    // Return an array of all key-value pairs
    entries() {
        const entriesArray = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                entriesArray.push(entry);
            }
        }
        return entriesArray;
    }

    // Private method to resize the hash map
    _resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                const newIndex = this.hashWithCapacity(key, newCapacity);
                newBuckets[newIndex].push([key, value]);
            }
        }

        this.capacity = newCapacity;
        this.buckets = newBuckets;
    }

    // Helper method for resizing, as the capacity changes
    hashWithCapacity(key, newCapacity) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % newCapacity;
        }
        return hashCode;
    }
}

const test = new HashMap();

// Populate the hash map
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.length()); // Should print 12

// Overwrite some values
test.set('apple', 'green');
test.set('banana', 'brown');

// Add a new entry to trigger resizing
test.set('moon', 'silver');

console.log(test.get('apple')); // Should print 'green'
console.log(test.get('moon')); // Should print 'silver'
console.log(test.length()); // Should print 13 (after resizing)

// Test other methods
console.log(test.has('dog')); // Should print true
console.log(test.remove('dog')); // Should print true
console.log(test.length()); // Should print 12

console.log(test.keys()); // Should print an array of all keys
console.log(test.values()); // Should print an array of all values
console.log(test.entries()); // Should print an array of key-value pairs

test.clear();
console.log(test.length()); // Should print 0 after clearing

