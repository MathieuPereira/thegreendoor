var app = require("../app")
var request = require("supertest")

test("Sign up - Body Incomplet", async () => {
   await request(app).post('/users/sign-up')
      .send({
         firstName: "Unit",
         lastName: "Test",
         password: "console.log",
      })
      .expect(449)
      .expect({comment: "L'email rentré n'est pas valide"});
});

test("Sign in - Body Faux", async () => {
   await request(app).post('/users/sign-in')
      .send({
         email: "unittest@thegreendoor.com",
         password: "consolelog",
      })
      .expect(409)
      .expect({ comment: "L'email ou le mot de passe est faux" });
});

test("Sign in - Body Correct", async () => {
   await request(app).post('/users/sign-in')
      .send({
         email: "unittest@thegreendoor.com",
         password: "console.log",
      })
      .expect(200)
      .expect({ token: "Sw2J9U0yqJtab4KZHJAC2hcwCgq8-Fpa" });
})
