import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: {
        name: product.name,
      },
    });

    if (productFound) {
      return new HttpException('Product already exists', HttpStatus.CONFLICT);
    }
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  getProducts() {
    return this.productRepository.find();
  }

  async getProduct(id: number) {
    const productFound = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
    return productFound;
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedProduct = Object.assign(productFound, product);
    return this.productRepository.save(updatedProduct);
  }
}
