import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommentsVendor } from "./CommentsVendor";
import { Orders } from "./Orders";
import { Submittings } from "./Submittings";
import { Role } from "./Role";
import { VendorDetails } from "./VendorDetails";

@Index("EmailUnique", ["email"], { unique: true })
@Index("Users_pkey", ["id"], { unique: true })
@Entity("Users", { schema: "public" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "firstName" })
  firstName: string;

  @Column("text", { name: "lastName" })
  lastName: string;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("text", { name: "passwordHash" })
  passwordHash: string;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @OneToMany(() => CommentsVendor, (commentsVendor) => commentsVendor.vendor)
  commentsVendors: CommentsVendor[];

  @OneToMany(() => Orders, (orders) => orders.clientd)
  orders: Orders[];

  @OneToMany(() => Orders, (orders) => orders.vendor)
  orders2: Orders[];

  @OneToMany(() => Submittings, (submittings) => submittings.users)
  submittings: Submittings[];

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Role;

  @OneToMany(() => VendorDetails, (vendorDetails) => vendorDetails.users)
  vendorDetails: VendorDetails[];
}
