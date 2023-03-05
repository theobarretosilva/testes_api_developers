import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/modules/users/services/user.service';
import { UserRepository } from 'src/modules/users/user.repository';
import { TestStatic } from 'src/utils/test';
import { DeveloperRepository } from '../repositories/developer.repository';
import { TechnologyRepository } from '../repositories/technology.repository';
import { DeveloperService } from './developer.service';
import { TechnologyService } from './technology.service';

describe('developerService', () => {
  let developerService: DeveloperService;
  let developerRepository: DeveloperRepository;
  let technologyService: TechnologyService;
  let userService: UserService;

  const mockRepository = {
    getById: jest.fn(),
    getByUser: jest.fn(),
    findById: jest.fn(),
    createDeveloper: jest.fn(),
    updateDeveloper: jest.fn(),
  };

  const mockTechnologyRepository = {
    getById: jest.fn(),
    getByName: jest.fn(),
    createTechnology: jest.fn(),
    createManyTechnologies: jest.fn(),
  };

  const mockUserRepository = {
    getById: jest.fn(),
    getByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperService,
        TechnologyService,
        UserService,
        {
          provide: DeveloperRepository,
          useValue: mockRepository,
        },
        {
          provide: TechnologyRepository,
          useValue: mockRepository,
        },
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    developerService = module.get<DeveloperService>(DeveloperService);
    developerRepository = module.get<DeveloperRepository>(DeveloperRepository);
    technologyService = module.get<TechnologyService>(TechnologyService);
    userService = module.get<UserService>(UserService);
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

  it('TechnologyService deve ser definido', () => {
    expect(technologyService).toBeDefined();
  });

  it('UserService deve ser definido', () => {
    expect(userService).toBeDefined();
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
      const user = TestStatic.userData();

      mockRepository.getByUser.mockReturnValue(null);
      mockUserRepository.getById.mockReturnValue(user);
      mockTechnologyRepository.getById.mockReturnValue(developer.technologies);
      mockRepository.createDeveloper.mockReturnValue(developer);

      const createdDeveloper = await developerService.createDeveloper(
        developerDto,
      );

      expect(createdDeveloper).toMatchObject(developer);

      expect(mockRepository.getByUser).toHaveBeenCalledTimes(1);
      expect(mockRepository.createDeveloper).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.getById).toHaveBeenCalledTimes(1);
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
      expect(mockRepository.createDeveloper).toHaveBeenCalledTimes(1);
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
      expect(mockRepository.getById).toHaveBeenCalledTimes(4);
      expect(mockRepository.updateDeveloper).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma exceção, pois não foi encontrado um developer com o Id informado', async () => {
      mockRepository.getById.mockReturnValue(null);
      const developerId = 1;

      await developerService.findById(developerId).catch((error: Error) => {
        expect(error).toMatchObject({
          message: 'developerNotFound',
        });
        expect(error).toBeInstanceOf(NotFoundException);
      });

      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });

    // it('Deve retornar uma exceção, pois não foi possivel atualizar o Developer', async () => {
    //   const developer = TestStatic.developerData();
    //   const developerDto = TestStatic.developerDto();

    //   mockRepository.updateDeveloper.mockReturnValue(null);
    //   mockRepository.getById.mockReturnValue(null);

    //   await developerService
    //     .updateDeveloper(developer.id, developerDto)
    //     .catch((error: Error) => {
    //       expect(error).toMatchObject({
    //         message: 'developerNotUpdate',
    //       });
    //       expect(error).toBeInstanceOf(BadRequestException);
    //     });

    //   expect(mockRepository.updateDeveloper).toHaveBeenCalledTimes(1);
    // });
  });
});
