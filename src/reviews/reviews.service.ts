import { Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { Review } from "./review.entity"
import { ReviewCreateDto } from "./dto/review-create.dto"
import { ReviewUpdateDto } from "./dto/review-update.dto"

@Injectable()
export class ReviewsService {
  private reviewsRepository: Repository<Review>

  constructor(private readonly dataSource: DataSource) {
    this.reviewsRepository = this.dataSource.getRepository(Review)
  }

  async list() {
    try {
    } catch (error) {}
  }

  async create(reviewCreateDto: ReviewCreateDto) {
    try {
    } catch (error) {}
  }

  async update(id: string, reviewUpdateDto: ReviewUpdateDto) {
    try {
    } catch (error) {}
  }

  async delete(id: string) {
    try {
    } catch (error) {}
  }
}
