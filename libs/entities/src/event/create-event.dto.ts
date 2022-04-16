import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isOutside: boolean;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  date: number;

  @ApiProperty()
  @IsNotEmpty()
  organizerId: string;
}
