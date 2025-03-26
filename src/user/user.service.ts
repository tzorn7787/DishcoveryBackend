import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { FavoriteEntry } from './favorite-entry.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import { WatchEntry } from './watch-entry.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FavoriteEntry)
    private favoriteRepository: Repository<FavoriteEntry>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(WatchEntry)
    private watchRepository: Repository<WatchEntry>,
  ) {}

  // ✅ Benutzer erstellen mit DTO
  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.username = userDto.username;
    user.email = userDto.email;
    user.profileText = userDto.profileText || '';
    user.role = 'user';
    user.userImgUrl = userDto.userImgUrl || undefined;

    // Passwort hashen
    user.passwordHash = await bcrypt.hash(userDto.password, 10);

    return await this.usersRepository.save(user);
  }

  // Alle Benutzer abrufen
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // Einen Benutzer abrufen
  async readOne(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: { watchEntries: { recipe: true } },
    });
    return result ? result[0] : null;
  }

  // Benutzerprofil aktualisieren
  async updateProfile(userId: number, data: any): Promise<User> {
    console.log('Wir sind im Backend');

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.profileText) user.profileText = data.profileText;
    if (data.profileImage) {
      user.userImgUrl = data.profileImage;
      console.log('User-Image:', user.userImgUrl);
    }

    if (data.oldPassword && data.newPassword) {
      const isPasswordValid = await bcrypt.compare(data.oldPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error('Altes Passwort ist falsch');
      }
      user.passwordHash = await bcrypt.hash(data.newPassword, 10);
    }

    await this.usersRepository.save(user);
    return user;
  }

  // Benutzer löschen
  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Benutzer per E-Mail suchen
  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async toggleFavorite(userId: number, recipeId: number): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const recipe = await this.recipeRepository.findOne({ where: { id: recipeId } });
    if (!recipe) {
      throw new Error('Rezept nicht gefunden');
    }

    const existing = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        recipe: { id: recipeId },
      },
    });

    if (existing) {
      await this.favoriteRepository.remove(existing);
      return { message: 'Rezept wurde aus den Favoriten entfernt.' };
    }

    const newEntry = this.favoriteRepository.create({ user, recipe });
    await this.favoriteRepository.save(newEntry);
    return { message: 'Rezept wurde zu den Favoriten hinzugefügt.' };
  }

  async toggleWatch(userId: number, recipeId: number): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const recipe = await this.recipeRepository.findOne({ where: { id: recipeId } });
    if (!recipe) {
      throw new Error('Rezept nicht gefunden');
    }

    const existing = await this.watchRepository.findOne({
      where: {
        user: { id: userId },
        recipe: { id: recipeId },
      },
    });

    if (existing) {
      await this.watchRepository.remove(existing);
      return { message: 'Rezept wurde von der Merliste Favoriten entfernt.' };
    }

    const newEntry = this.watchRepository.create({ user, recipe });
    await this.watchRepository.save(newEntry);
    return { message: 'Rezept wurde zur Merkliste hinzugefügt.' };
  }

  async getWatchlist(userId: number): Promise<WatchEntry[]> {
    return this.watchRepository.find({
      where: { user: { id: userId } },
      relations: { recipe: true },
    });
  }

  async getFavorites(userId: number): Promise<FavoriteEntry[]> {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: { recipe: true },
    });
  }
}
