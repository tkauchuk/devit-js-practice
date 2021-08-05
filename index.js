// class Queue
// constructor(concurrency = 10)
// method add(call)
// use 100 requests with queue

import 'isomorphic-fetch';
import Queue from './queue.js'

async function makeRequest(index) {
    console.log(index, new Date().toTimeString(), 'request called');


    // TODO: return Promise with timout random time resolve
    return fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
        .then((response) => {
            console.log(index, new Date().toTimeString(), 'Response achieved')
            return response.json()
        })
}

const queueOfRequests = new Queue();
const requestsCount = 100;

for (let i = 0; i < requestsCount; i++) {
    queueOfRequests.add(() => makeRequest(i), i);

    // add possibility to handle each response
}

queueOfRequests.resolved((results) => {
    console.log("queue resolved", results);
})


// console.log(await queueOfRequests.done());