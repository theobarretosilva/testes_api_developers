import { Test, TestingModule } from '@nestjs/testing';
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
    it('Deve retornar o objeto Developer', async () => {});

    it('Deve retornar uma exceção, pois não foi encontrado um developer com este Id', async () => {});
  });

  describe('createDeveloper', () => {
    it('Deve retornar o objeto Developer criado', async () => {});

    it('Deve retornar uma exceção, pois já existe um developer cadastrado com esses dados', async () => {});

    it('Deve retornar uma exceção, pois não foi possivel cadastrar o Developer', async () => {});
  });

  describe('updateDeveloper', () => {
    it('Deve retornar o objeto Developer atualizado', async () => {});

    it('Deve retornar uma exceção, pois não foi encontrado um developer com o Id informado', async () => {});

    it('Deve retornar uma exceção, pois não foi possivel atualizar o Developer', async () => {});
  });
});
