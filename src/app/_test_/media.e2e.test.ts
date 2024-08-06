

// it("POST /products/upload", async () => {
//     await userRepository.save(user);
//     await productRepository.save(product);


//     authorization = sign(
//       {
//         id: user.props.id,
//         email: user.props.email,
//       },
//       jwtSecret
//     );

//     const response = await supertest(app)
//       .post("/products/upload")
//       .set("authorization", authorization)
//       .send({
//         id: product.props.id,
//         image: product.props.image,
//         file: Buffer.from(""),
//         fileName: "Air Jordan",
//         mimetype: "jpg",
//       });
//     const responseBody = response.body;
//     expect(responseBody.message).toEqual("Image upload successfully");
//     expect(response.status).toBe(201);
//     jest.setTimeout(1000);
//   });

//   it("POST /products/upload should return a status 400", async () => {
//     authorization = sign(
//       {
//         id: user.props.id,
//         email: user.props.email,
//       },
//       jwtSecret
//     );
//     const response = await supertest(app)
//       .post("/products/upload")
//       .set("authorization", authorization);
//     expect(response.status).toBe(400);
//     jest.setTimeout(1000);
//   });