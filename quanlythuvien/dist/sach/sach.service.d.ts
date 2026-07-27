import { Repository } from 'typeorm';
import { Sach } from './sach.entity';
export declare class SachService {
    private sachRepository;
    constructor(sachRepository: Repository<Sach>);
    findAll(): Promise<Sach[]>;
    findOne(id: number): Promise<Sach | null>;
    create(data: Partial<Sach>): Promise<Partial<Sach> & Sach>;
    update(id: number, data: Partial<Sach>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
