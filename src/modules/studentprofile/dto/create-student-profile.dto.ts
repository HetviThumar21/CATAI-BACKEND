export class CreateStudentProfileDto {
  // Basic Details
  educationstage?: string;

  reservationcategory?: string;

  gender?: string;

  // Academics
  tenthpercentage!: number;

  twelfthpercentage!: number;

  graduationscore!: number;

  graduationstream!: string;

  // Experience
  isexperienced!: boolean;

  experiencemonths?: number;

  internshipcount?: number;

  currentrole?: string;

  leadershipexperience?: boolean;

  // Extra Profile
  certifications?: string;

  leadershipactivities?: string;

  competitions?: string;

  // MBA Goals
  targetexam?: string;

  attemptyear?: number;

  targetpercentile!: number;

  targetcolleges!: string;

  // Study
  weakareas!: string;

  dailystudyhours!: number;
}