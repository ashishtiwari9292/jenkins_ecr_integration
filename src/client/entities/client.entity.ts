import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
  @Column({ name: 'client_name', length: 200, nullable: false })
  clientName: string;

  @Column({ name: 'project_name', length: 500, nullable: false })
  projectName: string;

  @Column({ name: 'origin', length: 200, nullable: false })
  origin: string;

  @Column({ name: 'ship_address_line1', length: 500, nullable: false })
  shipAddressLine1: string;

  @Column({ name: 'ship_address_line2', length: 500, nullable: true })
  shipAddressLine2: string;

  @Column({ name: 'ship_city', length: 200, nullable: false })
  shipCity: string;

  @Column({ name: 'ship_state', length: 200, nullable: false })
  shipState: string;

  @Column({ name: 'ship_zip', length: 50, nullable: false })
  shipZip: string;

  @Column({ name: 'invoice_address_line1', length: 500, nullable: false })
  invoiceAddressLine1: string;

  @Column({ name: 'invoice_address_line2', length: 500, nullable: true })
  invoiceAddressLine2?: string;

  @Column({ name: 'invoice_city', length: 200, nullable: false })
  invoiceCity: string;

  @Column({ name: 'invoice_state', length: 200, nullable: false })
  invoiceState: string;

  @Column({ name: 'invoice_zip', length: 50, nullable: false })
  invoiceZip: string;
}
