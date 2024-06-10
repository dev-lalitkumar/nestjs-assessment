import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { QuestionDifficultyLevelEnum } from "./enums/question-difficulty-level.enum"
import { User } from "src/users/user.entity"

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

  /**
   * I didn't create the relations as I think Assessment is not indicating to do that
   */

  // @ManyToOne(() => User, (candidate) => candidate.id)
  // candidate: User

  // @ManyToOne(() => User, (reviewer) => reviewer.id)
  // reviewer: User
}
