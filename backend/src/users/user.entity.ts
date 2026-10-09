import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @ApiProperty({ format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ApiProperty({ example: "jane.doe@example.com", format: "email" })
  @Column({ type: "varchar", unique: true })
  email!: string;

  @ApiPropertyOptional({ example: "Jane", nullable: true, type: String })
  @Column({ name: "first_name", nullable: true, type: "varchar" })
  firstName!: string | null;

  @ApiPropertyOptional({ example: "Doe", nullable: true, type: String })
  @Column({ name: "last_name", nullable: true, type: "varchar" })
  lastName!: string | null;

  @ApiPropertyOptional({ nullable: true, type: Date })
  @Column({ name: "email_verified_at", nullable: true, type: "timestamptz" })
  emailVerifiedAt!: Date | null;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
  deletedAt!: Date | null;
}
