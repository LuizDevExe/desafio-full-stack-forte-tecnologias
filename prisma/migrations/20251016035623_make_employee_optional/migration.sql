-- DropForeignKey
ALTER TABLE "public"."Assets" DROP CONSTRAINT "Assets_employeeId_fkey";

-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
