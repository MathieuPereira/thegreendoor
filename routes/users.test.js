var app = require("../app")
var request = require("supertest")

test("Sign up - Body Incomplet", async () => {
   await request(app).post('/users/sign-up')
      .send({
         firstName: "Côme",
         lastName: "Terlecki",
         password: "azerty",
      })
      .expect(200)
      .expect({result: false, comment: "L'email rentré n'est pas valide"});
});

test("Sign in - Body Faux", async () => {
   await request(app).post('/users/sign-in')
      .send({
         email: "cometerlecki@gmail.com",
         password: "consolelog",
      })
      .expect(200)
      .expect({ result: false, comment: "L'email ou le mot de passe est faux" });
});
