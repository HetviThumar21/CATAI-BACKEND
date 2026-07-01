import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CollegeImportService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async importExcel(file: any) {
    const workbook = XLSX.read(file.buffer, {
      type: 'buffer',
    });

    const sheet =
      workbook.Sheets[
        workbook.SheetNames[0]
      ];

    const rows: any[] =
      XLSX.utils.sheet_to_json(sheet);

    let imported = 0;
    let updated = 0;
    let failed = 0;

    for (const row of rows) {
  try {

    let college =
      await this.prisma.college.findFirst({
        where: {
          name: row.College,
        },
      });

    if (!college) {
      college =
        await this.prisma.college.create({
          data: {
            name: row.College,
            shortName: row.ShortName,
            city: row.City,
            state: row.State,
            type: row.Type,
            nirfRank: row.NIRF,
            fees: Number(row.Fees),
            avgPackage: Number(row.AvgPackage),
          },
        });

      imported++;
    } else {  

      await this.prisma.college.update({
        where: {
          id: college.id,
        },
        data: {
          city: row.City,
          state: row.State,
          type: row.Type,
          nirfRank: row.NIRF,
          fees: Number(row.Fees),
          avgPackage: Number(row.AvgPackage),
        },
      });

      updated++;
    }
const existingCutoff =
  await this.prisma.collegeCutoff.findFirst({
    where: {
      collegeId: college.id,
      exam: row.Exam,
      year: Number(row.Year),
      category: row.Category,
    },
  });

if (!existingCutoff) {
  await this.prisma.collegeCutoff.create({
    data: {
      collegeId: college.id,
      exam: row.Exam,
      year: Number(row.Year),
      category: row.Category,
      gender: row.Gender,
      academicBackground: row.AcademicBackground,
      overallPercentile: Number(row.Overall),
      varcCutoff: Number(row.VARC),
      dilrCutoff: Number(row.DILR),
      qaCutoff: Number(row.QA),
    },
  });
}
  } catch (e) {
    console.log(e);
    failed++;
  }
}

    return {
      total: rows.length,
      imported,
      updated,
      failed,
    };
  }
}