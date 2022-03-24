var app = require("../app")
var request = require("supertest")

test("Sign up - Body Incomplet", async () => {
   await request(app).post('/users/sign-up')
      .send({
         firstName: "Test",
         lastName: "Final",
         password: "testFinal69!",
      })
      .expect(449)
      .expect({comment: "L'email rentré n'est pas valide"});
});

test("Sign in - Body Faux", async () => {
   await request(app).post('/users/sign-in')
      .send({
         email: "test@final.com",
         password: "testFinal69",
      })
      .expect(409)
      .expect({ comment: "L'email ou le mot de passe est faux" });
});

test("Sign in - Body Correct", async () => {
   await request(app).post('/users/sign-in')
      .send({
         email: "test@final.com",
         password: "testFinal69!",
      })
      .expect(200)
      .expect({ token: "Dytll8uBIVnckvPPfCTSZScoJ80cVNSP" });
})
