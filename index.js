// class Queue
// constructor(concurrency = 10)
// method add(call)
// use 100 requests with queue

async function request() {
    console.log('time here request called')
    return await new Promise(
        (resolve) => setTimeout(
            () => {
                // TODO: добавить текущее время
                console.log(`time here result`);
                resolve();
            },
            3000 // add random time from 3 to 10 sek
        )
    )
}