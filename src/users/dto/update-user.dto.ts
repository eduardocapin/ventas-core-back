import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[^'"%;\\_]*$/, { message: 'Caracteres inválidos en user' })
  user?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[^'"%;\\_]*$/, { message: 'Caracteres inválidos en cargo' })
  cargo?: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsOptional()
  @IsString()
  oldpass?: string;

  @IsOptional()
  @IsString()
  newpass?: string;
}