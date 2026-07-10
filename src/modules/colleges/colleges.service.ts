import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mbaColleges } from '../../data/mbaColleges';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
@Injectable()
export class CollegesService {
  constructor(private prisma: PrismaService) {}

  async create(createCollegeDto: CreateCollegeDto) {
    return this.prisma.college.create({
      data: createCollegeDto,
    });
  }

async findAll(
  page = 1,
  limit = 6,
  search = "",
  state = ""
) {
  const skip = (page - 1) * limit;

const where: any = {};

if (search) {
  where.OR = [
    {
      name: {
        contains: search,
      },
    },
    {
      city: {
        contains: search,
      },
    },
    {
      state: {
        contains: search,
      },
    },
  ];
}

if (state) {
  where.state = state;
}

  const total = await this.prisma.college.count({
    where,
  });

  const colleges = await this.prisma.college.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      name: "asc",
    },
  });

  return {
    data: colleges,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  async findOne(id: string) {
    return this.prisma.college.findUnique({
      where: { id },
      include: {
        cutoffs: true,
      },
    });
  }
async update(id: string, updateCollegeDto: UpdateCollegeDto) {
  return this.prisma.college.update({
    where: { id },
    data: updateCollegeDto,
  });
}
  async delete(id: string) {
    return this.prisma.college.delete({
      where: { id },
    });
  }
 async importDefaultColleges() {
  let imported = 0;
  let skipped = 0;

  for (const college of mbaColleges) {
    const existing = await this.prisma.college.findFirst({
      where: {
        name: college.name,
      },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await this.prisma.college.create({
      data: {
        name: college.name,
        shortName: college.id.toUpperCase(),
        city: college.city,
        state: college.state,
        type: college.tier,
        fees: college.totalFees,
        avgPackage: college.avgPlacement,
        officialWebsite: null,
        seats: college.intake,
        imageUrl: college.logo,
      },
    });

    imported++;
  }

  return {
    message: "Default colleges imported successfully.",
    imported,
    skipped,
  };
}
}