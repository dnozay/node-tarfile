var assert = require('assert');
var path = require('path');
var tarfile = require('..');

var fixture = path.join(__dirname, 'fixtures/simple.tar');

describe('tarfile', function(){
  describe('#listTarfileMembersSync()', function(){
    it('should return list of files', function(){
      var listing = tarfile.listTarfileMembersSync(fixture);
      assert.deepEqual(["hello.txt","subfolder/","subfolder/testfile"],listing);
    })
  }),
  describe('#readTarfileMemberSync()', function(){
    it('should return contents of file', function(){
      var contents = tarfile.readTarfileMemberSync(fixture, 'hello.txt');
      assert.equal("hello world\n",contents);
      var contents = tarfile.readTarfileMemberSync(fixture, 'subfolder/testfile');
      assert.equal("testfile\n",contents);
    }),
    it('should throw error for wrong file', function(){
      function testfn() {
        tarfile.readTarfileMemberSync(fixture, 'incorrect.txt');
      };
      assert.throws(testfn, Error, 'file not found');
    })
  })
})
