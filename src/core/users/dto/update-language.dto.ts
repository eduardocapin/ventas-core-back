import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsIn } from 'class-validator';

export class UpdateLanguageDto {
  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Código del idioma (es, en, pt, zh, ar, fr)' })
  @IsString()
  @IsIn(['es', 'en', 'pt', 'zh', 'ar', 'fr'], { 
    message: 'El idioma debe ser uno de: es, en, pt, zh, ar, fr' 
  })
  lang: string;
}
