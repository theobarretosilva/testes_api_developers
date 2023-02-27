import { Test, TestingModule } from '@nestjs/testing';
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
    it('Deve retornar o objeto Technology', async () => {});

    it('Deve retornar uma exceção, pois não foi encontrada uma tecnologia com esse Id', async () => {});
  });

  describe('createTechnology', () => {});

  describe('createManyTechnologies', () => {});
});
