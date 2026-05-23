class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

class HanoiTower<T> {
    private rods: { [key: string]: Stack<T> } = {};
    private from: string;
    private to: string;
    private aux: string;
    private disksCount: number = 0;

    constructor(from: string = "First", to: string = "Second", aux: string = "Third") {
        this.from = from;
        this.to = to;
        this.aux = aux;
        this.rods[this.from] = new Stack<T>();
        this.rods[this.to] = new Stack<T>();
        this.rods[this.aux] = new Stack<T>();
    }

    addDisks(disks: T[]): void {
        for (let i = 0; i < disks.length; i++) {
            this.rods[this.from].push(disks[i]);
        }
        this.disksCount = disks.length;
    }

    solve(): void {
        this.moveDisks(this.disksCount, this.from, this.to, this.aux);
    }

    private moveDisks(n: number, from: string, to: string, aux: string): void {
        if (n === 1) {
            const disk = this.rods[from].pop();
            if (disk !== undefined) {
                this.rods[to].push(disk);
                console.log(`Переместить диск ${disk} с ${from} на ${to}`);
            }
        } else {
            this.moveDisks(n - 1, from, aux, to);
            this.moveDisks(1, from, to, aux);
            this.moveDisks(n - 1, aux, to, from);
        }
    }
}
