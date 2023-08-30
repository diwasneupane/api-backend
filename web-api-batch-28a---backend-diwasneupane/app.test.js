const app = require("./app");
const request = require("supertest");

const stafftoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdGFmZklkIjoiNjI3MjVhYjQ3ZTU0ODcxNWE1NDJjNGI4IiwiaWF0IjoxNjU4OTIxMTkzfQ.2psjdccaWJMEwHVZFvpXbDBZsQ01Z_hoP9GQTT16zsY";
const usertoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjJlMDJhOWQwMjIxMGJkNGIxMTU0NjFkIiwiaWF0IjoxNjU4OTE5MjY4fQ.P0y7GuaigrlV83IgyMfMss-08e8wcZ1wfAaixJAkdpA"

///first test
test("Customer login test", async () => {
    await request(app)
      .post("/customer/login")
      .send({
        email: "diwas29@gmail.com",
        password: "diwas123",
      })
      .expect("Content-Type", /json/)
  });

  //second test
  test("Customer register test", async () => {
    await request(app)
      .post("/customer/insert")
      .send({
        email: "diwas@gmail.com",
        password: "diwas123",
        fname : "diwas",
        lname :"neupane",
        address : "nakkhu",
        phone : "9847078571"
      })
      .expect("Content-Type", /json/)
  });

  //third test

    test("Customer profile", async () => {
    await request(app)
        .get("/customer/dashboard")
        .set("Authorization", usertoken)
        .expect("Content-Type", /json/)
    });

    //fourth test
    test("total Customer", async () => {
        await request(app)
            .get("/customer")
            .set("Authorization", stafftoken)
            .expect("Content-Type", /json/)
        });

    //fifth test
    test("total Product", async () => {
            await request(app)
                .get("/product")
                .expect("Content-Type", /json/)
            });
// //sixth test
//     test("single Product", async () => {
//             await request(app)
//                 .get("/product/single/:product_id")
//                 .expect("Content-Type", /json/)
//             });
//     //seventh test
//     test("Product added", async () => {
//         await request(app)
//             .post("/product/insert")
//             .set("Authorization", stafftoken)
//             .send({
//                 product_name: "Gamming mouse",
//                 product_price: 1000,
//                 product_description : "Best gamming mouse in class",
//                 product_quantity :10,
//                 product_category : "mouse"
                        
//                     })
//                     .expect("Content-Type", /json/)
//                 });
//                 //eighth test
//     test("Product update", async () => {
//         await request(app)
//             .put("/product/update")
//             .set("Authorization", stafftoken)
//             .send({
//                 id : "62e00ac69d66d20f069a4e3d",
//                 product_name: "mouse",
//                 product_price: 10000,
//                 product_description : "Best gamming mouse in class",
//                 product_quantity :100,
//                 product_category : "gaming mouse"
                        
//                     })
//                     .expect("Content-Type", /json/)
//                 });
//     //ninth test
//     test("Cart Part", async () => {
//         await request(app)
//           .post("/cart/insert")
//           .set("Authorization", usertoken)
//           .send({
//             product_id: "62b55beb6b5b6fdd59c90924@gmail.com",
//             user_id: "62e02a9d02210bd4b115461d",
//             cart_quantity : 10
//           })
//           .expect("Content-Type", /json/)
//         });
// //tenth test
//         test("Staff login test", async () => {
//             await request(app)
//               .post("/staff/login")
//               .send({
//                 email: "staff@gmail.com",
//                 password: "diwas123",
//               })
//               .expect("Content-Type", /json/)
//           });
// //eleven test
        
//           test("staff register test", async () => {
//             await request(app)
//               .post("/staff/insert")
//               .send({
//                 email: "staff123@gmail.com",
//                 password: "staff123",
//                 fname : "staff",
//                 lname :"staff",
//                 address : "kathmandu",
//                 phone : "9800000"
//               })
//               .expect("Content-Type", /json/)
//           });
// //twelve test
//           test("Staff profile", async () => {
//             await request(app)
//                 .get("/staff/dashboard")
//                 .set("Authorization", stafftoken)
//                 .expect("Content-Type", /json/)
//             });