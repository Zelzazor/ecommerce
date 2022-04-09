import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("Shipments_pkey", ["id"], { unique: true })
@Entity("Shipments", { schema: "public" })
export class Shipments extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("date", { name: "shipmentDate" })
  shipmentDate: string;

  @Column("uuid", { name: "uuid", default: () => "uuid_generate_v1()" })
  uuid: string;

  @ManyToOne(() => Orders, (orders) => orders.shipments)
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;
}
