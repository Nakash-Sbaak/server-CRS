-- CreateTable
CREATE TABLE `Student` (
    `student_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `level` INTEGER NOT NULL,
    `total_credits_earned` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,

    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_department_id_key`(`department_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `registration_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `registration_end_date` DATETIME(3) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistrationDetails` (
    `registration_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,

    PRIMARY KEY (`registration_id`, `course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `credits` INTEGER NOT NULL,
    `type` ENUM('REQUIRED', 'ELECTIVE') NOT NULL,
    `instructor_id` INTEGER NOT NULL,

    UNIQUE INDEX `Course_course_code_key`(`course_code`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoursePrerequesites` (
    `course_id` INTEGER NOT NULL,
    `course_prerequesites_id` INTEGER NOT NULL,

    PRIMARY KEY (`course_id`, `course_prerequesites_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `instructor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instructor_email_key`(`email`),
    PRIMARY KEY (`instructor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstructorDepartment` (
    `department_id` INTEGER NOT NULL,
    `instructor_id` INTEGER NOT NULL,

    PRIMARY KEY (`department_id`, `instructor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `department_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `enrollment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `semester` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`enrollment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistrationDetails` ADD CONSTRAINT `RegistrationDetails_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`registration_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistrationDetails` ADD CONSTRAINT `RegistrationDetails_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `Instructor`(`instructor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoursePrerequesites` ADD CONSTRAINT `CoursePrerequesites_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoursePrerequesites` ADD CONSTRAINT `CoursePrerequesites_course_prerequesites_id_fkey` FOREIGN KEY (`course_prerequesites_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstructorDepartment` ADD CONSTRAINT `InstructorDepartment_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstructorDepartment` ADD CONSTRAINT `InstructorDepartment_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `Instructor`(`instructor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
