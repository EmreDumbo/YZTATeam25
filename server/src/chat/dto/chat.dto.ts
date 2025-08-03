import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  context?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class ChatResponseDto {
  id: number;
  message: string;
  response: string;
  context?: string;
  userProfile?: string;
  role: string;
  createdAt: Date;
}

export class ChatHistoryDto {
  messages: ChatResponseDto[];
  totalCount: number;
} 