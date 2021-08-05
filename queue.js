export default class Queue {
    constructor(concurrency = 10) {
        this._concurrency = concurrency;
        this._queue = [];
        this._pending = 0;
        this._onResolved = null;
    }

    add(callback) {
        this._queue.push({
            func: callback,
            result: null,
            handled: false,
        });
        
        this._dequeue();
    }

    resolved(onResolved) {
        this._onResolved = onResolved;
    }

    _getUnhandledItem() {
        return this._queue.find(item => !item.handled);
    }

    _isResultsFilled() {
        return !this._queue.find(item => !item.result);
    }

    _dequeue() {
        if (this._pending >= this._concurrency) {
            return;
        }

        const item = this._getUnhandledItem();
        if(!item) {
            return;
        }

        this._pending++;

        item.handled = true;
        item.func()
            .then(result => {
                item.result = result;
            })
            .catch(error => {
                item.result = {};
            })
            .finally(() => {
                this._pending--;
                this._dequeue();

                if (this._isResultsFilled()) {
                    this._onResolved && this._onResolved(this._queue.map(item => item.result));
                    this._queue = [];
                }
            });
    }
}