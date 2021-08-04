import 'isomorphic-fetch';

class DB {
    constructor(name) {
        this.name = name;
    }

    /**
     *
     * @param {number} index
     * @returns {Promise<{}>}
     */
    async getRow(index) {
        return await new Promise(
            (resolve) => setTimeout(
                () => {
                    console.log(`received row index ${index} from ${this.name}`)
                    resolve(`string-${index}`);
                },
                1000
            )
        )
    }
}

/**
 *
 * @param {DB} db
 * @param {number} rows
 * @returns {Promise<*[]>}
 */
const getData = async (db, rows) => {
    let results = [];

    for (let i = 1; i <= rows; i += 1) {
        results.push(await db.getRow(i));
    }

    return results;
};

const database = new DB("db1");
const secondDB = new DB("db2");
const thirdDB = new DB("db3");

let result = await Promise.all([
    getData(database, 10),
    getData(secondDB, 10),
    getData(thirdDB, 10)
]);

console.log(result);