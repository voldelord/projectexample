import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  createCategory(@Body() newCategory: CreateCategoryDto) {
    return this.categoriesService.createCategory(newCategory);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, category);
  }
}
