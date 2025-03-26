import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WatchEntry } from './watch-entry.entity';
import { FavoriteEntry } from './favorite-entry.entity';
import { Recipe } from 'src/recipe/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WatchEntry, Recipe, FavoriteEntry])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService,TypeOrmModule],
})
export class UserModule {}
