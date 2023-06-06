/*
  Warnings:

  - The primary key for the `animals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `clases` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_animals" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "birthdate" TEXT,
    "owner_id" INTEGER,
    "clase_id" INTEGER,
    "tipopart" TEXT,
    "hierro" TEXT,
    "mother" TEXT,
    "mother_id" INTEGER,
    "info" TEXT,
    "alive" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "animals_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "animals_clase_id_fkey" FOREIGN KEY ("clase_id") REFERENCES "clases" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_animals" ("alive", "birthdate", "clase_id", "created_at", "hierro", "id", "info", "mother", "mother_id", "name", "owner_id", "tipopart", "updated_at") SELECT "alive", "birthdate", "clase_id", "created_at", "hierro", "id", "info", "mother", "mother_id", "name", "owner_id", "tipopart", "updated_at" FROM "animals";
DROP TABLE "animals";
ALTER TABLE "new_animals" RENAME TO "animals";
CREATE UNIQUE INDEX "animals_id_key" ON "animals"("id");
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "password" TEXT,
    "nivel" INTEGER NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "nivel", "password", "updated_at") SELECT "created_at", "email", "id", "name", "nivel", "password", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_clases" (
    "id" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_clases" ("created_at", "description", "id", "updated_at") SELECT "created_at", "description", "id", "updated_at" FROM "clases";
DROP TABLE "clases";
ALTER TABLE "new_clases" RENAME TO "clases";
CREATE UNIQUE INDEX "clases_id_key" ON "clases"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
