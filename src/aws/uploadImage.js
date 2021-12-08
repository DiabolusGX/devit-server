const AWS = require("aws-sdk");
const config = require("../../configs/config");

const s3 = new AWS.S3({
	accessKeyId: config.aws.accessKeyID,
	secretAccessKey: config.aws.secretKey,
});

/**
 * Upload incoming image buffer to s3 bucket
 *
 * @param {String} filename image name
 * @param {String} bucketName name of s3 bucket
 * @param {Buffer} imageBuffer image buffer
 *
 * @return {Promise<String>} Returns image s3 url
 * @throws {Promise<Error>} If any error occurs while uploading
 */
const uploadImage = (filename, bucketName, imageBuffer) => {
	return new Promise((resolve, reject) => {
		const params = {
			Key: filename,
			Bucket: bucketName,
			Body: imageBuffer,
			ContentType: "image/png",
		};

		s3.upload(params, (err, data) => {
			if (err) reject(err);
			else resolve(data.Location);
		});
	});
};

module.exports = uploadImage;
