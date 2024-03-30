CREATE TABLE `ProductPrices` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `range` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `product` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductPrices_id_key` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
