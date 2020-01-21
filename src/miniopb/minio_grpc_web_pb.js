/**
 * @fileoverview gRPC-Web generated client stub for bucket
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.bucket = require('./minio_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.bucket.MinioServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.bucket.MinioServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bucket.CreateBucketRequest,
 *   !proto.bucket.CreateBucketResponse>}
 */
const methodDescriptor_MinioService_CreateBucket = new grpc.web.MethodDescriptor(
  '/bucket.MinioService/CreateBucket',
  grpc.web.MethodType.UNARY,
  proto.bucket.CreateBucketRequest,
  proto.bucket.CreateBucketResponse,
  /**
   * @param {!proto.bucket.CreateBucketRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.CreateBucketResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bucket.CreateBucketRequest,
 *   !proto.bucket.CreateBucketResponse>}
 */
const methodInfo_MinioService_CreateBucket = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bucket.CreateBucketResponse,
  /**
   * @param {!proto.bucket.CreateBucketRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.CreateBucketResponse.deserializeBinary
);


/**
 * @param {!proto.bucket.CreateBucketRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bucket.CreateBucketResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bucket.CreateBucketResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bucket.MinioServiceClient.prototype.createBucket =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bucket.MinioService/CreateBucket',
      request,
      metadata || {},
      methodDescriptor_MinioService_CreateBucket,
      callback);
};


/**
 * @param {!proto.bucket.CreateBucketRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bucket.CreateBucketResponse>}
 *     A native promise that resolves to the response
 */
proto.bucket.MinioServicePromiseClient.prototype.createBucket =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bucket.MinioService/CreateBucket',
      request,
      metadata || {},
      methodDescriptor_MinioService_CreateBucket);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bucket.DeleteBucketRequest,
 *   !proto.bucket.DeleteBucketResponse>}
 */
const methodDescriptor_MinioService_DeleteBucket = new grpc.web.MethodDescriptor(
  '/bucket.MinioService/DeleteBucket',
  grpc.web.MethodType.UNARY,
  proto.bucket.DeleteBucketRequest,
  proto.bucket.DeleteBucketResponse,
  /**
   * @param {!proto.bucket.DeleteBucketRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.DeleteBucketResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bucket.DeleteBucketRequest,
 *   !proto.bucket.DeleteBucketResponse>}
 */
const methodInfo_MinioService_DeleteBucket = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bucket.DeleteBucketResponse,
  /**
   * @param {!proto.bucket.DeleteBucketRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.DeleteBucketResponse.deserializeBinary
);


/**
 * @param {!proto.bucket.DeleteBucketRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bucket.DeleteBucketResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bucket.DeleteBucketResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bucket.MinioServiceClient.prototype.deleteBucket =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bucket.MinioService/DeleteBucket',
      request,
      metadata || {},
      methodDescriptor_MinioService_DeleteBucket,
      callback);
};


/**
 * @param {!proto.bucket.DeleteBucketRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bucket.DeleteBucketResponse>}
 *     A native promise that resolves to the response
 */
proto.bucket.MinioServicePromiseClient.prototype.deleteBucket =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bucket.MinioService/DeleteBucket',
      request,
      metadata || {},
      methodDescriptor_MinioService_DeleteBucket);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bucket.GetObjectUrlRequest,
 *   !proto.bucket.GetObjectUrlResponse>}
 */
const methodDescriptor_MinioService_GetObjectUrl = new grpc.web.MethodDescriptor(
  '/bucket.MinioService/GetObjectUrl',
  grpc.web.MethodType.UNARY,
  proto.bucket.GetObjectUrlRequest,
  proto.bucket.GetObjectUrlResponse,
  /**
   * @param {!proto.bucket.GetObjectUrlRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.GetObjectUrlResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bucket.GetObjectUrlRequest,
 *   !proto.bucket.GetObjectUrlResponse>}
 */
const methodInfo_MinioService_GetObjectUrl = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bucket.GetObjectUrlResponse,
  /**
   * @param {!proto.bucket.GetObjectUrlRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.GetObjectUrlResponse.deserializeBinary
);


/**
 * @param {!proto.bucket.GetObjectUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bucket.GetObjectUrlResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bucket.GetObjectUrlResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bucket.MinioServiceClient.prototype.getObjectUrl =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bucket.MinioService/GetObjectUrl',
      request,
      metadata || {},
      methodDescriptor_MinioService_GetObjectUrl,
      callback);
};


/**
 * @param {!proto.bucket.GetObjectUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bucket.GetObjectUrlResponse>}
 *     A native promise that resolves to the response
 */
proto.bucket.MinioServicePromiseClient.prototype.getObjectUrl =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bucket.MinioService/GetObjectUrl',
      request,
      metadata || {},
      methodDescriptor_MinioService_GetObjectUrl);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bucket.PutObjectRequest,
 *   !proto.bucket.PutObjectResponse>}
 */
