// /************************************** applyToJob */

// describe("applyToJob", function () {
//     test("works", async function () {
//       await User.applyToJob("u1", testJobIds[1]);

//       const res = await db.query("SELECT * FROM applications WHERE job_id=$1", [
//         testJobIds[1],
//       ]);
//       expect(res.rows).toEqual([
//         {
//           job_id: testJobIds[1],
//           username: "u1",
//         },
//       ]);
//     });

//     test("not found if no such job", async function () {
//       try {
//         await User.applyToJob("u1", 0, "applied");
//         fail();
//       } catch (err) {
//         expect(err instanceof NotFoundError).toBeTruthy();
//       }
//     });

//     test("not found if no such user", async function () {
//       try {
//         await User.applyToJob("nope", testJobIds[0], "applied");
//         fail();
//       } catch (err) {
//         expect(err instanceof NotFoundError).toBeTruthy();
//       }
//     });
//   });
