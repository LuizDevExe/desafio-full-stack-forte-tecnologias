/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");
