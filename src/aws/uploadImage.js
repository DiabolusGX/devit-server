const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const config = require("../../configs/config");

const s3 = new AWS.S3({
	accessKeyId: config.aws.accessKeyID,
	secretAccessKey: config.aws.secretKey,
});

/**
 * Upload incoming image buffer to s3 bucket
 *
 * @param {Buffer} imageBuffer image buffer
 *
 * @return {Promise<String>} Returns image s3 url
 * @throws {Promise<Error>} If any error occurs while uploading
 */
const uploadImage = (imageBuffer) => {
	return new Promise((resolve, reject) => {
		const params = {
			Key: v4(),
			Bucket: config.aws.bucketName,
			Body: imageBuffer,
			ContentType: "image/png",
			ACL: config.aws.acl,
		};

		try {
			s3.upload(params, (err, data) => {
				if (err) reject(err);
				else resolve(data.Location);
			});
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
};

module.exports = uploadImage;
