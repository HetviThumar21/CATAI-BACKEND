import { Controller, Get, Param } from "@nestjs/common";
import { StudyResourceService } from "./study-resource.service";

@Controller("study-resources")
export class StudyResourceController {
  constructor(
    private readonly studyResourceService: StudyResourceService,
  ) {}

  @Get(":topic")
  async getResources(
    @Param("topic") topic: string,
  ) {
    return this.studyResourceService.getResources(topic);
  }
}