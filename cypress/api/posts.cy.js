/**
 * API Testing Demo
 *
 * This spec is intentionally separate from the Sauce Demo UI tests.
 *
 * Note: cy.intercept() does not intercept cy.request() calls. To trigger
 * a request through the browser so intercept can catch it, requests are
 * made via cy.window().then(win => win.fetch(...)). This is a known
 * Cypress constraint.
 */

describe("Posts API", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  context("direct requests", () => {
    it("returns 200 for valid id", () => {
      cy.request("GET", `${baseUrl}/posts/1`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.have.property("id", 1);
        expect(body).to.have.property("userId", 1);
        expect(body.title).to.be.a("string");
        expect(body.body).to.be.a("string");
      });
    });

    it("returns 201 for valid post payload with id", () => {
      cy.request("POST", `${baseUrl}/posts`, {
        title: "My test post",
        body: "This is the body",
        userId: 1,
      }).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property("id");
        expect(body.title).to.eq("My test post");
        expect(body.userId).to.eq(1);
      });
    });
  });

  context("mocked responses", () => {
    it("mocks response for valid id", () => {
      cy.intercept("GET", `${baseUrl}/posts/1`, {
        fixture: "post.json",
      }).as("getPost");
      cy.window().then((win) => win.fetch(`${baseUrl}/posts/1`));
      cy.wait("@getPost").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.have.property("id", 1);
        expect(response.body.title).to.eq("Sample post title");
      });
    });

    it("mocks 500 server error", () => {
      cy.intercept("GET", `${baseUrl}/posts/1`, {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      }).as("serverError");
      cy.window().then((win) => win.fetch(`${baseUrl}/posts/1`));
      cy.wait("@serverError").then(({ response }) => {
        expect(response.statusCode).to.eq(500);
        expect(response.body.error).to.eq("Internal Server Error");
      });
    });

    it("mocks 404 for invalid id", () => {
      cy.intercept("GET", `${baseUrl}/posts/99999`, {
        statusCode: 404,
        body: {},
      }).as("notFound");
      cy.window().then((win) => win.fetch(`${baseUrl}/posts/99999`));
      cy.wait("@notFound").then(({ response }) => {
        expect(response.statusCode).to.eq(404);
        expect(response.body).to.deep.eq({});
      });
    });
  });
});
