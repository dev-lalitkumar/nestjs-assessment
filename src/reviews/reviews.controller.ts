import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common"
import { ReviewsService } from "./reviews.service"
import { ReviewCreateDto } from "./dto/review-create.dto"
import { ReviewUpdateDto } from "./dto/review-update.dto"
import { ReviewListDto } from "./dto/review-list.dto"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"
import { AuthRoleGuard } from "src/auth/auth-role.guard"
import { UserRoleEnum } from "src/users/enums/user-role.enum"
import { ReviewRateDto } from "./dto/review-rate.dto"

@Controller("reviews")
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async list(@Query() reviewListDto: ReviewListDto) {
    return await this.reviewsService.list(reviewListDto)
  }

  @Get("skills")
  async skills() {
    return await this.reviewsService.skills()
  }

  @Post()
  @UseGuards(AuthRoleGuard(UserRoleEnum.CANDIDATE))
  async create(@Body() reviewCreateDto: ReviewCreateDto) {
    return await this.reviewsService.create(reviewCreateDto)
  }

  @Patch(":id")
  @UseGuards(AuthRoleGuard(UserRoleEnum.CANDIDATE))
  async update(
    @Param("id") id: string,
    @Body() reviewUpdateDto: ReviewUpdateDto
  ) {
    return await this.reviewsService.update(id, reviewUpdateDto)
  }

  @Patch(":id/rate")
  @UseGuards(AuthRoleGuard(UserRoleEnum.REVIEWER))
  async rate(@Param("id") id: string, @Body() reviewRateDto: ReviewRateDto) {
    return await this.reviewsService.rate(id, reviewRateDto)
  }

  @Delete(":id")
  @UseGuards(AuthRoleGuard(UserRoleEnum.CANDIDATE))
  async delete(@Param("id") id: string) {
    return await this.reviewsService.delete(id)
  }
}
