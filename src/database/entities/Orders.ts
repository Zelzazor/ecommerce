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
import { User } from "./User";
import { Submittings } from "./Submittings";
import { Shipments } from "./Shipments";

@Index("Orders_pkey", ["id"], { unique: true })
@Entity("Orders", { schema: "public" })
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("date", { name: "orderDate" })
  orderDate: string;

  @Column("numeric", { name: "unitPrice", precision: 10, scale: 2 })
  unitPrice: string;

  @Column("integer", { name: "stockAcquired" })
  stockAcquired: number;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @ManyToOne(() => User, (users) => users.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "clientd", referencedColumnName: "id" }])
  clientd: User;

  @ManyToOne(() => Submittings, (submittings) => submittings.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "submitId", referencedColumnName: "id" }])
  submit: Submittings;

  @ManyToOne(() => User, (users) => users.orders2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "vendorId", referencedColumnName: "id" }])
  vendor: User;

  @OneToMany(() => Shipments, (shipments) => shipments.order)
  shipments: Shipments[];
}
