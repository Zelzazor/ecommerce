import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Submittings } from "./Submittings";

@Index("Category_pkey", ["id"], { unique: true })
@Entity("Category", { schema: "public" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @OneToMany(() => Submittings, (submittings) => submittings.category)
  submittings: Submittings[];
}
