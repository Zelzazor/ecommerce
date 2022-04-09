import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("Role_pkey", ["id"], { unique: true })
@Entity("Role", { schema: "public" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "smallint", name: "id" })
  id: number;

  @Column("text", { name: "rolename" })
  rolename: string;

  @Column("text", { name: "slug", nullable: true })
  slug: string | null;

  @OneToMany(() => User, (users) => users.role)
  users: User[];
}
