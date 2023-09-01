import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  async createReport(report: CreateReportDto) {
    const newReport = this.reportRepository.create(report);
    return this.reportRepository.save(newReport);
  }

  getReports() {
    return this.reportRepository.find();
  }

  async getReport(id: number) {
    const reportFound = await this.reportRepository.findOne({
      where: {
        id,
      },
    });

    if (!reportFound) {
      return new HttpException('Report Not Found', HttpStatus.NOT_FOUND);
    }
    return reportFound;
  }

  async deleteReport(id: number) {
    const result = await this.reportRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Report not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateReport(id: number, report: UpdateReportDto) {
    const reportFound = await this.reportRepository.findOne({
      where: {
        id,
      },
    });

    if (!reportFound) {
      return new HttpException('Report Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedReport = Object.assign(reportFound, report);
    return this.reportRepository.save(updatedReport);
  }
}
