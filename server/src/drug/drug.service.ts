import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';
import * as path from 'path';

@Injectable()
export class DrugService {
  private pythonScriptPath: string;

  constructor() {
    this.pythonScriptPath = path.join(__dirname, 'pharmai_data_simple.py');
  }

  async getDrugInfo(drugName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        mode: 'text' as const,
        pythonPath: 'python3',
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: path.dirname(this.pythonScriptPath),
        args: [drugName]
      };

      console.log('Python script path:', this.pythonScriptPath);
      console.log('Options:', options);

      PythonShell.run('pharmai_data_simple.py', options).then((results) => {
        console.log('Python results:', results);
        try {
          // Python script'ten gelen çok satırlı JSON'u birleştir
          const jsonString = results ? results.join('\n') : '';
          console.log('Joined JSON string:', jsonString);
          
          if (jsonString.trim()) {
            const drugInfo = JSON.parse(jsonString);
            console.log('Parsed drug info:', drugInfo);
            resolve(drugInfo);
          } else {
            resolve({
              ilaç_adi: drugName,
              error: 'İlaç bilgisi bulunamadı'
            });
          }
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          const jsonString = results ? results.join('\n') : '';
          console.error('Raw result that failed to parse:', jsonString);
          reject(parseError);
        }
      }).catch((err) => {
        console.error('Python script error:', err);
        reject(err);
      });
    });
  }

  async getSideEffects(drugName: string): Promise<string[]> {
    try {
      const drugInfo = await this.getDrugInfo(drugName);
      return drugInfo.yan_etkiler_tr || [];
    } catch (error) {
      console.error('Side effects error:', error);
      return [];
    }
  }

  async getUses(drugName: string): Promise<string> {
    try {
      const drugInfo = await this.getDrugInfo(drugName);
      return drugInfo.kullanım_alanları_tr || 'Kullanım alanı bulunamadı.';
    } catch (error) {
      console.error('Uses error:', error);
      return 'Kullanım alanı bulunamadı.';
    }
  }

  async getATCCodes(drugName: string): Promise<string[]> {
    try {
      const drugInfo = await this.getDrugInfo(drugName);
      return drugInfo.atc_sınıfı || [];
    } catch (error) {
      console.error('ATC codes error:', error);
      return [];
    }
  }

  async getActiveIngredient(drugName: string): Promise<string> {
    try {
      const drugInfo = await this.getDrugInfo(drugName);
      return drugInfo.etken_madde || drugName;
    } catch (error) {
      console.error('Active ingredient error:', error);
      return drugName;
    }
  }
} 