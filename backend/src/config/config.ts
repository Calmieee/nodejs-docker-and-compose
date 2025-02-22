import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

interface DatabaseConfig {
  type: string;
  url: string;
  port: number;
  username: string;
  password: string;
  entities: any[];
  synchronize: boolean;
}

interface Config {
  port: number;
  database: DatabaseConfig;
  jwtSecret: string;
}

export default (): Config => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  return {
    port: parseInt(process.env.PORT, 10) || 8000,
    database: {
      type: process.env.DATABASE_TYPE || 'postgres',
      url: databaseUrl,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'student',
      password: process.env.DATABASE_PASSWORD || 'student',
      entities: [User, Wish, Wishlist, Offer],
      synchronize: true,
    },
    jwtSecret: process.env.JWT_SECRET || 'some-super-secret-key',
  };
};
