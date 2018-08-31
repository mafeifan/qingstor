/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/8/29
 * Time: 下午4:35
 */


const path = require('path');
const options = require('../env');
const qingstor = require('../lib');
const q = new qingstor(options);

q.listAllBuckets()
  .then(res => {
    console.log(res)
  });

q.listObjectsOfBucket()
  .then(res => {
    console.log(res)
  });

const sourceDir = path.dirname(__filename);
const sourcePath = sourceDir + '/demo.png';
q.uploadObject(sourcePath, '/demo/demo.png')
  .then(res => {
    console.log(res)
  });
