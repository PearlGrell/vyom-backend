-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
