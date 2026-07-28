import { IsString, IsInt, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateSachDto {
  @IsString()
  @IsNotEmpty()
  ten_sach: string;

  @IsString()
  @IsNotEmpty()
  tac_gia: string;

  @IsString()
  @IsNotEmpty()
  the_loai: string;

  @IsInt()
  @Min(0)
  nam_xuat_ban: number;

  @IsInt()
  @Min(0)
  so_luong: number;

  @IsString()
  @IsOptional()
  hinh_anh?: string;
}
