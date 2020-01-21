/**
 * @fileoverview gRPC-Web generated client stub for object
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.object = require('./mongo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.object.MongoServiceClient =
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
proto.object.MongoServicePromiseClient =
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
 *   !proto.object.CreateObjectRequest,
 *   !proto.object.CreateObjectResponse>}
 */
const methodDescriptor_MongoService_CreateObject = new grpc.web.MethodDescriptor(
  '/object.MongoService/CreateObject',
  grpc.web.MethodType.UNARY,
  proto.object.CreateObjectRequest,
  proto.object.CreateObjectResponse,
  /**
   * @param {!proto.object.CreateObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.CreateObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.object.CreateObjectRequest,
 *   !proto.object.CreateObjectResponse>}
 */
const methodInfo_MongoService_CreateObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.object.CreateObjectResponse,
  /**
   * @param {!proto.object.CreateObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.CreateObjectResponse.deserializeBinary
);


/**
 * @param {!proto.object.CreateObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.object.CreateObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.object.CreateObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.object.MongoServiceClient.prototype.createObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/object.MongoService/CreateObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_CreateObject,
      callback);
};


/**
 * @param {!proto.object.CreateObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.object.CreateObjectResponse>}
 *     A native promise that resolves to the response
 */
proto.object.MongoServicePromiseClient.prototype.createObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/object.MongoService/CreateObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_CreateObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.object.ReadObjectRequest,
 *   !proto.object.ReadObjectResponse>}
 */
const methodDescriptor_MongoService_ReadObject = new grpc.web.MethodDescriptor(
  '/object.MongoService/ReadObject',
  grpc.web.MethodType.UNARY,
  proto.object.ReadObjectRequest,
  proto.object.ReadObjectResponse,
  /**
   * @param {!proto.object.ReadObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.ReadObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.object.ReadObjectRequest,
 *   !proto.object.ReadObjectResponse>}
 */
const methodInfo_MongoService_ReadObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.object.ReadObjectResponse,
  /**
   * @param {!proto.object.ReadObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.ReadObjectResponse.deserializeBinary
);


/**
 * @param {!proto.object.ReadObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.object.ReadObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.object.ReadObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.object.MongoServiceClient.prototype.readObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/object.MongoService/ReadObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_ReadObject,
      callback);
};


/**
 * @param {!proto.object.ReadObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.object.ReadObjectResponse>}
 *     A native promise that resolves to the response
 */
proto.object.MongoServicePromiseClient.prototype.readObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/object.MongoService/ReadObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_ReadObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.object.UpdateObjectRequest,
 *   !proto.object.UpdateObjectResponse>}
 */
const methodDescriptor_MongoService_UpdateObject = new grpc.web.MethodDescriptor(
  '/object.MongoService/UpdateObject',
  grpc.web.MethodType.UNARY,
  proto.object.UpdateObjectRequest,
  proto.object.UpdateObjectResponse,
  /**
   * @param {!proto.object.UpdateObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.UpdateObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.object.UpdateObjectRequest,
 *   !proto.object.UpdateObjectResponse>}
 */
const methodInfo_MongoService_UpdateObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.object.UpdateObjectResponse,
  /**
   * @param {!proto.object.UpdateObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.UpdateObjectResponse.deserializeBinary
);


/**
 * @param {!proto.object.UpdateObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.object.UpdateObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.object.UpdateObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.object.MongoServiceClient.prototype.updateObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/object.MongoService/UpdateObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_UpdateObject,
      callback);
};


/**
 * @param {!proto.object.UpdateObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.object.UpdateObjectResponse>}
 *     A native promise that resolves to the response
 */
proto.object.MongoServicePromiseClient.prototype.updateObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/object.MongoService/UpdateObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_UpdateObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.object.DeleteObjectRequest,
 *   !proto.object.DeleteObjectResponse>}
 */
const methodDescriptor_MongoService_DeleteObject = new grpc.web.MethodDescriptor(
  '/object.MongoService/DeleteObject',
  grpc.web.MethodType.UNARY,
  proto.object.DeleteObjectRequest,
  proto.object.DeleteObjectResponse,
  /**
   * @param {!proto.object.DeleteObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.DeleteObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.object.DeleteObjectRequest,
 *   !proto.object.DeleteObjectResponse>}
 */
const methodInfo_MongoService_DeleteObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.object.DeleteObjectResponse,
  /**
   * @param {!proto.object.DeleteObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.DeleteObjectResponse.deserializeBinary
);


/**
 * @param {!proto.object.DeleteObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.object.DeleteObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.object.DeleteObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.object.MongoServiceClient.prototype.deleteObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/object.MongoService/DeleteObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_DeleteObject,
      callback);
};


/**
 * @param {!proto.object.DeleteObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.object.DeleteObjectResponse>}
 *     A native promise that resolves to the response
 */
proto.object.MongoServicePromiseClient.prototype.deleteObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/object.MongoService/DeleteObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_DeleteObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.object.ListObjectRequest,
 *   !proto.object.ListObjectResponse>}
 */
const methodDescriptor_MongoService_ListObject = new grpc.web.MethodDescriptor(
  '/object.MongoService/ListObject',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.object.ListObjectRequest,
  proto.object.ListObjectResponse,
  /**
   * @param {!proto.object.ListObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.ListObjectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.object.ListObjectRequest,
 *   !proto.object.ListObjectResponse>}
 */
const methodInfo_MongoService_ListObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.object.ListObjectResponse,
  /**
   * @param {!proto.object.ListObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.object.ListObjectResponse.deserializeBinary
);


/**
 * @param {!proto.object.ListObjectRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.object.ListObjectResponse>}
 *     The XHR Node Readable Stream
 */
proto.object.MongoServiceClient.prototype.listObject =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/object.MongoService/ListObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_ListObject);
};


/**
 * @param {!proto.object.ListObjectRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.object.ListObjectResponse>}
 *     The XHR Node Readable Stream
 */
proto.object.MongoServicePromiseClient.prototype.listObject =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/object.MongoService/ListObject',
      request,
      metadata || {},
      methodDescriptor_MongoService_ListObject);
};


module.exports = proto.object;

