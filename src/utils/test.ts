import { CreateCountryDto } from 'src/core/dtos';
import {
  CityEntity,
  CountryEntity,
  StateEntity,
  UserEntity,
} from 'src/core/entities';
import { CreateDeveloperDto } from 'src/modules/developers/dto/create-developer.dto';
import { CreateTechnologyDto } from 'src/modules/developers/dto/create-technology.dto';
import { DeveloperEntity } from 'src/modules/developers/entities/developer.entity';
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
    const technologies = [
      { name: 'Java' },
      { name: 'CSS' },
      { name: 'JS' },
      { name: 'TS' },
      { name: 'Dart' },
    ].map((technology) => {
      const technologiesDto = new CreateTechnologyDto();
      technologiesDto.name = technology.name;

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

  static stateData(): StateEntity {
    const state = new StateEntity();
    state.country = this.countryData();
    state.country_id = this.countryData().id;
    state.createdAt = new Date();
    state.deletedAt = null;
    state.id = 1;
    state.initials = 'MG';
    state.name = 'Minas Gerais';
    state.updatedAt = new Date();

    return state;
  }

  static cityData(): CityEntity {
    const city = new CityEntity();
    city.createdAt = new Date();
    city.deletedAt = null;
    city.id = 1;
    city.name = 'Juiz de Fora';
    city.state = this.stateData();
    city.state_id = this.stateData().id;
    city.updatedAt = new Date();

    return city;
  }

  static userData(): UserEntity {
    const user = new UserEntity();
    user.active = true;
    user.city = this.cityData();
    user.city_id = this.cityData().id;
    user.createdAt = new Date();
    user.deletedAt = null;
    user.email = 'email@teste.com.br';
    user.id = 1;
    user.name = 'Théo Silva';
    user.salt = 'R2goJQru8IC3Zso2WabjcIqygr2B5r';
    user.password = 'e1362338feb85a36b8b87849e5c982b0';
    user.updatedAt = new Date();

    return user;
  }

  static developerData(): DeveloperEntity {
    const developer = new DeveloperEntity();
    developer.acceptedRemoteWork = true;
    developer.createdAt = new Date();
    developer.deletedAt = null;
    developer.id = 1;
    developer.monthsOfExperience = 12;
    developer.technologies = this.technologiesEntities();
    developer.updatedAt = new Date();
    developer.user = this.userData();
    developer.user_id = this.userData().id;

    return developer;
  }

  static developerDto(): CreateDeveloperDto {
    const developerDto = new CreateDeveloperDto();
    developerDto.acceptedRemoteWork = true;
    developerDto.monthsOfExperience = 12;
    developerDto.technologies = [1, 2, 3];
    developerDto.user_id = 1;

    return developerDto;
  }
}
