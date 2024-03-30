CREATE TABLE `Unit` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Unit_id_key` (`id`),
  UNIQUE KEY `Unit_unit_key` (`unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
