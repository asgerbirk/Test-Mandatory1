/*
  Warnings:

  - You are about to drop the `postalcode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `postalcode`;

-- CreateTable
CREATE TABLE `postal_code` (
    `cPostalCode` CHAR(4) NOT NULL,
    `cTownName` VARCHAR(20) NULL,

    PRIMARY KEY (`cPostalCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
