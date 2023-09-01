import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  getCategories() {
    return this.categoryRepository.find();
  }

  async getCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryFound) {
      return new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    return categoryFound;
  }

  async deleteCategory(id: number) {
    const result = await this.categoryRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryFound) {
      return new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedCategory = Object.assign(categoryFound, category);
    return this.categoryRepository.save(updatedCategory);
  }
}
