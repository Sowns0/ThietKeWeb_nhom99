import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

import { SachModule } from './sach/sach.module';
import { Sach } from './sach/sach.entity';
import { PhieuMuonModule } from './phieu-muon/phieu-muon.module';
import { PhieuMuon } from './phieu-muon/phieu-muon.entity';
import { DocGiaModule } from './doc-gia/doc-gia.module';
import { DocGia } from './doc-gia/doc-gia.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_DATABASE ?? 'db.sqlite',
      entities: [User, Sach, PhieuMuon, DocGia],
      synchronize: process.env.NODE_ENV !== 'production',
    }),

    UserModule,
    AuthModule,
    SachModule,
    PhieuMuonModule,
    DocGiaModule,
  ],
})
export class AppModule {}
