const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
       const uniquName = Date.now() +
        '-' +
        Math.round(Math.random() * 1E9) +
         path.extname(file.originalname);
        cb(null, uniquName);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extension = allowedTypes.test
    (path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extension && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('only image files are allowed'));
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
module.exports = upload;