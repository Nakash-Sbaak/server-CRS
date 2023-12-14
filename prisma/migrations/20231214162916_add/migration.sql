/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_otp_key" ON "Student"("otp");
