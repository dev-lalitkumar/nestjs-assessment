import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { UserRoleEnum } from "./enums/user-role.enum"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ type: "enum", enum: UserRoleEnum, nullable: false })
  role: UserRoleEnum

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
