const fetch = require("node-fetch");
const util = require("util");

// Imports the Google Cloud client library.
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucket = storage.bucket("bucket-kishore-virtusa-project");
const bucketName = "bucket-kishore-virtusa-project";


const uploadFile = async (file) => {
  let promise = new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
      blobStream
      .on("finish", () => {
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
        // console.log(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
  let result = await promise;
  console.log(result);
}

const generateqrcode = async (url) => {
  try {
    const body = { url: url };

    const response = await fetch(
      "https://cloud-api-gateway-5kryqs3j.uc.gateway.dev/qrcoder?key=AIzaSyAxKfuJZKGB5zKeJlgQPxXW5kpucOvhCgQ",
      {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );

    return result = await response.text();
  } catch (err) {
    console.log("error: ", err);
  }
}

async function generateSignedUrl(filename,res) {
  // These options will allow temporary read access to the file
  const options = {
    version: "v2", // defaults to 'v2' if missing.
    action: "read",
    expires: Date.now() + 1000 * 60 * 10, // 10 minutes
    promptSaveAs: `${filename}`,
  };

  // Get a v2 signed URL for the file
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options);


  const qrcode = await generateqrcode(url); 
  res.render("share", { url: url,qrcode: qrcode });
}

// const generateSignedUrl = (filename) => {
//   const file = bucket.file(filename);
//   file.exists().then(function (data) {
//     if (data[0] === true) {
//       return true;
//     }
//     else{
//       console.log("Developer Note:File not yet uploaded into GCS");
//       return false;
//     }
//   });
  
// };

async function deleteFile() {
  // Deletes the file from the bucket
  await storage.bucket(bucketName).file(filename).delete();

  console.log(`gs://${bucketName}/${filename} deleted.`);
}

module.exports = {
  uploadFile:uploadFile,
  generateSignedUrl:generateSignedUrl,
};
