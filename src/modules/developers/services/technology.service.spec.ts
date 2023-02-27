import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestStatic } from 'src/utils/test';
import { TechnologyRepository } from '../repositories/technology.repository';
import { TechnologyService } from './technology.service';

describe('technologyService', () => {
  let technologyService: TechnologyService;
  let technologyRepository: TechnologyRepository;

  const mockRepository = {
    getById: jest.fn(),
    getByName: jest.fn(),
    createTechnology: jest.fn(),
    createManyTechnologies: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologyService,
        {
          provide: TechnologyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    technologyService = module.get<TechnologyService>(TechnologyService);
    technologyRepository =
      module.get<TechnologyRepository>(TechnologyRepository);
  });

  beforeEach(() => {
    mockRepository.createManyTechnologies.mockReset();
    mockRepository.createTechnology.mockReset();
    mockRepository.getById.mockReset();
    mockRepository.getByName.mockReset();
  });

  it('technologyService deve ser definido', () => {
    expect(technologyService).toBeDefined();
  });

  it('technologyRepository deve ser definido', () => {
    expect(technologyRepository).toBeDefined();
  });

  describe('findById', () => {
    it('Deve retornar o objeto Technology', async () => {
      const technology = TestStatic.technologyData();
      mockRepository.getById.mockReturnValue(technology);
      const foundTechnology = await technologyService.findById(technology.id);
      expect(foundTechnology).toMatchObject({ id: technology.id });
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois não foi encontrada uma tecnologia com esse Id', async () => {
      mockRepository.getById.mockReturnValue(null);
      const technologyId = 1;
      expect(technologyService.findById(technologyId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTechnology', () => {
    it('Deve retornar o objeto Technology criado', async () => {
      const technologyDTO = TestStatic.technologyDto();
      const technology = TestStatic.technologyData();
      mockRepository.getByName.mockReturnValue(null);
      mockRepository.createTechnology.mockReturnValue(technology);
      const createdCountry = await technologyService.createTechnology(
        technologyDTO,
      );
      expect(createdCountry).toMatchObject({
        name: technologyDTO.name,
      });
      expect(mockRepository.getByName).toHaveBeenCalledTimes(1);
      expect(mockRepository.createTechnology).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois já existe uma Technology com esses dados', async () => {
      mockRepository.createTechnology.mockReturnValue(null);
    });

    it('Deve retornar uma exceção, pois não foi possivel salvar a Technology', async () => {});
  });

  describe('createManyTechnologies', () => {});
});
