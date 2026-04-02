describe("Posts Api", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  context("live requests", () => {
    it("returns 200 for valid id", () => {
      cy.intercept("GET", `${baseUrl}/posts/1`).as("getPost");
      cy.window().then((win) => {
        return win.fetch(`${baseUrl}/posts/1`);
      });
      cy.wait("@getPost").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.have.property("id", 1);
        expect(response.body).to.have.property("userId", 1);
        expect(response.body.title).to.be.a("string");
      });
    });

    it("returns 201 for valid post payload with id", () => {
      cy.intercept("POST", `${baseUrl}/posts`).as("createPost");
      cy.window().then((win) => {
        return win.fetch(`${baseUrl}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "My test post",
            body: "This is the body",
            userId: 1,
          }),
        });
      });
      cy.wait("@createPost").then(({ request, response }) => {
        expect(request.body.title).to.eq("My test post");
        expect(request.body.userId).to.eq(1);
        expect(response.statusCode).to.eq(201);
        expect(response.body).to.have.property("id");
      });
    });
  });

  context("mocking responses", () => {
    it("mocks response using fixture data", () => {
      cy.intercept("GET", `${baseUrl}/posts/1`, {
        fixture: "products.json",
      }).as("fixturePost");
      cy.window().then((win) => {
        return win.fetch(`${baseUrl}/posts/1`);
      });
      cy.wait("@fixturePost").then(({ response }) => {
        expect(response.body).to.have.property("backpack");
        expect(response.body.backpack.name).to.eq("Sauce Labs Backpack");
      });
    });

    it("mocks 500 server error response", () => {
      cy.intercept("GET", `${baseUrl}/posts/1`, {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      }).as("serverError");
      cy.window().then((win) => {
        return win.fetch(`${baseUrl}/posts/1`);
      });
      cy.wait("@serverError").then(({ response }) => {
        expect(response.statusCode).to.eq(500);
        expect(response.body.error).to.eq("Internal Server Error");
      });
    });

    it("mocks 404 response for invalid post id", () => {
      cy.intercept("GET", `${baseUrl}/posts/99999`, {
        statusCode: 404,
        body: {},
      }).as("notFound");
      cy.window().then((win) => {
        return win.fetch(`${baseUrl}/posts/99999`);
      });
      cy.wait("@notFound").then(({ response }) => {
        expect(response.statusCode).to.eq(404);
        expect(response.body).to.deep.eq({});
      });
    });
  });
});
