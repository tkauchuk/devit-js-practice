export default class PrioritisedQueue {
    constructor(concurrency = 10) {
        this._concurrency = concurrency;
        this._queue = [];
        this._pending = 0;
    }

    add(callback, priority = 0) {
        const item = {
            func: callback,
            priority: priority
        };

        const promise = new Promise((resolve, reject) => {
            item.resolve = resolve;
            item.reject = reject;
        });

        this._queue.push(item)

        this.dequeue();

        return promise;
    };

    getUnhandledItem() {
        if (this._queue.length === 0) {
            return null;
        }

        const item = this._queue.reduce((maxPriorityItem, nextItem, index) => {
            if (!maxPriorityItem) {
                return {
                    ...nextItem,
                    index
                }
            }

            if (maxPriorityItem.priority >= nextItem.priority) {
                return maxPriorityItem;
            }

            return {
                ...nextItem,
                index
            }
        }, null);

        this._queue.splice(item.index, 1);

        return item;
    }

    dequeue() {
        if (this._pending >= this._concurrency) {
            return;
        }

        const requestItem = this.getUnhandledItem();
        if (!requestItem) {
            return;
        }

        this._pending++;

        requestItem.func()
            .then((result) => {
                this._pending--;
                this.dequeue();

                requestItem.resolve(result);
            })
            .catch((error) => {
                this._pending--;
                this.dequeue();

                requestItem.reject(error);
            })
    }
}