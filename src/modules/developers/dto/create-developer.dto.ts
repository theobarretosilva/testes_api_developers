import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';

export class CreateDeveloperDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty(
    developerDocumentation.ApiProperty.CreateDeveloperDto.AcceptedRemoteWork,
  )
  public acceptedRemoteWork: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(
    developerDocumentation.ApiProperty.CreateDeveloperDto.MonthsOfExperience,
  )
  public monthsOfExperience: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(developerDocumentation.ApiProperty.CreateDeveloperDto.User_id)
  public user_id: number;

  @IsNotEmpty()
  @ApiProperty(
    developerDocumentation.ApiProperty.CreateDeveloperDto.Technologies,
  )
  public technologies: number[];
}
