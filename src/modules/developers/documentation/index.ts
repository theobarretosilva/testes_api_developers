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
};

export { developerDocumentation };
