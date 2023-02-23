import { IsBoolean, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { developerDocumentation } from '../documentation';

export class UpdateDeveloperDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty(
    developerDocumentation.ApiProperty.UpdateDeveloperDto.AcceptedRemoteWork,
  )
  public acceptedRemoteWork: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty(
    developerDocumentation.ApiProperty.UpdateDeveloperDto.MonthsOfExperience,
  )
  public monthsOfExperience: number;

  @IsOptional()
  @ApiProperty(
    developerDocumentation.ApiProperty.UpdateDeveloperDto.Technologies,
  )
  public technologies: number[];
}
