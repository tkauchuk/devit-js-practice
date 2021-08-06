// class Queue
// constructor(concurrency = 10)
// method add(call)
// use 100 requests with queue

import 'isomorphic-fetch';
import PrioritisedQueue from './prioritised-queue.js';
import Queue from './queue.js'

// async function makeRequest(index) {
//     console.log(index, new Date().toTimeString(), 'request called');
//
//
//     // TODO: return Promise with timout random time resolve
//     return fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
//         .then((response) => {
//             console.log(index, new Date().toTimeString(), 'Response achieved')
//             return response.json()
//         })
// }
//
// const queueOfRequests = new Queue();
// const requestsCount = 100;
//
// for (let i = 0; i < requestsCount; i++) {
//     queueOfRequests.add(() => makeRequest(i), i);
//
//     // add possibility to handle each response
// }
//


function makeRandomTime(pointToStart, pointToEnd) {
    return Math.floor(Math.random() * (pointToEnd - pointToStart) + pointToStart) * 1000;
}

async function makeRequest(index) {
    console.log(index, new Date().toTimeString(), 'Request called!');

    let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
    if (index % 10 === 0) {
        throw new Error(`${index} ${new Date().toTimeString()} 'Request failed!'`)
    }

    console.log(index, new Date().toTimeString(), 'Request achieved!');

    return await response.json();
}

const queueOfPrioritisedRequests = new PrioritisedQueue();
const requestsQuantity = 100;

for (let i = 0; i < requestsQuantity; i++) {
    queueOfPrioritisedRequests
        .add(() => makeRequest(i), i)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error.message);
        })
}