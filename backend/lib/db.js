const sqlite3 = require("sqlite3");
const util = require('util');

const DEFAULT_DB = `qr.db`;
const DB_CREATION_SQLS = [
 ];

async function _initDB(dbPath = DEFAULT_DB) {
    return new Promise((resolve, reject) => {
        let dbInstance = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, async err => {
            if (err) { console.log(`Error initializing dbInstance: ${err.message}`); reject(err); }
            else {
                const dbRunAsync = util.promisify(dbInstance.run.bind(dbInstance));
                if(dbPath.endsWith("teleworkrapp.db")){

                    for (const dbCreationSQL of DB_CREATION_SQLS){
                        try {
                            await dbRunAsync(dbCreationSQL,[])
                            console.info("DB connected successfully")

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                resolve(dbInstance);
            }
        });
    });
}

async function _closeDB(dbInstance) {
    return new Promise(resolve => {
        dbInstance.close(err => {
            if (err) console.log(`Error closing database: ${err.message}`);
            resolve();
        });
    });
}

async function runQuery(query, params = [], dbPath) {
    let dbInstance;
    try { dbInstance = await _initDB(dbPath); }
    catch (error) { return { result: false, error }; }

    return new Promise(async resolve => {
      dbInstance.run(query, params, async function (error) {
        await _closeDB(dbInstance);
        if (error) {
          console.log(`Error in dbInstance.run: ${error.message}`);
          resolve({ result: false, error });
        } else {
          resolve({ result: true, lastID: this.lastID });
        }
      });
    });
  }

async function getQuery(query, params = [], dbPath) {
    let dbInstance;
    try { dbInstance = await _initDB(dbPath); }
    catch (error) { return { result: false, error }; }

    return new Promise(async resolve => {
        dbInstance.get(query, params, async (error, row) => {
            await _closeDB(dbInstance);
            if (error) console.log(`Error in dbInstance.get: ${error.message}`);
            if (error || !row) { resolve({ result: false, error }); }
            else { resolve({ result: true, row }); }
        });
    });
}

async function getAllQuery(query, params = [], dbPath) {
    let dbInstance;
    try { dbInstance = await _initDB(dbPath); }
    catch (error) { return { result: false, error }; }

    return new Promise(async resolve => {
        dbInstance.all(query, params, async (error, rows) => {
            await _closeDB(dbInstance);
            if (error) { console.log(`Error in dbInstance.all: ${error.message}`); resolve({ result: false, error }); }
            else { resolve({ result: true, rows }); }
        });
    });
}

module.exports = { runQuery, getQuery, getAllQuery };