-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "banco" TEXT,
ADD COLUMN     "cor" TEXT;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
