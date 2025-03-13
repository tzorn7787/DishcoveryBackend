import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // User-Entity mit TypeORM verknüpfen
  controllers: [AuthController], // Controller für Authentifizierung
  providers: [AuthService], // Service für die Authentifizierungslogik
  exports: [AuthService], // AuthService für andere Module verfügbar machen
})
export class AuthModule {}
