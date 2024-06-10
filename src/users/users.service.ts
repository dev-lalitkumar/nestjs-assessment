import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"
import { UserCreateDto } from "./dto/user-create.dto"
import { UserUpdateDto } from "./dto/user-update.dto"
import { UserListDto } from "./dto/user-list.dto"
import { Review } from "src/reviews/review.entity"

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>
  private reviewsRepository: Repository<Review>

  constructor(private readonly dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User)
    this.reviewsRepository = this.dataSource.getRepository(Review)
  }

  async list(userListDto: UserListDto) {
    const { page = 1, perPage = 15 } = userListDto
    try {
      const [users, total] = await this.usersRepository.findAndCount({
        select: ["id", "name", "email", "role", "createdAt"],
        skip: perPage * (page - 1),
        take: perPage,
        order: { name: "ASC" }
      })
      return {
        total,
        perPage,
        page,
        totalPages: Math.ceil(total / perPage),
        users
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to fetch the users`)
    }
  }

  async skills(id: string) {
    try {
      const reviews = await this.reviewsRepository
        .createQueryBuilder("review")
        .getMany()

      const data = {}
      for (const item of reviews) {
        if (!data[item.skillId]) {
          data[item.skillId] = {
            easy: [],
            medium: [],
            hard: []
          }
        }
        data[item.skillId][item.difficultyLevel].push(item.rating)
      }
      const skills = []
      for (const key in data) {
        const easy = data[key].easy.reduce((acc, item) => acc + item, 0)
        const medium = 2 * data[key].medium.reduce((acc, item) => acc + item, 0)
        const hard = 3 * data[key].hard.reduce((acc, item) => acc + item, 0)
        skills.push({
          skillId: key,
          rating: (
            (easy + medium + hard) /
            (data[key].easy.length +
              2 * data[key].medium.length +
              3 * data[key].hard.length)
          ).toFixed(1)
        })
      }
      return skills
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to fetch the skills`)
    }
  }

  async create(userCreateDto: UserCreateDto) {
    const { email, name, password, role } = userCreateDto
    try {
      let user = this.usersRepository.create({
        email,
        name,
        role,
        password
      })
      user = await this.usersRepository.save(user)
      return user
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to create user`)
    }
  }

  async update(id: string, userUpdateDto: UserUpdateDto) {
    const { email, name, password, role } = userUpdateDto
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id } })
      if (email) user.email = email
      if (name) user.name = name
      if (role) user.role = role
      if (password) user.password = password
      return await this.usersRepository.save(user)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to update the user`)
    }
  }

  async delete(id: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id } })
      await this.usersRepository.remove(user)
      return { message: "User deleted successfully" }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to delete user`)
    }
  }
}
