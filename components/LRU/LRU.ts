import AsyncStorage from '@react-native-async-storage/async-storage'
/**
 * class LRU
 */
type Node<T> = {
    value: T;
    next?:Node<T>;
    prev?:Node<T>;
}

function createNode<V>(value:V): Node<V> {
    return {value};
}


export default class LRU<K,V> {
    private head?: Node<V>;
    private tail?: Node<V>;
    public capacity: number;
    private length:number;

    private lookup: Map<K,Node<V>>;
    private reverseLookup: Map<Node<V>,K>;

    constructor(capacity:number = 10){
        this.length = 0;
        this.lookup = new Map<K,Node<V>>();
        this.reverseLookup = new Map<Node<V>,K>();
        this.capacity = capacity;
    }

    

    update(key:K,value:V):void{
        let node = this.lookup.get(key);
        if (!node){
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();
            this.lookup.set(key,node);
            this.reverseLookup.set(node,key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    get(key:K):V|undefined{
        // check cache for value
        const node = this.lookup.get(key);
        if (!node) return undefined;
        // move node to most recent
        this.detach(node);
        this.prepend(node);
        // return val
        return node.value;
    }

    private detach(node:Node<V>){
        if (node.prev){
            node.prev.next = node.next;
        }
        if (node.next){
            node.next.prev = node.prev;
        }

        if (this.head === node){
            this.head = node.next
        }

        if (this.tail === node){
            this.tail = node.prev
        }
        if (!this.head) {
            this.tail = undefined;
        }
    

        node.next = node.prev = undefined;
    }

    private prepend(node:Node<V>):void{
        if (this.head === undefined){
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        if (this.head){
            this.head.prev = node;
        }
        this.head = node;
    }

    private trimCache():void{
        if (this.length <= this.capacity || !this.tail){
            return;
        }

        let oldTail = this.tail;
        this.detach(oldTail);
        const key = this.reverseLookup.get(oldTail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(oldTail);
        this.length--;

    }


    ///////////////////////////////^^Base Logic^^///////////////////////////////
    ///////////////////////////////vv Async-Storage Integration vv///////////////////////////////
    async InitializeFromStorage():Promise<void>{
        try {
            const storedCache = await AsyncStorage.getItem('journalCache');
            if (storedCache){
                const cacheData: [K,V][] = JSON.parse(storedCache);
                for (const [key,value] of cacheData){
                    const node = createNode(value);
                    this.length++;
                    this.prepend(node);
                    this.lookup.set(key,node);
                    this.reverseLookup.set(node,key);
                }
                this.trimCache();
            }
        } catch (error) {
            console.error("Error loading cache from AS", error);
        }
    } 

    async SaveCacheToStorage():Promise<void>{
        try {
            const cacheData = Array.from(this.lookup.entries()).map(([k,v])=> [k,v.value])
            await AsyncStorage.setItem("journalCache", JSON.stringify(cacheData));
        } catch (error) {
            console.error('Error saving LRU cache to AsyncStorage', error)
        }
    }

    ClearCache():void{

    }

}