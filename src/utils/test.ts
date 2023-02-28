import { CreateCountryDto } from 'src/core/dtos';
import { CountryEntity } from 'src/core/entities';
import { CreateTechnologyDto } from 'src/modules/developers/dto/create-technology.dto';
import { TechnologyEntity } from 'src/modules/developers/entities/technology.entity';

export class TestStatic {
  static countryData(): CountryEntity {
    const country = new CountryEntity();
    country.id = 1;
    country.language = 'Português';
    country.name = 'Brasil';
    country.createdAt = new Date();
    country.updatedAt = new Date();
    country.deletedAt = null;

    return country;
  }

  static countryDto(): CreateCountryDto {
    const countryBodyDto = new CreateCountryDto();
    countryBodyDto.language = 'Português';
    countryBodyDto.name = 'Brasil';

    return countryBodyDto;
  }

  static countriesData(): CountryEntity[] {
    const countries = ['Brasil', 'Canada', 'China'].map((name, index) => {
      const country = new CountryEntity();
      country.id = index + 1;
      country.language = 'Português';
      country.name = name;
      country.createdAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.updatedAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.deletedAt = null;

      return country;
    });

    return countries;
  }

  static technologyData(): TechnologyEntity {
    const technology = new TechnologyEntity();
    technology.createdAt = new Date();
    technology.deletedAt = null;
    technology.id = 1;
    technology.name = 'HTML5';
    technology.updatedAt = new Date();

    return technology;
  }

  static technologyDto(): CreateTechnologyDto {
    const technologyBodyDto = new CreateTechnologyDto();
    technologyBodyDto.name = 'HTML5';

    return technologyBodyDto;
  }

  static technologiesDto(): CreateTechnologyDto[] {
    const technologies = ['Java', 'CSS', 'JS', 'TS', 'Dart'].map((name) => {
      const technologiesDto = new CreateTechnologyDto();
      technologiesDto.name = name;

      return technologiesDto;
    });
    return technologies;
  }

  static technologiesEntities(): TechnologyEntity[] {
    const technologies = ['Java', 'CSS', 'JS', 'TS', 'Dart'].map(
      (name, index) => {
        const technologiesEntity = new TechnologyEntity();
        technologiesEntity.createdAt = new Date();
        technologiesEntity.deletedAt = null;
        technologiesEntity.id = index + 1;
        technologiesEntity.name = name;
        technologiesEntity.updatedAt = new Date();

        return technologiesEntity;
      },
    );
    return technologies;
  }
}
