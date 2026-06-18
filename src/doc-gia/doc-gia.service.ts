import { DocGia, CreateDocGiaDto, UpdateDocGiaDto } from './doc-gia.entity';

export class DocGiaService {
  private items: DocGia[] = [];
  private nextId = 1;

  create(dto: CreateDocGiaDto): DocGia {
    const item: DocGia = {
      id: this.nextId++,
      ho_ten: dto.ho_ten,
      email: dto.email,
      so_dien_thoai: dto.so_dien_thoai ?? null,
      created_at: new Date().toISOString(),
    };
    this.items.push(item);
    return item;
  }

  findAll(): DocGia[] {
    return [...this.items];
  }

  findOne(id: number): DocGia | undefined {
    return this.items.find((i) => i.id === id);
  }

  update(id: number, dto: UpdateDocGiaDto): DocGia | undefined {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    const existing = this.items[idx];
    const updated: DocGia = {
      ...existing,
      ho_ten: dto.ho_ten ?? existing.ho_ten,
      email: dto.email ?? existing.email,
      so_dien_thoai: dto.so_dien_thoai ?? existing.so_dien_thoai,
    };
    this.items[idx] = updated;
    return updated;
  }

  remove(id: number): boolean {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }
}

export const defaultDocGiaService = new DocGiaService();
