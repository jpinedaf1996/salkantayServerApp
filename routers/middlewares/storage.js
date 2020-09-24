const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}` )
    }
})

const upload = multer(
    { storage: storage,
    
    dest: path.join(__dirname, '../public/uploads'),
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb((new Error({message: 'Only .png, .jpg and .jpeg format allowed!'})));
        
    },
    limits: {fileSize: 5000000},
})

module.exports =  upload; 