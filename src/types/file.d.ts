import "multer"
import {File} from "multer"
declare module "multer" {
    interface Multer {
        file?: File
    }
    interface File {
        location?: string
    }
}