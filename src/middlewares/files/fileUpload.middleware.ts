import  fs  from "fs"
import path from "path";
import multer from "multer"
import aws from "aws-sdk"
import multerS3 from "multer-s3"
import {config} from "../../config/"
import {IRequest} from "../../types/IRequest"



let storage;

if(!config.aws.S3Active){
    storage = multer.diskStorage({
    destination: function (req, _file, cb) {
        if(!fs.existsSync('./uploads')){
            fs.mkdirSync('./uploads');
        }
        if(!fs.existsSync(`./uploads/${req.user!.uuid}`)){
            fs.mkdirSync(`./uploads/${req.user!.uuid}`);
        }
        
        cb(null, `./uploads/${req.user!.uuid}`)
    },
    filename: function (_req, file, cb) {
        console.log(path.extname(file.originalname));
        console.log(path.basename(file.originalname, path.extname(file.originalname)));
        cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
}
else{
    const s3 = new aws.S3({
        secretAccessKey: config.aws.secretAccessKey,
        accessKeyId: config.aws.accessKeyId,
        region: config.aws.region
    });
    storage = multerS3({
        s3,
        bucket: config.aws.bucket!,
        acl: 'public-read',
        metadata: function (_req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req:IRequest, file, cb) {
            cb(null, `${req.user!.uuid}/${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`)
        }
    })
}

export const upload = multer({ storage: storage })