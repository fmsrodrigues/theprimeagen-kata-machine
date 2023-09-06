interface Node<T> {
    value: T;
    next: Node<T> | null;
}

interface NodeConnections<T> {
    previous: Node<T> | null;
    next: Node<T> | null;
    current: Node<T> | null;
}

export default class SinglyLinkedList<T> {
    public length: number;
    public head: Node<T> | null;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    private traverse(idx: number): NodeConnections<T> {
        let connections: NodeConnections<T> = {
            previous: null,
            next: null,
            current: null
        };

        let node: Node<T> | null = this.head;
        for (let i = 0; i <= idx; i++) {
            if (this.head === null || idx > this.length) {
                throw new Error('Index out of bounds');
            }

            if (i === idx) {
                connections.current = node;
                connections.next = node!.next;

                break;
            }

            connections.previous = node;
            connections.current = node;
            connections.next = node!.next;

            if (!!node) node = node!.next;
        }

        return connections;
    }

    private find(item: T): NodeConnections<T> {
        let connections: NodeConnections<T> = {
            previous: null,
            next: null,
            current: null
        };

        let node: Node<T> | null = this.head;
        for (let i = 0; i <= this.length; i++) {
            if (!!node && node.value === item) {
                connections.current = node;
                connections.next = node.next;

                break;
            }

            if (node !== null) {
                connections.previous = node;
                connections.next = node!.next;

                node = node!.next;
            }
        }

        return connections;
    }

    prepend(item: T): void {
        const node = this.head;

        this.head = {
            value: item,
            next: node
        };

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        const connections = this.traverse(idx);

        const node = {
            value: item,
            next: connections.current
        };

        connections.previous!.next = node;

        this.length++;
    }

    append(item: T): void {
        const node = {
            value: item,
            next: null
        };

        if (this.head === null) {
            this.head = node;
        } else {
            const connections = this.traverse(this.length - 1);

            connections.current!.next = node;
        }

        this.length++;
    }

    remove(item: T): T | undefined {
        const connections = this.find(item);

        if (connections.previous) connections.previous.next = connections.next;

        this.length = this.length - 1 > 0 ? this.length - 1 : 0;

        let current = connections.current;

        if (current && current === this.head) {
            this.head = current.next;
        };

        return current ? current.value : undefined;
    }

    get(idx: number): T | undefined {
        const connections = this.traverse(idx);

        let current = connections.current;

        return current ? current.value : undefined;
    }

    removeAt(idx: number): T | undefined {
        const connections = this.traverse(idx);

        if (connections.previous) connections.previous.next = connections.next;
        if (idx === 0) this.head = connections.next;

        this.length = this.length - 1 > 0 ? this.length - 1 : 0;

        let current = connections.current;

        return current ? current.value : undefined;
    }

}