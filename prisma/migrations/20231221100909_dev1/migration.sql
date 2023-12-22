-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `validated` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAT` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `todoText` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `todo_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manytodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `todoText` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_tagsTotodo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_tagsTotodo_AB_unique`(`A`, `B`),
    INDEX `_tagsTotodo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manytodo` ADD CONSTRAINT `manytodo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tagsTotodo` ADD CONSTRAINT `_tagsTotodo_A_fkey` FOREIGN KEY (`A`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tagsTotodo` ADD CONSTRAINT `_tagsTotodo_B_fkey` FOREIGN KEY (`B`) REFERENCES `todo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
