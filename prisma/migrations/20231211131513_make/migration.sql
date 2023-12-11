/*
  Warnings:

  - The primary key for the `CoursePrerequisites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course_id` on the `CoursePrerequisites` table. All the data in the column will be lost.
  - You are about to drop the column `course_prerequisites_id` on the `CoursePrerequisites` table. All the data in the column will be lost.
  - Added the required column `course_code` to the `CoursePrerequisites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_prerequisites_code` to the `CoursePrerequisites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoursePrerequisites" DROP CONSTRAINT "CoursePrerequisites_course_id_fkey";

-- DropForeignKey
ALTER TABLE "CoursePrerequisites" DROP CONSTRAINT "CoursePrerequisites_course_prerequisites_id_fkey";

-- AlterTable
ALTER TABLE "CoursePrerequisites" DROP CONSTRAINT "CoursePrerequisites_pkey",
DROP COLUMN "course_id",
DROP COLUMN "course_prerequisites_id",
ADD COLUMN     "course_code" TEXT NOT NULL,
ADD COLUMN     "course_prerequisites_code" TEXT NOT NULL,
ADD CONSTRAINT "CoursePrerequisites_pkey" PRIMARY KEY ("course_code", "course_prerequisites_code");

-- AddForeignKey
ALTER TABLE "CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisites" ADD CONSTRAINT "CoursePrerequisites_course_prerequisites_code_fkey" FOREIGN KEY ("course_prerequisites_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;
