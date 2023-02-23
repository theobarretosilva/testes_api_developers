import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(developerDocumentation.ApiProperty.CreateTechnologyDto.Name)
  public name: string;
}
