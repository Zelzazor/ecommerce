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

@Index("CommentsVendor_pkey", ["id"], { unique: true })
@Entity("CommentsVendor", { schema: "public" })
export class CommentsVendor extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("boolean", { name: "recommended" })
  recommended: boolean;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @ManyToOne(() => User, (users) => users.commentsVendors)
  @JoinColumn([{ name: "vendorId", referencedColumnName: "id" }])
  vendor: User;
}
