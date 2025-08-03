import { Controller, Post, Get, Body, Query, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto, ChatHistoryDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('message')
  async sendMessage(@Req() req, @Body(ValidationPipe) chatMessageDto: ChatMessageDto) {
    return this.chatService.createMessage(req.user.id, chatMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getChatHistory(
    @Req() req,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0
  ): Promise<ChatHistoryDto> {
    return this.chatService.getChatHistory(req.user.id, limit, offset);
  }
} 