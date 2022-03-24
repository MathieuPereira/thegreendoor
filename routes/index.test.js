var app = require("../app")
var request = require("supertest")

test("Home Page - Body Complet", async () => {
   await request(app).get('/home')
      .expect(200)
});

// test("Show Sale - Body Complet", async () => {
//    await request(app).get('/show-sale')
//     .query({
//           brandName: 'Picture Organic',
//        })
//        .expect(200)
// });

test("Show Sale - Body Incomplet", async () => {
   await request(app).get('/show-sale')
      .query({
         brandName: 'Potogonio',
      })
      .expect(404)
});