const MongoServiceClasses = require('../mongopb/mongo_pb');
const { MongoServicePromiseClient } = require('../mongopb/mongo_grpc_web_pb');

class mongoService {
    constructor(database, collection) {
        this.connection = new MongoServicePromiseClient(
            'http://localhost:8081');
        this.database = database;
        this.collection = collection;
        this.location = new MongoServiceClasses.Location();
        this.location.setDatabase(this.database);
        this.location.setCollection(this.collection);
    }

    static get mongoService() {
        if (!this._instance) {
            this._instance = new mongoService("apps", "voice-memos");
        }
        return this._instance;
    }

    createMemo(memo) {
        const request = new MongoServiceClasses.CreateObjectRequest();
        const obj = new MongoServiceClasses.Object();
        obj.setLocation(this.location);
        obj.setDocument(JSON.stringify(memo));
        request.setObject(obj);

        return this.connection.createObject(request, {})
    }

    listMemos() {
        const request = new MongoServiceClasses.ListObjectRequest();
        request.setLocation(this.location);

        const stream = this.connection.listObject(request, {})
        let memos = [];

        stream.on("data", (d) => {
            memos.push(JSON.parse(d.array[0][1]));
        })

        stream.on('error', function (err) {
            console.log(err)
        })

        stream.on('status', function (status) {
            console.log(status.code);
            console.log(status.details);
            console.log(status.metadata);
        });

        return memos;
    }

    deleteMemo(id) {
        const req = new MongoServiceClasses.DeleteObjectRequest();
        req.setLocation(this.location);
        const filter = JSON.stringify({ "_id": id });
        req.setFilters(filter)
        return this.connection.deleteObject(req, {})
    }

    updateMemo(memo) {
        const req = new MongoServiceClasses.UpdateObjectRequest();
        const obj = new MongoServiceClasses.Object();
        obj.setLocation(this.location);
        obj.setDocument(JSON.stringify(memo));
        req.setObject(obj);

        return this.connection.updateObject(req, {})
    }
}


export default mongoService.mongoService;