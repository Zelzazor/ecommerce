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
import { CommentsSubmitting } from "./CommentsSubmitting";
import { ImagesSubmitting } from "./ImagesSubmitting";
import { Orders } from "./Orders";
import { Category } from "./Category";
import { User } from "./User";

@Index("fki_CategorySubmitting", ["categoryId"], {})
@Index("Submittings_pkey", ["id"], { unique: true })
@Entity("Submittings", { schema: "public" })
export class Submittings extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("numeric", { name: "unitPrice", precision: 10, scale: 2 })
  unitPrice: string;

  @Column("integer", { name: "stock" })
  stock: number;

  @Column("integer", { name: "categoryId", nullable: true })
  categoryId: number | null;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @OneToMany(
    () => CommentsSubmitting,
    (commentsSubmitting) => commentsSubmitting.submittings
  )
  commentsSubmittings: CommentsSubmitting[];

  @OneToMany(
    () => ImagesSubmitting,
    (imagesSubmitting) => imagesSubmitting.submittings
  )
  imagesSubmittings: ImagesSubmitting[];

  @OneToMany(() => Orders, (orders) => orders.submit)
  orders: Orders[];

  @ManyToOne(() => Category, (category) => category.submittings)
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => User, (users) => users.submittings)
  @JoinColumn([
    { name: "userId", referencedColumnName: "id" },
    { name: "userId", referencedColumnName: "id" },
  ])
  users: User;
}
