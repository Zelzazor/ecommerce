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

@Index("ImagesSubmitting_pkey", ["id"], { unique: true })
@Entity("ImagesSubmitting", { schema: "public" })
export class ImagesSubmitting extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "imageURL" })
  imageUrl: string;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @ManyToOne(() => Submittings, (submittings) => submittings.imagesSubmittings)
  @JoinColumn([
    { name: "submitId", referencedColumnName: "id" },
    { name: "submitId", referencedColumnName: "id" },
  ])
  submittings: Submittings;
}
