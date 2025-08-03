import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  // Temel Kimlik Bilgileri
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender: string;

  // Sağlık Bilgileri
  @Column({ nullable: true })
  weight: number; // kg cinsinden

  @Column({ nullable: true })
  height: number; // cm cinsinden

  @Column({ type: 'text', nullable: true })
  currentMedications: string; // JSON string olarak saklanacak

  @Column({ type: 'text', nullable: true })
  allergies: string; // JSON string olarak saklanacak

  @Column({ type: 'text', nullable: true })
  chronicDiseases: string; // JSON string olarak saklanacak

  @Column({ type: 'text', nullable: true })
  bloodType: string;

  @Column({ type: 'text', nullable: true })
  emergencyContact: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 