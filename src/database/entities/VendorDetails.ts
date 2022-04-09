import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("VendorDetails_pkey", ["id"], { unique: true })
@Index("UniqueUser", ["userId"], { unique: true })
@Entity("VendorDetails", { schema: "public" })
export class VendorDetails extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "userId", unique: true })
  userId: number;

  @Column("numeric", {
    name: "reputation",
    precision: 3,
    scale: 2,
    default: () => "0.00",
  })
  reputation: string;

  @ManyToOne(() => User, (users) => users.vendorDetails)
  @JoinColumn([
    { name: "userId", referencedColumnName: "id" },
    { name: "userId", referencedColumnName: "id" },
  ])
  users: User;
}
