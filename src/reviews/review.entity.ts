import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { QuestionDifficultyLevelEnum } from "./enums/question-difficulty-level.enum"

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  skillId: number

  @Column({ type: "enum", enum: QuestionDifficultyLevelEnum, nullable: false })
  difficultyLevel: QuestionDifficultyLevelEnum

  @Column()
  question: string

  @Column({ type: "text", nullable: true })
  response: string

  @Column({ nullable: true, default: null })
  rating: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
