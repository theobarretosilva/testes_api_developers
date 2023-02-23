const developerDocumentation = {
  ApiOperation: {
    getDeveloperById: {
      summary: 'getDeveloperById/:id',
      description:
        'Este endpoint recebe como Param o Id e retorna as informações do developer',
    },
    getTechnologyById: {
      summary: 'getTechnologyById/:id',
      description:
        'Este endpoint recebe como Param o Id e retorna as informações da Technology',
    },
    createTechnology: {
      summary: 'createTechnology',
      description:
        'Este endpoint recebe no Body o nome da Technology e retorna a Technology criada',
    },
    createManyTechnologies: {
      summary: 'createManyTechnologies',
      description:
        'Este endpoint recebe no Body o nome de várias Technologies e retorna as Technologies criadas',
    },
    createDeveloper: {
      summary: 'createDeveloper',
      description:
        'Este endpoint recebe no Body as tecnologias do developer, o id de usuário, os meses de experiência e se aceita trabalhar remotamente, retornando o developer criado',
    },
    updateDeveloper: {
      summary: 'updateDeveloper/:id',
      description:
        'Este endpoint recebe como Param o id do developer e recebe no Body as tecnologias do developer, os meses de experiência e se ele aceita trabalhar remotamente, retornando o developer atualizado',
    },
  },
  ApiProperty: {
    CreateDeveloperDto: {
      AcceptedRemoteWork: {
        name: 'acceptedRemoteWork',
        required: false,
        example: true,
      },
      MonthsOfExperience: {
        name: 'monthsOfExperience',
        required: true,
        example: 3,
      },
      User_id: {
        name: 'user_id',
        required: true,
        example: '2',
      },
      Technologies: {
        name: 'technologies',
        required: true,
        example: [1, 2, 3],
      },
    },
    CreateTechnologyDto: {
      Name: {
        name: 'name',
        required: true,
        example: 'Java',
      },
    },
    UpdateDeveloperDto: {
      AcceptedRemoteWork: {
        name: 'acceptedRemoteWork',
        required: false,
        example: true,
      },
      MonthsOfExperience: {
        name: 'monthsOfExperience',
        required: false,
        example: 3,
      },
      Technologies: {
        name: 'technologies',
        required: false,
        example: [1, 2, 3],
      },
    },
  },
  ApiResponse: {
    getDeveloperById: {
      Success: {
        status: 200,
        description: 'Developer encontrado com sucesso!',
      },
      BadRequest: {
        status: 400,
        description: 'Algo não foi preenchido corretamente!',
      },
    },
    getTechnologyById: {
      Success: {
        status: 200,
        description: 'Technology encontrada com sucesso!',
      },
      BadRequest: {
        status: 400,
        description: 'Algo não foi preenchido corretamente!',
      },
    },
    createTechnology: {
      Success: {
        status: 200,
        description: 'Technology criada com sucesso!',
      },
      BadRequest: {
        status: 400,
        description: 'Algo não foi preenchido corretamente!',
      },
      Conflict: {
        status: 409,
        description: 'Já existe uma Technology com esse nome!',
      },
    },
    createManyTechnologies: {
      Success: {
        status: 200,
        description: 'Technologies criadas com sucesso!',
      },
      BadRequest: {
        status: 400,
        description: 'Algo não foi preenchido corretamente!',
      },
      Conflict: {
        status: 409,
        description: 'Alguma Technology já está cadastrada, revise os dados!',
      },
    },
    createDeveloper: {
      Success: {
        status: 200,
        description: 'Developer criado com sucesso!',
      },
      BadRequest: {
        status: 400,
        description: 'Algo não foi preenchido corretamente!',
      },
      Conflict: {
        status: 409,
        description: 'Já existe um Developer com esse user_id!',
      },
    },
    updateDeveloper: {
      Success: {
        status: 200,
        description: 'Developer atualizado com sucesso!',
      },
      BadRequest: {
        status: 400,
        description: 'Algo não foi preenchido corretamente!',
      },
    },
  },
};

export { developerDocumentation };
