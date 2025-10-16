-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('DISPONIVEL', 'EM_USO', 'EM_MANUTENCAO');

-- CreateTable
CREATE TABLE "Companies" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "AssetStatus" NOT NULL DEFAULT 'DISPONIVEL',
    "employeeId" INTEGER,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies_cnpj_key" ON "Companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_cpf_key" ON "Employees"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
