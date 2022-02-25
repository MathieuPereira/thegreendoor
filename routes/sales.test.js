var app = require("../app")
var request = require("supertest")

test("Ajout d'une vente - Body Complet", async () => {
   await request(app).post('/sales/create-sale')
      .send({
         brandName: "Salomon",
         brandFastDesc: "marque de sport",
         brandDesc: "spécialisé montagne",
         maxDiscount: "50",
         startingDate: "03/11/2022",
         endingDate: "01/01/2023",
         categories: "montagne,nature",
         brandLabels: "ecolo,vegan",
      })
      .expect(200)
      .expect({ result: true, comment: 'Article has been saved in DB'});
});
/*
test("Ajout d'une vente - Body Incomplet", async () => {
   await request(app).post('/sales/create-sale')
      .send({
         maxDiscount: "50",
         startingDate: "03/11/2022",
         endingDate: "01/01/2023",
         categories: "montagne,nature",
         brandLabels: "ecolo,vegan",
      })
      .expect(200)
      .expect({result: false, comment: 'Missing infos'});
});
 */