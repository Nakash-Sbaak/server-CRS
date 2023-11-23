/*
  Warnings:

  - You are about to drop the `CoursePrerequesites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoursePrerequesites" DROP CONSTRAINT "CoursePrerequesites_course_id_fkey";

-- DropForeignKey
ALTER TABLE "CoursePrerequesites" DROP CONSTRAINT "CoursePrerequesites_course_prerequesites_id_fkey";

-- DropTable
DROP TABLE "CoursePrerequesites";

-- CreateTable
CREATE TABLE "CoursePrerequisites" (
    "course_id" INTEGER NOT NULL,
    "course_prerequisites_id" INTEGER NOT NULL,

    CONSTRAINT "CoursePrerequisites_pkey" PRIMARY KEY ("course_id","course_prerequisites_id")
);

-- AddForeignKey
ALTER TABLE "CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_course_prerequisites_id_fkey" FOREIGN KEY ("course_prerequisites_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
