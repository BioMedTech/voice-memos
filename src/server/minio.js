const MinioServiceClasses = require('../miniopb/minio_pb');
const { MinioServicePromiseClient } = require('../miniopb/minio_grpc_web_pb');


class MinioService {
    constructor(bucketName) {
        this.connection = new MinioServicePromiseClient("http://157.230.121.76:8082");

        this.bucketName = bucketName;
        this.bucket = new MinioServiceClasses.Bucket();
        this.bucket.setTitle(bucketName);

        const req = new MinioServiceClasses.CreateBucketRequest();
        req.setBucket(this.bucket);

        this.connection.createBucket(req, {}).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    static get minioService() {
        if (!this._instance) {
            this._instance = new MinioService("voice-memos");
        }
        return this._instance;
    }

    create(filename) {
        console.log(filename)
        const req = new MinioServiceClasses.PutObjectUrlRequest();
        const obj = new MinioServiceClasses.ObjectData();
        obj.setKey(filename);
        obj.setBucket(this.bucketName);
        req.setType("audio");
        req.setData(obj);
        return this.connection.putObjectUrl(req, {})
    }


    getObject(key) {
        const req = new MinioServiceClasses.GetObjectUrlRequest();
        const data = new MinioServiceClasses.ObjectData();
        data.setBucket(this.bucketName);
        data.setKey(key);
        req.setData(data);
        return this.connection.getObjectUrl(req, {})
    }

    deleteObject(key){
        const req=new MinioServiceClasses.DeleteObjectRequest();
    
    }
}

export default MinioService;