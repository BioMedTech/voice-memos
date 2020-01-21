protoc src/mongopb/mongo.proto --js_out=import_style=commonjs:.
protoc src/mongopb/mongo.proto --js_out=import_style=grpc:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
protoc src/miniopb/minio.proto --js_out=import_style=commonjs:.
protoc src/miniopb/minio.proto --js_out=import_style=grpc:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
