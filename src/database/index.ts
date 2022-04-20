import { DataSource } from "typeorm";
import { config } from "../config";
import { User } from "./entities/User";
import { VendorDetails } from "./entities/VendorDetails";
import { Submittings } from "./entities/Submittings";
import { Shipments } from "./entities/Shipments";
import { Role } from "./entities/Role";
import { Orders } from "./entities/Orders";
import { ImagesSubmitting } from "./entities/ImagesSubmitting";
import { CommentsVendor } from "./entities/CommentsVendor";
import { CommentsSubmitting } from "./entities/CommentsSubmitting";
import { Category } from "./entities/Category";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: config.db.synchronize,
    logging: config.db.logging,
    entities: [User, VendorDetails, Submittings, Shipments, Role, Orders, ImagesSubmitting, CommentsVendor, CommentsSubmitting, Category]
})