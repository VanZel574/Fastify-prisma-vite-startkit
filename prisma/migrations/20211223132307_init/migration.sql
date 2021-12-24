-- CreateTable
CREATE TABLE "Meas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT,
    "report_name" TEXT NOT NULL,
    "report_text" TEXT NOT NULL,
    "report_signature" TEXT,
    "report_obj" TEXT,
    "report_postanalysis" TEXT,
    "postanalysis_obj" TEXT,
    "obx" TEXT,
    "map_6190_init" TEXT,
    "map_6190_postanalysis" TEXT,
    "control_program" TEXT,
    "signature" TEXT,
    "computer_name" TEXT,
    "date" DATETIME
);
