import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text' })
  response: string;

  @Column({ type: 'text', nullable: true })
  context: string; // Önceki konuşma bağlamı

  @Column({ type: 'text', nullable: true })
  userProfile: string; // Kullanıcı sağlık profili JSON

  @Column({ default: 'user' })
  role: string; // 'user' veya 'assistant'

  @CreateDateColumn()
  createdAt: Date;
} 