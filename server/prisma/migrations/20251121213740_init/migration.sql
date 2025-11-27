-- CreateTable
CREATE TABLE "specialists" (
    "id" UUID NOT NULL,
    "average_rating" DECIMAL NOT NULL,
    "is_draft" BOOLEAN NOT NULL,
    "total_number_of_ratings" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "base_price" DECIMAL NOT NULL,
    "platform_fee" DECIMAL NOT NULL,
    "final_price" DECIMAL NOT NULL,
    "verification_status" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "specialists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_offerings" (
    "id" UUID NOT NULL,
    "specialist_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_fee" (
    "id" UUID NOT NULL,
    "tier_name" TEXT NOT NULL,
    "min_value" INTEGER NOT NULL,
    "max_value" INTEGER NOT NULL,
    "platform_fee_percentage" DECIMAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" UUID NOT NULL,
    "specialist_id" UUID NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "display_order" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_offerings" ADD CONSTRAINT "service_offerings_specialist_id_fkey" FOREIGN KEY ("specialist_id") REFERENCES "specialists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_specialist_id_fkey" FOREIGN KEY ("specialist_id") REFERENCES "specialists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
