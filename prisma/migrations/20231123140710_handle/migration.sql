-- DropForeignKey
ALTER TABLE "CoursePrerequisites" DROP CONSTRAINT "CoursePrerequisites_course_id_fkey";

-- AddForeignKey
ALTER TABLE "CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;
