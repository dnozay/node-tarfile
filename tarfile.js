'use strict';

var fs = require('fs');
var tar = require('tar-stream');
var concat = require('concat-stream')
var deasync = require('deasync');

function readTarfileMember(tarfile, member, callback) {
    var extract = tar.extract();
    var found = false;
    extract.on('entry', function(header, stream, next) {
      if (header.name == member) {
        stream.pipe(concat(function(buff) {
          var data = buff.toString(); 
          found = true;
          callback(null, data);
        }));
      } else {
        stream.resume() // just auto drain the stream
      }
      next()
    });
    extract.on('finish', function() {
      // all entries read
      if (!found) {
        callback(new Error('file not found'));
      }
    });
    fs.createReadStream(tarfile)
      .pipe(extract);
}

function listTarfileMembers(tarfile, callback) {
    var extract = tar.extract();
    var members = [];
    extract.on('entry', function(header, stream, next) {
      members.push(header.name);
      stream.resume() // just auto drain the stream
      next();
    });
    extract.on('finish', function() {
      callback(null, members);
    });
    fs.createReadStream(tarfile)
      .pipe(extract);
}

var readTarfileMemberSync = deasync(readTarfileMember);
var listTarfileMembersSync = deasync(listTarfileMembers);

module.exports = {
  readTarfileMember: readTarfileMember,
  listTarfileMembers: listTarfileMembers,
  readTarfileMemberSync: readTarfileMemberSync,
  listTarfileMembersSync: listTarfileMembersSync
};
