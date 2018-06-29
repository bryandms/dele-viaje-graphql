import fs from 'fs';
import shortid from 'shortid';
import AWS from 'aws-sdk';

export const storeFS = (stream, filename, uploadDir) => {
  const id = shortid.generate();
  const path = `${uploadDir}/${id}-${filename}`
  
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
};


export const storeS3File = async (file, cb) => {
  const id = shortid.generate();
  const { stream, filename } = await file;
  
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });
  
  let s3 = new AWS.S3();
  let params = {
    Bucket: 'dele-viaje',
    Body: fs.createReadStream(filename),
    Key: `images/${id}-${filename}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Uploaded in:", data.Location);
      console.log('data', data);
      cb(data);
    }
  });
};