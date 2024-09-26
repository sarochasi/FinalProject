-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mediadb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mediadb` ;

-- -----------------------------------------------------
-- Schema mediadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mediadb` DEFAULT CHARACTER SET utf8 ;
USE `mediadb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `enabled` TINYINT NOT NULL,
  `role` VARCHAR(45) NULL,
  `image_url` VARCHAR(2000) NULL,
  `biography` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media` ;

CREATE TABLE IF NOT EXISTS `media` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `source_url` VARCHAR(2000) NOT NULL,
  `name` VARCHAR(100) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `description` TEXT NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_media_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_media_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist` ;

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `image_url` VARCHAR(2000) NULL,
  `enabled` TINYINT NULL,
  `published` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tag` ;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tag_has_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tag_has_playlist` ;

CREATE TABLE IF NOT EXISTS `tag_has_playlist` (
  `tag_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`tag_id`, `playlist_id`),
  INDEX `fk_tag_has_playlist_playlist1_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_tag_has_playlist_tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_has_playlist_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_has_playlist_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tag_has_media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tag_has_media` ;

CREATE TABLE IF NOT EXISTS `tag_has_media` (
  `tag_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  PRIMARY KEY (`tag_id`, `media_id`),
  INDEX `fk_tag_has_media_media1_idx` (`media_id` ASC) VISIBLE,
  INDEX `fk_tag_has_media_tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_has_media_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_has_media_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_comment` ;

CREATE TABLE IF NOT EXISTS `media_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  `content` TEXT NULL,
  `created_at` DATETIME NULL,
  `in_reply_to_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_media1_idx` (`media_id` ASC) VISIBLE,
  INDEX `fk_media_comment_media_comment1_idx` (`in_reply_to_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_media_comment_media_comment1`
    FOREIGN KEY (`in_reply_to_id`)
    REFERENCES `media_comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `club`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `club` ;

CREATE TABLE IF NOT EXISTS `club` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(2000) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `created_by_user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_group_user1_idx` (`created_by_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_group_user1`
    FOREIGN KEY (`created_by_user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `club_has_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `club_has_user` ;

CREATE TABLE IF NOT EXISTS `club_has_user` (
  `club_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`club_id`, `user_id`),
  INDEX `fk_group_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_group_has_user_group1_idx` (`club_id` ASC) VISIBLE,
  CONSTRAINT `fk_group_has_user_group1`
    FOREIGN KEY (`club_id`)
    REFERENCES `club` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `club_has_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `club_has_playlist` ;

CREATE TABLE IF NOT EXISTS `club_has_playlist` (
  `club_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`club_id`, `playlist_id`),
  INDEX `fk_group_has_playlist_playlist1_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_group_has_playlist_group1_idx` (`club_id` ASC) VISIBLE,
  CONSTRAINT `fk_group_has_playlist_group1`
    FOREIGN KEY (`club_id`)
    REFERENCES `club` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_has_playlist_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_has_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_has_playlist` ;

CREATE TABLE IF NOT EXISTS `media_has_playlist` (
  `media_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`media_id`, `playlist_id`),
  INDEX `fk_media_has_playlist_playlist1_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_media_has_playlist_media1_idx` (`media_id` ASC) VISIBLE,
  CONSTRAINT `fk_media_has_playlist_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_media_has_playlist_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `favorite_media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favorite_media` ;

CREATE TABLE IF NOT EXISTS `favorite_media` (
  `user_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `media_id`),
  INDEX `fk_user_has_media_media1_idx` (`media_id` ASC) VISIBLE,
  INDEX `fk_user_has_media_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_media_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_media_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `favorite_playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favorite_playlist` ;

CREATE TABLE IF NOT EXISTS `favorite_playlist` (
  `user_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `playlist_id`),
  INDEX `fk_user_has_playlist_playlist1_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_user_has_playlist_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_playlist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_playlist_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playlist_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist_comment` ;

CREATE TABLE IF NOT EXISTS `playlist_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` TEXT NULL,
  `created_at` DATETIME NULL,
  `in_reply_to_id` INT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_media_comment_media_comment1_idx` (`in_reply_to_id` ASC) VISIBLE,
  INDEX `fk_playlist_comment_playlist1_idx` (`playlist_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user10`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_media_comment_media_comment10`
    FOREIGN KEY (`in_reply_to_id`)
    REFERENCES `playlist_comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_comment_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `friend` ;

CREATE TABLE IF NOT EXISTS `friend` (
  `user_id` INT NOT NULL,
  `friend_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `friend_id`),
  INDEX `fk_user_has_user_user2_idx` (`friend_id` ASC) VISIBLE,
  INDEX `fk_user_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`friend_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playlist_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist_rating` ;

CREATE TABLE IF NOT EXISTS `playlist_rating` (
  `user_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  `rating` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `rating_remark` TEXT NULL,
  PRIMARY KEY (`user_id`, `playlist_id`),
  INDEX `fk_user_has_playlist_playlist2_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_user_has_playlist_user2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_playlist_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_playlist_playlist2`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `media_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `media_rating` ;

CREATE TABLE IF NOT EXISTS `media_rating` (
  `media_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `rating_remark` TEXT NULL,
  PRIMARY KEY (`media_id`, `user_id`),
  INDEX `fk_media_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_media_has_user_media1_idx` (`media_id` ASC) VISIBLE,
  CONSTRAINT `fk_media_has_user_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_media_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS mediauser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'mediauser'@'localhost' IDENTIFIED BY 'mediauser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'mediauser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `mediadb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `image_url`, `biography`, `created_at`, `updated_at`) VALUES (1, 'test', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'standard', NULL, NULL, NULL, NULL);

COMMIT;

