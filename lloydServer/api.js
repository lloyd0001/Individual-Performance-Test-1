const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const api = express();
const uri = 'mongodb://localhost:27017';
const PORT = process.env.PORT || 3000;
const dbName = 'class';

api.use(cors());
api.use(express.json());

api.listen(PORT, () => {
    console.log('Listening on http://localhost:${PORT}...');
});

//--------------------API---Call--------------------
api.get('/api/backendCourses', (req, res) => justGet(req, res));
api.get('/api/backendCourses/sort/foryear1', (req, res) => sortData1(req, res));
api.get('/api/backendCourses/sort/foryear2', (req, res) => sortData2(req, res));
api.get('/api/backendCourses/sort/foryear3', (req, res) => sortData3(req, res));
api.get('/api/backendCourses/sort/foryear4', (req, res) => sortData4(req, res));
api.get('/api/backendCourses/BSIS/all', (req, res) =>  BSISunsorted(req, res));
api.get('/api/backendCourses/BSIT/all', (req, res) =>  BSITunsorted(req, res));


//--------------------Functions--------------------
//--------------------For-All--------------------
function justGet(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');

            collection.find({})
                .toArray()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
//--------------------For-Sorted-Alpabe-1st-Year------------------
function sortData1(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');

            collection.aggregate([
                { $unwind: "$1st Year" },
                { $sort: { "1st Year.description": 1 } },
                { $group: {
                    _id: "$_id",
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                    "sortedData": { $push: "$1st Year" }
                }},
                { $project: { "_id": 0, "code": 1, "description": 1, "units": 1, "sortedData": 1 } },
                { $unwind: "$sortedData" },
                { $sort: { "sortedData.description": 1 } },
                { $group: {
                    _id: null,
                    "result": { $push: "$sortedData" },
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                }}
            ]).toArray()
                .then((result) => {
                    res.json(result.length > 0 ? result[0].result : []);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching and sorting data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
//--------------------For-Sorted-Alpabe-2nd-Year------------------
function sortData2(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');

            collection.aggregate([
                { $unwind: "$2nd Year" },
                { $sort: { "2nd Year.description": 1 } },
                { $group: {
                    _id: "$_id",
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                    "sortedData": { $push: "$2nd Year" }
                }},
                { $project: { "_id": 0, "code": 1, "description": 1, "units": 1, "sortedData": 1 } },
                { $unwind: "$sortedData" },
                { $sort: { "sortedData.description": 1 } },
                { $group: {
                    _id: null,
                    "result": { $push: "$sortedData" },
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                }}
            ]).toArray()
                .then((result) => {
                    res.json(result.length > 0 ? result[0].result : []);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching and sorting data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
//--------------------For-Sorted-Alpabe-3rd-Year------------------
function sortData3(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');

            collection.aggregate([
                { $unwind: "$3rd Year" },
                { $sort: { "3rd Year.description": 1 } },
                { $group: {
                    _id: "$_id",
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                    "sortedData": { $push: "$3rd Year" }
                }},
                { $project: { "_id": 0, "code": 1, "description": 1, "units": 1, "sortedData": 1 } },
                { $unwind: "$sortedData" },
                { $sort: { "sortedData.description": 1 } },
                { $group: {
                    _id: null,
                    "result": { $push: "$sortedData" },
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                }}
            ]).toArray()
                .then((result) => {
                    res.json(result.length > 0 ? result[0].result : []);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching and sorting data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
//--------------------For-Sorted-Alpabe-4th-Year------------------
function sortData4(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');

            collection.aggregate([
                { $unwind: "$4th Year" },
                { $sort: { "4th Year.description": 1 } },
                { $group: {
                    _id: "$_id",
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                    "sortedData": { $push: "$4th Year" }
                }},
                { $project: { "_id": 0, "code": 1, "description": 1, "units": 1, "sortedData": 1 } },
                { $unwind: "$sortedData" },
                { $sort: { "sortedData.description": 1 } },
                { $group: {
                    _id: null,
                    "result": { $push: "$sortedData" },
                    "code": { $first: "$code" },
                    "description": { $first: "$description" },
                    "units": { $first: "$units" },
                }}
            ]).toArray()
                .then((result) => {
                    res.json(result.length > 0 ? result[0].result : []);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching and sorting data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
//--------------------For-All-BSIS------------------
function BSISunsorted(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');
            const query = {
                $or: [
                    { "1st Year.tags": "BSIS" },
                    { "2nd Year.tags": "BSIS" },
                    { "3rd Year.tags": "BSIS" },
                    { "4th Year.tags": "BSIS" }
                ]
            };

            collection.find(query).toArray()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching BSIS data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
//--------------------For-All-BSIT------------------
function BSITunsorted(req, res) {
    MongoClient.connect(uri)
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('courses');
            const query = {
                $or: [
                    { "1st Year.tags": "BSIT" },
                    { "2nd Year.tags": "BSIT" },
                    { "3rd Year.tags": "BSIT" },
                    { "4th Year.tags": "BSIT" }
                ]
            };
            collection.find(query).toArray()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.error('Error occurred while fetching BSIT data:', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => {
                    client.close();
                });
        })
        .catch((err) => {
            console.error('Error occurred while connecting to the database:', err);
            res.status(500).send('Internal Server Error');
        });
}
