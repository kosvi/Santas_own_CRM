// Easy login when we don't want to manually login before each test
Cypress.Commands.add('login', ({ username, password }) => {

  // This is helper function to parse single permission
  const parsePermission = (dto, code) => {
    const defaultValues = { read: false, write: false };
    const foundValues = dto.permissions.find(p => p.code === code);
    if (foundValues) {
      return { read: foundValues.read, write: foundValues.write };
    }
    return defaultValues;
  };

  // This is a helper function to modify api-response in correct format 
  // for storing in the localStorage
  const userDTOtoAuthUser = (dto) => {
    return {
      ...dto,
      permissions: {
        users: parsePermission(dto, 'users'),
        people: parsePermission(dto, 'people'),
        permissions: parsePermission(dto, 'permissions'),
        wishes_and_items: parsePermission(dto, 'wishes_and_items'),
        entries: parsePermission(dto, 'entries')
      }
    };
  };

  cy.request('POST', `${Cypress.env('api_base')}/login`, {
    username,
    password
  })
    .then(({ body }) => {
      // our frontend stores the whole api-result into localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(userDTOtoAuthUser(body)));
      cy.visit(Cypress.env('web_base'));
    });
});