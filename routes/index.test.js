var app = require("../app")
var request = require("supertest")

test("Home Page - Body Complet", async () => {
   await request(app).get('/')
      .expect(200)
});