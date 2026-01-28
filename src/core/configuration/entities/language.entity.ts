import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity({ name: 'languages', schema: 'dbo' })
export class Language {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'nvarchar', length: 100 })
  name: string;

  @Column({ name: 'is_default', type: 'tinyint', default: 0 })
  isDefault: number;

  @Column({ type: 'tinyint', default: 1 })
  active: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
