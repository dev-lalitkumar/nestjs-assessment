import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common"
import { ReviewsService } from "./reviews.service"
import { ReviewCreateDto } from "./dto/review-create.dto"
import { ReviewUpdateDto } from "./dto/review-update.dto"
import { ReviewListDto } from "./dto/review-list.dto"

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async list(@Query() reviewListDto: ReviewListDto) {
    return await this.reviewsService.list(reviewListDto)
  }

  @Post()
  async create(@Body() reviewCreateDto: ReviewCreateDto) {
    return await this.reviewsService.create(reviewCreateDto)
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() reviewUpdateDto: ReviewUpdateDto
  ) {
    return await this.reviewsService.update(id, reviewUpdateDto)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.reviewsService.delete(id)
  }
}
