import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateDocGiaDto {
  @IsString()
  @IsNotEmpty()
  ho_ten: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  so_dien_thoai?: string;
}
