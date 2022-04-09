import  fs  from "fs"
import path from "path";
import multer from "multer"


const storage = multer.diskStorage({
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

export const upload = multer({ storage: storage })