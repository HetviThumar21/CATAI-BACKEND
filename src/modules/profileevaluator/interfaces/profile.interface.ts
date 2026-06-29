export interface StudentProfile {
  userid: string;

  // Basic
  educationstage?: string | null;
  reservationcategory?: string | null;
  gender?: string | null;

  // Academics
  tenthpercentage?: number | null;
  twelfthpercentage?: number | null;
  graduationscore?: number | null;
  graduationstream?: string | null;

  // Experience
  isexperienced?: boolean | null;
  experiencemonths?: number | null;
  internshipcount?: number | null;
  currentrole?: string | null;
  leadershipexperience?: boolean | null;

  // Achievements
  certifications?: string | null;
  leadershipactivities?: string | null;
  competitions?: string | null;

  // MBA Goals
  targetexam?: string | null;
  attemptyear?: number | null;
  targetpercentile?: number | null;
  targetcolleges?: string | null;

  // Study
  weakareas?: string | null;
  dailystudyhours?: number | null;
}