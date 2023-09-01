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
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getReports(): Promise<Report[]> {
    return this.reportsService.getReports();
  }

  @Get(':id')
  getReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.getReport(id);
  }

  @Post()
  createReport(@Body() newReport: CreateReportDto) {
    return this.reportsService.createReport(newReport);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.deleteReport(id);
  }

  @Patch(':id')
  updateReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() report: UpdateReportDto,
  ) {
    return this.reportsService.updateReport(id, report);
  }
}
