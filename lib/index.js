/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/8/29
 * Time: 下午4:34
 */

// Document: https://docs.qingcloud.com/qingstor/sdk/js/

const fs = require('fs');
const qingstorSDK = require('qingstor-sdk');

class QingStor {
  constructor (options = {}) {
    this.options = options;
    const QingStor = qingstorSDK.QingStor;
    const Config = qingstorSDK.Config;
    const userConfig = new Config().loadDefaultConfig();
    userConfig.access_key_id = options.access_id;
    userConfig.secret_access_key = options.access_key;

    this.service = new QingStor(userConfig);
  }

  /**
   * 列出所有的 Bucket
   *
   */
  async listAllBuckets() {
    try {
      const result = await this.service.listBuckets({ location: this.options.location });
      if (result.ok) {
        return result.buckets;
      }else {
        return result;
      }
    }
    catch (e) {
      throw e;
    }
  }

  /**
   * 上传文件到指定 Bucket
   * @param 本地文件路径 sourcePath
   * @param 青云bucket地址 destPath
   */
  uploadObject(sourcePath, destPath) {
    const bucket = this.service.Bucket(this.options.bucket_name, this.options.location);
    // 去除 destPath 开头的斜杠
    if (destPath.substr(0, 1) === '/') {
      destPath = destPath.substr(1, destPath.length);
    }
    return new Promise((resolve, reject) => {
      bucket.putObject(
        destPath,
        {
          body: fs.readFileSync(sourcePath),
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  /**
   * 列出 bucket 中的 Object 文件
   *
   */
  async listObjectsOfBucket() {
    const bucket = await this.service.Bucket(this.options.bucket_name, this.options.location);
    try {
      const result = await bucket.listObjects(this.options);
      if (result.ok) {
        return result.keys;
      }else {
        return result;
      }
    }
    catch (e) {
      throw e;
    }
  }
}

module.exports = QingStor;
