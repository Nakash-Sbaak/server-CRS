/*
  Warnings:

  - You are about to drop the column `level` on the `Student` table. All the data in the column will be lost.
  - Added the required column `enrollment_at` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpa` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "level",
ADD COLUMN     "enrollment_at" VARCHAR(150) NOT NULL,
ADD COLUMN     "gpa" VARCHAR(100) NOT NULL,
ALTER COLUMN "total_credits_earned" SET DEFAULT 0;
