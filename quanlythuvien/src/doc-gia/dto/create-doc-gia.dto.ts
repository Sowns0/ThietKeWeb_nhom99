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

  @IsString()
  @IsOptional()
  ma_doc_gia?: string;

  @IsString()
  @IsOptional()
  ngay_sinh?: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;

  @IsString()
  @IsOptional()
  trang_thai?: string;

  @IsString()
  @IsOptional()
  loai_doc_gia?: string;
}
