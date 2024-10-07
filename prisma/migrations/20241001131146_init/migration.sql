-- CreateTable
CREATE TABLE `PostalCode` (
    `cPostalCode` CHAR(4) NOT NULL,
    `cTownName` VARCHAR(20) NULL,

    PRIMARY KEY (`cPostalCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
