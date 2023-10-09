interface Node<T> {
    value: T,
    previous: Node<T> | null,
    next: Node<T> | null
}

export default class DoublyLinkedList<T> {
    public length: number = 0;
    public head: Node<T> | null = null;
    public tail: Node<T> | null = null;

    constructor() { }

    private getNodeByIndex(idx: number): Node<T> {
        if (idx > this.length) throw new Error('Index out of bounds');

        let node: Node<T> | null = this.head;
        for (let i = 0; i <= idx; i++) {
            if (i === idx) {
                break;
            }

            node = node?.next || null;
        }

        if (!node) throw new Error('Index out of bounds');

        return node;
    }

    private getNodeByValue(value: T): Node<T> {
        if (this.length === 0) throw new Error('Empty double linked list');

        let node: Node<T> | null = this.head;
        for (let i = 0; i <= this.length; i++) {
            if (!node) break;

            if (node && node.value === value) break;

            node = node?.next || null;
        }

        if (!node) throw new Error('Value not found');

        return node;
    }

    prepend(item: T): void {
        const node = {
            value: item,
            previous: null,
            next: this.head
        }

        if (this.head) {
            this.head.previous = node;
        }

        if (this.length === 0) {
            this.tail = node;
        }

        this.head = node;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) return this.prepend(item);
        if (idx === this.length) return this.append(item);

        const node = this.getNodeByIndex(idx);

        const previousNode = node.previous!
        const newNode = {
            value: item,
            previous: previousNode,
            next: node
        };

        previousNode.next = newNode;
        node.previous = newNode;
    }

    append(item: T): void {
        const node = {
            value: item,
            previous: this.tail,
            next: null
        }

        if (this.tail) {
            this.tail.next = node;
        }

        if (this.length === 0) {
            this.head = node;
        }

        this.tail = node;
        this.length++;
    }

    remove(item: T): T | undefined {
        try {
            const node = this.getNodeByValue(item);
            this.length--;

            const previousNode = node.previous;
            if (!previousNode) {
                this.head = node.next;
                return node.value;
            }

            if (!node.next) {
                previousNode.next = null;
                this.tail = previousNode;
                return node.value;
            }

            previousNode.next = node.next;
            node.next.previous = previousNode;
            return node.value;
        } catch (err) {
            return undefined;
        }
    }

    get(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        return node.value;
    }

    removeAt(idx: number): T | undefined {
        try {
            const node = this.getNodeByIndex(idx);
            this.length--;

            const previousNode = node.previous;
            if (!previousNode) {
                this.head = node.next;
                return node.value;
            }

            if (!node.next) {
                previousNode.next = null;
                this.tail = previousNode;
                return node.value;
            }

            previousNode.next = node.next;
            node.next.previous = previousNode;
            return node.value;
        } catch (err) {
            return undefined;
        }
    }
}