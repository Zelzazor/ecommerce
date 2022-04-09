import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Submittings } from "./Submittings";

@Index("CommentsSubmitting_pkey", ["id"], { unique: true })
@Entity("CommentsSubmitting", { schema: "public" })
export class CommentsSubmitting extends BaseEntity {
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

  @ManyToOne(
    () => Submittings,
    (submittings) => submittings.commentsSubmittings
  )
  @JoinColumn([
    { name: "submitId", referencedColumnName: "id" },
    { name: "submitId", referencedColumnName: "id" },
  ])
  submittings: Submittings;
}
