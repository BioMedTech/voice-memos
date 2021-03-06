/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.bucket.CreateBucketRequest');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.bucket.Bucket');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.bucket.CreateBucketRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.bucket.CreateBucketRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.bucket.CreateBucketRequest.displayName = 'proto.bucket.CreateBucketRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.bucket.CreateBucketRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.bucket.CreateBucketRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.bucket.CreateBucketRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.bucket.CreateBucketRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    bucket: (f = msg.getBucket()) && proto.bucket.Bucket.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.bucket.CreateBucketRequest}
 */
proto.bucket.CreateBucketRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.bucket.CreateBucketRequest;
  return proto.bucket.CreateBucketRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.bucket.CreateBucketRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.bucket.CreateBucketRequest}
 */
proto.bucket.CreateBucketRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.bucket.Bucket;
      reader.readMessage(value,proto.bucket.Bucket.deserializeBinaryFromReader);
      msg.setBucket(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.bucket.CreateBucketRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.bucket.CreateBucketRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.bucket.CreateBucketRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.bucket.CreateBucketRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBucket();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.bucket.Bucket.serializeBinaryToWriter
    );
  }
};


/**
 * optional Bucket bucket = 1;
 * @return {?proto.bucket.Bucket}
 */
proto.bucket.CreateBucketRequest.prototype.getBucket = function() {
  return /** @type{?proto.bucket.Bucket} */ (
    jspb.Message.getWrapperField(this, proto.bucket.Bucket, 1));
};


/** @param {?proto.bucket.Bucket|undefined} value */
proto.bucket.CreateBucketRequest.prototype.setBucket = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.bucket.CreateBucketRequest.prototype.clearBucket = function() {
  this.setBucket(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.bucket.CreateBucketRequest.prototype.hasBucket = function() {
  return jspb.Message.getField(this, 1) != null;
};


