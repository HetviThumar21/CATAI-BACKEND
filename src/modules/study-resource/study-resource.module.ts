import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { StudyResourceController } from "./study-resource.controller";
import { StudyResourceService } from "./study-resource.service";

@Module({
  imports: [PrismaModule],
  controllers: [StudyResourceController],
  providers: [StudyResourceService],
  exports: [StudyResourceService],
})
export class StudyResourceModule {}