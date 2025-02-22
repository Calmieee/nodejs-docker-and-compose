import {
  IsString,
  IsUrl,
  IsArray,
  IsInt,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @IsInt({ each: true })
  itemsId: number[];

  @IsOptional()
  @IsString()
  @Length(1, 1024)
  description: string;
}
