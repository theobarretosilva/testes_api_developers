import { Test, TestingModule } from '@nestjs/testing';
import { CountryRepository } from 'src/modules/countries/country.repository';
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
          provide: CountryRepository,
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

  it('DeveloperService deve ser definido', () => {});

  it('DeveloperRepository deve ser definido', () => {});
});