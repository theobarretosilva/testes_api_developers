import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { DeveloperEntity } from '../entities/developer.entity';
import { TechnologyEntity } from '../entities/technology.entity';
import { DeveloperService } from '../services/developer.service';
import { TechnologyService } from '../services/technology.service';
import { developerDocumentation } from '../documentation';

const { ApiOperation: apiOp, ApiResponse: apiRes } = developerDocumentation;

@ApiTags('developers')
@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private technologyService: TechnologyService,
  ) {}

  @ApiResponse(apiRes.getDeveloperById.BadRequest)
  @ApiResponse(apiRes.getDeveloperById.Success)
  @ApiOperation(apiOp.getDeveloperById)
  @Get('getDeveloperById/:id')
  async getDeveloperById(@Param('id') id: number): Promise<DeveloperEntity> {
    return await this.developerService.findById(id);
  }

  @ApiResponse(apiRes.getTechnologyById.BadRequest)
  @ApiResponse(apiRes.getTechnologyById.Success)
  @ApiOperation(apiOp.getTechnologyById)
  @Get('getTechnologyById/:id')
  async getTechnologyById(@Param('id') id: number): Promise<TechnologyEntity> {
    return await this.technologyService.findById(id);
  }

  @ApiResponse(apiRes.createTechnology.BadRequest)
  @ApiResponse(apiRes.createTechnology.Conflict)
  @ApiResponse(apiRes.createTechnology.Success)
  @ApiOperation(apiOp.createTechnology)
  @Post('createTechnology')
  async createTechnology(
    @Body() newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    return await this.technologyService.createTechnology(newTechnology);
  }

  @ApiResponse(apiRes.createManyTechnologies.BadRequest)
  @ApiResponse(apiRes.createManyTechnologies.Conflict)
  @ApiResponse(apiRes.createManyTechnologies.Success)
  @ApiOperation(apiOp.createManyTechnologies)
  @Post('createManyTechnologies')
  async createManyTechnologies(
    @Body() newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    return await this.technologyService.createManyTechnologies(newTechnologies);
  }

  @ApiResponse(apiRes.createDeveloper.BadRequest)
  @ApiResponse(apiRes.createDeveloper.Conflict)
  @ApiResponse(apiRes.createDeveloper.Success)
  @ApiOperation(apiOp.createDeveloper)
  @Post('createDeveloper')
  async createDeveloper(
    @Body() newDeveloper: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.createDeveloper(newDeveloper);
  }

  @ApiResponse(apiRes.updateDeveloper.BadRequest)
  @ApiResponse(apiRes.updateDeveloper.Success)
  @Patch('updateDeveloper/:id')
  async updateDeveloper(
    @Param('id') id: number,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.updateDeveloper(id, updateDeveloperDto);
  }
}
