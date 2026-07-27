import { Repository } from 'typeorm';
import { DocGia } from './doc-gia.entity';
export declare class DocGiaService {
    private readonly docGiaRepository;
    constructor(docGiaRepository: Repository<DocGia>);
    findAll(): Promise<DocGia[]>;
    findOne(id: number): Promise<DocGia>;
    create(data: Partial<DocGia>): Promise<Partial<DocGia> & DocGia>;
    update(id: number, data: Partial<DocGia>): Promise<DocGia>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
