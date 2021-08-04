import 'isomorphic-fetch';

const fetchData = async (id) => {
    console.log(1);
    const serverResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return await serverResponse.json();
}

const multipleFetch = async (ids) => {
    let fetchResults = ids.map((id) => fetchData(id));
    return await Promise.all(fetchResults);
}

const dataObjectCopy = async (array) => {
    return array.map(obj => ({...obj}));
};

const postData = async (objects) => {
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: objects,
    });

    return await postResponse.json();
}


const gettingData = await multipleFetch([1, 2, 3]);

const placingDataInArray = await dataObjectCopy(gettingData);

const dataPost = await postData(placingDataInArray);

console.log(gettingData);
console.log(placingDataInArray);
console.log(dataPost);
