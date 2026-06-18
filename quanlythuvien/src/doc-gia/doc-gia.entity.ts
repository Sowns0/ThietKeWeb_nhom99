export interface DocGia {
  id: number;
  ho_ten: string;
  email: string;
  so_dien_thoai?: string | null;
  created_at?: string;
}

export type CreateDocGiaDto = Omit<DocGia, 'id' | 'created_at'>;

export type UpdateDocGiaDto = Partial<CreateDocGiaDto>;
