const request = require("supertest");
const app = require("../server"); // <- adjust path if your file is elsewhere

describe("Books API Assignment Tests", () => {

  // GET all books
  it("GET /api/books returns all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // GET book by ID
  it("GET /api/books/:id returns a book when ID exists", async () => {
    const res = await request(app).get("/api/books/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("GET /api/books/:id returns 404 when ID does not exist", async () => {
    const res = await request(app).get("/api/books/999");
    expect(res.statusCode).toBe(404);
  });

  // POST new book
  it("POST /api/books creates a new book", async () => {
    const newBook = {
      title: "Dune",
      author: "Frank Herbert",
      genre: "Sci-Fi",
      copiesAvailable: 4
    };

    const res = await request(app).post("/api/books").send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Dune");
  });

  // PUT update book
  it("PUT /api/books/:id updates an existing book", async () => {
    const updates = { copiesAvailable: 10 };
    const res = await request(app).put("/api/books/1").send(updates);
    expect(res.statusCode).toBe(200);
    expect(res.body.copiesAvailable).toBe(10);
  });

  it("PUT /api/books/:id returns 404 when ID does not exist", async () => {
    const res = await request(app).put("/api/books/999").send({ title: "Test" });
    expect(res.statusCode).toBe(404);
  });

  // DELETE book
  it("DELETE /api/books/:id removes a book", async () => {
    const res = await request(app).delete("/api/books/1");
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/books/:id returns 404 when ID does not exist", async () => {
    const res = await request(app).delete("/api/books/999");
    expect(res.statusCode).toBe(404);
  });

});
