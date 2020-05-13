Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogsUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsUser')).token}`
    }
  });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('createBlogWithLikes', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsUser')).token}`
    }
  })
    .then(({ body }) => {
      cy.request({
        url: `http://localhost:3001/api/blogs/${body.id}`,
        method: 'PUT',
        body: { title, author, url, likes },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsUser')).token}`
        }
      });
    });

  cy.visit('http://localhost:3000');
});
