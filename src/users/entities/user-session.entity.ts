import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('SesionesUsuarios')
export class UserSession {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'UserId' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserId' })
  user: User;

  @Column({ name: 'SessionToken', unique: true, length: 64 })
  sessionToken: string;

  @Column({ name: 'DeviceInfo', type: 'nvarchar', length: 'MAX', nullable: true })
  deviceInfo: string; // JSON string de: {browser, os, ip, userAgent}

  @Column({ name: 'LastActivity', type: 'datetime' })
  lastActivity: Date;

  @Column({ name: 'IsActive', type: 'bit', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'CreatedAt', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'datetime' })
  updatedAt: Date;
}
