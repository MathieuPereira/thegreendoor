var app = require("../app")
var request = require("supertest")

test("Ajout d'une vente - Body Complet", async () => {
   await request(app).post('/sales/create-sale')
      .send({
         brandName: "UnitTest",
         brandFastDesc: "gage de qualité",
         brandDesc: "spécialisé info",
         maxDiscount: "50",
         startingDate: "10/10/2022",
         endingDate: "01/01/2023",
         categories: "informatique",
         brandLabels: "greencode",
      })
      .expect(200)
});
