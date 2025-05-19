-- CreateTable
CREATE TABLE "vacancy_matching_reviews" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "vacancy_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacancy_matching_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vacancy_matching_reviews_vacancy_id_idx" ON "vacancy_matching_reviews"("vacancy_id");

-- CreateIndex
CREATE INDEX "vacancy_matching_reviews_student_id_idx" ON "vacancy_matching_reviews"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "vacancy_matching_reviews_vacancy_id_student_id_key" ON "vacancy_matching_reviews"("vacancy_id", "student_id");

-- AddForeignKey
ALTER TABLE "vacancy_matching_reviews" ADD CONSTRAINT "vacancy_matching_reviews_vacancy_id_fkey" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancy_matching_reviews" ADD CONSTRAINT "vacancy_matching_reviews_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
