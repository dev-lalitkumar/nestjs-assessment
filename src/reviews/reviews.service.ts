import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { Review } from "./review.entity"
import { ReviewCreateDto } from "./dto/review-create.dto"
import { ReviewUpdateDto } from "./dto/review-update.dto"
import { ReviewListDto } from "./dto/review-list.dto"

@Injectable()
export class ReviewsService {
  private reviewsRepository: Repository<Review>

  constructor(private readonly dataSource: DataSource) {
    this.reviewsRepository = this.dataSource.getRepository(Review)
  }

  async list(reviewListDto: ReviewListDto) {
    const { page = 1, perPage = 15 } = reviewListDto
    try {
      const [reviews, total] = await this.reviewsRepository.findAndCount({
        select: [
          "id",
          "skillId",
          "difficultyLevel",
          "question",
          "rating",
          "response",
          "createdAt"
        ],
        skip: perPage * (page - 1),
        take: perPage,
        order: { createdAt: "DESC" }
      })
      return {
        total,
        perPage,
        page,
        totalPages: Math.ceil(total / perPage),
        reviews
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to fetch the reviews`)
    }
  }

  async create(reviewCreateDto: ReviewCreateDto) {
    const { difficultyLevel, question, rating, response, skillId } =
      reviewCreateDto
    try {
      const review = this.reviewsRepository.create({
        difficultyLevel,
        question,
        rating,
        response,
        skillId
      })
      return await this.reviewsRepository.save(review)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to create the review`)
    }
  }

  async update(id: string, reviewUpdateDto: ReviewUpdateDto) {
    const { difficultyLevel, question, rating, response, skillId } =
      reviewUpdateDto
    try {
      const review = await this.reviewsRepository.findOneOrFail({
        where: { id }
      })
      if (difficultyLevel) review.difficultyLevel = difficultyLevel
      if (question) review.question = question
      if (rating) review.rating = rating
      if (response) review.response = response
      if (skillId) review.skillId = skillId
      return await this.reviewsRepository.save(review)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to update the review`)
    }
  }

  async delete(id: string) {
    try {
      const review = await this.reviewsRepository.findOneOrFail({
        where: { id }
      })
      await this.reviewsRepository.remove(review)
      return { message: "Review deleted successfully" }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to delete the review`)
    }
  }
}
