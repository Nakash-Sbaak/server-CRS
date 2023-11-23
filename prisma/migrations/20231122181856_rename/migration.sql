/*
  Warnings:

  - You are about to drop the `CoursePrerequisites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoursePrerequisites" DROP CONSTRAINT "CoursePrerequisites_course_id_fkey";

-- DropForeignKey
ALTER TABLE "CoursePrerequisites" DROP CONSTRAINT "CoursePrerequisites_course_prerequisites_id_fkey";

-- DropTable
DROP TABLE "CoursePrerequisites";

-- CreateTable
CREATE TABLE "CoursePrerequesites" (
    "course_id" INTEGER NOT NULL,
    "course_prerequisites_id" INTEGER NOT NULL,

    CONSTRAINT "CoursePrerequesites_pkey" PRIMARY KEY ("course_id","course_prerequisites_id")
);

-- AddForeignKey
ALTER TABLE "CoursePrerequesites" ADD CONSTRAINT "CoursePrerequesites_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequesites" ADD CONSTRAINT "CoursePrerequesites_course_prerequisites_id_fkey" FOREIGN KEY ("course_prerequisites_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
