import multer from 'multer'
import path from 'path'
import crypto from 'crypto'


export default {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file: any, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err, 'error')

                file.key = `${hash.toString('hex')}-${file.originalname}`
                    
                cb(null, file.key)
            })
        }
    }),
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif"
        ];
    
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type."));
        }
    }
}