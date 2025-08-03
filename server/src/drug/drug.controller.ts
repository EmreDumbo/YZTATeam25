import { Controller, Get, Param, Query } from '@nestjs/common';
import { DrugService } from './drug.service';

@Controller('drug')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Get('info/:drugName')
  async getDrugInfo(@Param('drugName') drugName: string) {
    try {
      return await this.drugService.getDrugInfo(drugName);
    } catch (error) {
      return {
        error: 'İlaç bilgisi alınamadı',
        details: error.message
      };
    }
  }

  @Get('side-effects/:drugName')
  async getSideEffects(@Param('drugName') drugName: string) {
    try {
      const sideEffects = await this.drugService.getSideEffects(drugName);
      return {
        drugName,
        sideEffects,
        count: sideEffects.length
      };
    } catch (error) {
      return {
        error: 'Yan etkiler alınamadı',
        details: error.message
      };
    }
  }

  @Get('uses/:drugName')
  async getUses(@Param('drugName') drugName: string) {
    try {
      const uses = await this.drugService.getUses(drugName);
      return {
        drugName,
        uses
      };
    } catch (error) {
      return {
        error: 'Kullanım alanları alınamadı',
        details: error.message
      };
    }
  }

  @Get('atc/:drugName')
  async getATCCodes(@Param('drugName') drugName: string) {
    try {
      const atcCodes = await this.drugService.getATCCodes(drugName);
      return {
        drugName,
        atcCodes,
        count: atcCodes.length
      };
    } catch (error) {
      return {
        error: 'ATC kodları alınamadı',
        details: error.message
      };
    }
  }

  @Get('active-ingredient/:drugName')
  async getActiveIngredient(@Param('drugName') drugName: string) {
    try {
      const activeIngredient = await this.drugService.getActiveIngredient(drugName);
      return {
        drugName,
        activeIngredient
      };
    } catch (error) {
      return {
        error: 'Etken madde bilgisi alınamadı',
        details: error.message
      };
    }
  }
} 