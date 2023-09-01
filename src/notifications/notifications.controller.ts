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
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  getNotifications(): Promise<Notification[]> {
    return this.notificationsService.getNotifications();
  }

  @Get(':id')
  getNotification(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.getNotification(id);
  }

  @Post()
  createNotification(@Body() newNotification: CreateNotificationDto) {
    return this.notificationsService.createNotification(newNotification);
  }

  @Delete(':id')
  deleteNotification(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.deleteNotification(id);
  }

  @Patch(':id')
  updateNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() notification: UpdateNotificationDto,
  ) {
    return this.notificationsService.updateNotification(id, notification);
  }
}
