describe('Blog app', function() {
  const user = {
    username: 'Username1',
    name: 'TestUser',
    password: '1234'
  };
  const anotherUser = {
    username: 'Username2',
    name: 'AnotherUser',
    password: '4321'
  };

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.clearLocalStorage();
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', anotherUser);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username')
        .type(user.username);
      cy.get('#password')
        .type(user.password);
      cy.get('#loginFormButton')
        .click();

      cy.get('.notificationBox')
        .should('contain', 'Logged in')
        .should('be.visible')
        .and('have.css', 'border-color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username')
        .type(user.username);
      cy.get('#password')
        .type(user.password + '1234');
      cy.get('#loginFormButton')
        .click();

      cy.get('.notificationBox')
        .should('contain', 'Invalid username or password')
        .should('be.visible')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    const newBlog = {
      title: 'Example Title',
      author: 'Example Author',
      url: 'Example Url'
    };

    beforeEach(function () {
      cy.login(user);
    });

    it('A blog can be created', function () {
      cy.contains('new blog')
        .click();

      cy.get('#createBlogFormTitle')
        .type(newBlog.title);
      cy.get('#createBlogFormAuthor')
        .type(newBlog.author);
      cy.get('#createBlogFormUrl')
        .type(newBlog.url);
      cy.get('#createBlogFormButton')
        .click();

      cy.contains(newBlog.title);
      cy.contains(newBlog.author);
    });

    describe('When blog is created', function () {
      beforeEach(function () {
        cy.createBlog(newBlog);
        cy.get('.blog').parent()
          .should('contain', newBlog.title)
          .and('contain', newBlog.author)
          .and('not.contain', newBlog.url)
          .and('not.contain', 'remove');

        cy.contains('view').click();
        cy.get('.blog').parent()
          .should('contain', newBlog.title)
          .and('contain', newBlog.author)
          .and('contain', 'likes 0')
          .and('contain', newBlog.url)
          .and('contain', 'remove');

        cy.contains('hide').click();
      });

      it('A blog can be liked', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('likes 1');
      });

      it('A blog can be removed', function () {
        cy.contains('view').click();
        cy.contains('remove').click();

        cy.get('.notificationBox')
          .should('contain', 'Blog deleted')
          .and('be.visible')
          .and('have.css', 'border-color', 'rgb(0, 128, 0)');
      });

      it('A blog cannot be removed by other user', function () {
        cy.login(anotherUser)
          .then(() => {
            cy.contains('view').click();
            cy.get('.blog').parent()
              .should('not.contain', 'remove');
          });
      });
    });

    it('Blogs are ordered by likes', function () {
      cy.createBlogWithLikes({ ...newBlog, title: 'Title 1', likes: 1 });
      cy.createBlogWithLikes({ ...newBlog, title: 'Title 2', likes: 3 });
      cy.createBlogWithLikes({ ...newBlog, title: 'Title 3' , likes: 2 });

      cy.get('.blog')
        .then(blogs => {
          const blogTitle1 = blogs[0].textContent.substr(0, 7);
          const blogTitle2 = blogs[1].textContent.substr(0, 7);
          const blogTitle3 = blogs[2].textContent.substr(0, 7);

          expect([blogTitle1, blogTitle2, blogTitle3]).to.have.ordered.members(['Title 2', 'Title 3', 'Title 1']);
        });
    });
  });
});