const methodDescriptor_MinioService_PutObject = new grpc.web.MethodDescriptor(
  '/bucket.MinioService/PutObject',
  grpc.web.MethodType.UNARY,
  proto.bucket.PutObjectRequest,
  proto.bucket.PutObjectResponse,
  /**
   * @param {!proto.bucket.PutObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.PutObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bucket.PutObjectRequest,
 *   !proto.bucket.PutObjectResponse>}
 */
const methodInfo_MinioService_PutObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bucket.PutObjectResponse,
  /**
   * @param {!proto.bucket.PutObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.PutObjectResponse.deserializeBinary
);


/**
 * @param {!proto.bucket.PutObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bucket.PutObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bucket.PutObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bucket.MinioServiceClient.prototype.putObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bucket.MinioService/PutObject',
      request,
      metadata || {},
      methodDescriptor_MinioService_PutObject,
      callback);
};


/**
 * @param {!proto.bucket.PutObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bucket.PutObjectResponse>}
 *     A native promise that resolves to the response
 */
proto.bucket.MinioServicePromiseClient.prototype.putObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bucket.MinioService/PutObject',
      request,
      metadata || {},
      methodDescriptor_MinioService_PutObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bucket.PutObjectUrlRequest,
 *   !proto.bucket.PutObjectUrlResponse>}
 */
const methodDescriptor_MinioService_PutObjectUrl = new grpc.web.MethodDescriptor(
  '/bucket.MinioService/PutObjectUrl',
  grpc.web.MethodType.UNARY,
  proto.bucket.PutObjectUrlRequest,
  proto.bucket.PutObjectUrlResponse,
  /**
   * @param {!proto.bucket.PutObjectUrlRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.PutObjectUrlResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bucket.PutObjectUrlRequest,
 *   !proto.bucket.PutObjectUrlResponse>}
 */
const methodInfo_MinioService_PutObjectUrl = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bucket.PutObjectUrlResponse,
  /**
   * @param {!proto.bucket.PutObjectUrlRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.PutObjectUrlResponse.deserializeBinary
);


/**
 * @param {!proto.bucket.PutObjectUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bucket.PutObjectUrlResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bucket.PutObjectUrlResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bucket.MinioServiceClient.prototype.putObjectUrl =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bucket.MinioService/PutObjectUrl',
      request,
      metadata || {},
      methodDescriptor_MinioService_PutObjectUrl,
      callback);
};


/**
 * @param {!proto.bucket.PutObjectUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bucket.PutObjectUrlResponse>}
 *     A native promise that resolves to the response
 */
proto.bucket.MinioServicePromiseClient.prototype.putObjectUrl =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bucket.MinioService/PutObjectUrl',
      request,
      metadata || {},
      methodDescriptor_MinioService_PutObjectUrl);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bucket.DeleteObjectRequest,
 *   !proto.bucket.DeleteObjectResponse>}
 */
const methodDescriptor_MinioService_DeleteObject = new grpc.web.MethodDescriptor(
  '/bucket.MinioService/DeleteObject',
  grpc.web.MethodType.UNARY,
  proto.bucket.DeleteObjectRequest,
  proto.bucket.DeleteObjectResponse,
  /**
   * @param {!proto.bucket.DeleteObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.DeleteObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bucket.DeleteObjectRequest,
 *   !proto.bucket.DeleteObjectResponse>}
 */
const methodInfo_MinioService_DeleteObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bucket.DeleteObjectResponse,
  /**
   * @param {!proto.bucket.DeleteObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bucket.DeleteObjectResponse.deserializeBinary
);


/**
 * @param {!proto.bucket.DeleteObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bucket.DeleteObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bucket.DeleteObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bucket.MinioServiceClient.prototype.deleteObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bucket.MinioService/DeleteObject',
      request,
      metadata || {},
      methodDescriptor_MinioService_DeleteObject,
      callback);
};


/**
 * @param {!proto.bucket.DeleteObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bucket.DeleteObjectResponse>}
 *     A native promise that resolves to the response
 */
proto.bucket.MinioServicePromiseClient.prototype.deleteObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bucket.MinioService/DeleteObject',
      request,
      metadata || {},
      methodDescriptor_MinioService_DeleteObject);
};


module.exports = proto.bucket;

