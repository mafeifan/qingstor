## Getting Started

### Installation

npm install qingstor -S

### Usage

create env.js

```javascript
module.exports = {
  access_id: '**',
  access_key: '**',
  location: 'pek3a',
  bucket_name: '**',
};
```

```
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
```
