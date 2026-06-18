-- SQL: Create table `doc_gia` (readers)
-- MySQL syntax
CREATE TABLE IF NOT EXISTS `doc_gia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ho_ten` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `so_dien_thoai` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- PostgreSQL alternative (uncomment to use):
-- CREATE TABLE IF NOT EXISTS doc_gia (
--   id SERIAL PRIMARY KEY,
--   ho_ten VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   so_dien_thoai VARCHAR(50),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
-- );
