import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(notification: CreateNotificationDto) {
    const newNotification = this.notificationRepository.create(notification);
    return this.notificationRepository.save(newNotification);
  }

  getNotifications() {
    return this.notificationRepository.find();
  }

  async getNotification(id: number) {
    const notificationFound = await this.notificationRepository.findOne({
      where: {
        id,
      },
    });

    if (!notificationFound) {
      return new HttpException('Notification Not Found', HttpStatus.NOT_FOUND);
    }
    return notificationFound;
  }

  async deleteNotification(id: number) {
    const result = await this.notificationRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateNotification(id: number, notification: UpdateNotificationDto) {
    const notificationFound = await this.notificationRepository.findOne({
      where: {
        id,
      },
    });

    if (!notificationFound) {
      return new HttpException('Notification Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedNotification = Object.assign(notificationFound, notification);
    return this.notificationRepository.save(updatedNotification);
  }
}
