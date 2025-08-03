import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';
import { ChatMessageDto, ChatResponseDto, ChatHistoryDto } from './dto/chat.dto';
import { AuthService } from '../auth/auth.service';
import { GeminiService } from '../ai/gemini.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    private authService: AuthService,
    private geminiService: GeminiService,
  ) {}

  async createMessage(userId: number, chatMessageDto: ChatMessageDto): Promise<ChatResponseDto> {
    // Kullanıcı profilini al
    const userProfile = await this.authService.getUserProfile(userId);
    
    // Önceki mesajları al (context için)
    const previousMessages = await this.getRecentMessages(userId, 5);
    
    // Gemini ile kapsamlı prompt oluştur
    const enhancedPrompt = await this.geminiService.createPharmacyAssistantPrompt(
      chatMessageDto.message,
      userProfile,
      previousMessages,
      null // drug database
    );

    // Gemini'den AI yanıtı al
    const aiResponse = await this.geminiService.generateResponse(enhancedPrompt);

    // Mesajı kaydet
    const chatMessage = this.chatMessageRepository.create({
      userId,
      message: chatMessageDto.message,
      response: aiResponse,
      context: chatMessageDto.context || JSON.stringify(previousMessages),
      userProfile: JSON.stringify(userProfile),
      role: 'user',
    });

    const savedMessage = await this.chatMessageRepository.save(chatMessage);

    return {
      id: savedMessage.id,
      message: savedMessage.message,
      response: savedMessage.response,
      context: savedMessage.context,
      userProfile: savedMessage.userProfile,
      role: savedMessage.role,
      createdAt: savedMessage.createdAt,
    };
  }

  async getChatHistory(userId: number, limit: number = 20, offset: number = 0): Promise<ChatHistoryDto> {
    const [messages, totalCount] = await this.chatMessageRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });

    const chatResponses: ChatResponseDto[] = messages.map(msg => ({
      id: msg.id,
      message: msg.message,
      response: msg.response,
      context: msg.context,
      userProfile: msg.userProfile,
      role: msg.role,
      createdAt: msg.createdAt,
    }));

    return {
      messages: chatResponses,
      totalCount,
    };
  }

  private async getRecentMessages(userId: number, limit: number): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
} 