import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestStatic } from 'src/utils/test';
import { DeveloperRepository } from '../repositories/developer.repository';
import { DeveloperService } from './developer.service';

describe('developerService', () => {
  let developerService: DeveloperService;
  let developerRepository: DeveloperRepository;

  const mockRepository = {
    getById: jest.fn(),
    getByUser: jest.fn(),
    findById: jest.fn(),
    createDeveloper: jest.fn(),
    updateDeveloper: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperService,
        {
          provide: DeveloperRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    developerService = module.get<DeveloperService>(DeveloperService);
    developerRepository = module.get<DeveloperRepository>(DeveloperRepository);
  });

  beforeEach(() => {
    mockRepository.getById.mockReset();
    mockRepository.getByUser.mockReset();
    mockRepository.findById.mockReset();
    mockRepository.createDeveloper.mockReset();
    mockRepository.updateDeveloper.mockReset();
  });

  it('DeveloperService deve ser definido', () => {
    expect(developerService).toBeDefined();
  });

  it('DeveloperRepository deve ser definido', () => {
    expect(developerRepository).toBeDefined();
  });

  describe('findById', () => {
    it('Deve retornar o objeto Developer', async () => {
      const developer = TestStatic.developerData();
      mockRepository.getById.mockReturnValue(developer);
      const foundDeveloper = await developerService.findById(
        (
          await developer
        ).id,
      );
      expect(foundDeveloper).toMatchObject({ id: (await developer).id });
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois não foi encontrado um developer com este Id', async () => {
      mockRepository.getById.mockReturnValue(null);
      const developerId = 1;
      expect(developerService.findById(developerId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createDeveloper', () => {
    it('Deve retornar o objeto Developer criado', async () => {
      const developer = TestStatic.developerData();
      const developerDto = TestStatic.developerDto();
      mockRepository.getByUser.mockReturnValue(null);
      mockRepository.createDeveloper.mockReturnValue(developer);
      const createdDeveloper = await developerService.createDeveloper(
        developerDto,
      );
      expect(createdDeveloper).toMatchObject({
        acceptedRemoteWork: developerDto.acceptedRemoteWork,
        monthsOfExperience: developerDto.monthsOfExperience,
        user_id: developerDto.user_id,
        technologies: developerDto.technologies,
      });
      expect(mockRepository.getByUser).toHaveBeenCalledTimes(1);
      expect(mockRepository.createDeveloper).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois já existe um developer cadastrado com esses dados', async () => {
      const developer = TestStatic.developerData();
      const developerDto = TestStatic.developerDto();
      mockRepository.getByUser.mockReturnValue(developer);
      await developerService
        .createDeveloper(developerDto)
        .catch((error: Error) => {
          expect(error).toMatchObject({
            message: 'entityWithArgumentsExists',
          });
          expect(error).toBeInstanceOf(BadRequestException);
        });
      expect(mockRepository.getByUser).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois não foi possivel cadastrar o Developer', async () => {
      const developerDto = TestStatic.developerDto();
      mockRepository.createDeveloper.mockReturnValue(null);
      await developerService
        .createDeveloper(developerDto)
        .catch((error: Error) => {
          expect(error).toMatchObject({
            message: 'developerNotSave',
          });
          expect(error).toBeInstanceOf(BadRequestException);
        });
      expect(mockRepository.createDeveloper).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateDeveloper', () => {
    it('Deve retornar o objeto Developer atualizado', async () => {
      const developer = TestStatic.developerData();
      const developerDto = TestStatic.developerDto();
      const updatedDeveloper = {
        acceptedRemoteWork: false,
      };
      mockRepository.getById.mockReturnValue(developer);
      mockRepository.updateDeveloper.mockReturnValue({
        ...developer,
        ...updatedDeveloper,
      });
      const updateDeveloper = await developerService.updateDeveloper(
        (
          await developer
        ).id,
        developerDto,
      );
      expect(updateDeveloper).toMatchObject({
        acceptedRemoteWork: updatedDeveloper.acceptedRemoteWork,
      });
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateDeveloper).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois não foi encontrado um developer com o Id informado', async () => {
      mockRepository.getById.mockReturnValue(null);
      const developerId = 1;
      expect(developerService.findById(developerId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois não foi possivel atualizar o Developer', async () => {
      const developer = TestStatic.developerData();
      const developerDto = TestStatic.developerDto();
      mockRepository.updateDeveloper.mockReturnValue(null);
      await developerService
        .updateDeveloper((await developer).id, developerDto)
        .catch((error: Error) => {
          expect(error).toMatchObject({
            message: 'developerNotUpdate',
          });
          expect(error).toBeInstanceOf(BadRequestException);
        });
      expect(mockRepository.updateDeveloper).toHaveBeenCalledTimes(1);
    });
  });
});
