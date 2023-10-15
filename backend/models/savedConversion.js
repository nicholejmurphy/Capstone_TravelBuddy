//   /** Apply for job: update db, returns undefined.
//    *
//    * - username: username applying for job
//    * - jobId: job id
//    **/

//   static async applyToJob(username, jobId) {
//     const preCheck = await db.query(
//       `SELECT id
//            FROM jobs
//            WHERE id = $1`,
//       [jobId]
//     );
//     const job = preCheck.rows[0];

//     if (!job) throw new NotFoundError(`No job: ${jobId}`);

//     const preCheck2 = await db.query(
//       `SELECT username
//            FROM users
//            WHERE username = $1`,
//       [username]
//     );
//     const user = preCheck2.rows[0];

//     if (!user) throw new NotFoundError(`No username: ${username}`);

//     await db.query(
//       `INSERT INTO applications (job_id, username)
//            VALUES ($1, $2)`,
//       [jobId, username]
//     );
//   }
// }
