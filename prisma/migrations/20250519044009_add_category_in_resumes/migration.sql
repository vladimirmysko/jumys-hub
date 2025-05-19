/*
  Warnings:

  - Added the required column `category_id` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "resumes_category_id_idx" ON "resumes"("category_id");

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
