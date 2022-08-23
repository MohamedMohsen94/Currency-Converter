let users = [
  {
    id: 1,
    name: "Mohamed",
    schoolId: 101,
  },
  {
    id: 2,
    name: "Ahmed",
    schoolId: 999,
  },
];
let grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 90,
  },
  {
    id: 2,
    schoolId: 999,
    grade: 70,
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80,
  },
  {
    id: 4,
    schoolId: 101,
    grade: 60,
  },
];

let getUser = (id) => {
  return new Promise((resolve, reject) => {
    let user = users.find((user) => {
      return user.id === id;
    });
    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find users with id of ${id}`);
    }
  });
};

let getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(
      grades.filter((grade) => {
        return grade.schoolId === schoolId;
      })
    );
  });
};

let getStatus = (userId) => {
  let user;
  return getUser(userId)
    .then((tempuser) => {
      user = tempuser;
      return getGrades(user.schoolId);
    })
    .then((grades) => {
      let average = 0;
      if (grades.length > 0) {
        average = grades
          .map((grade) => {
            return grade.grade;
          })
          .reduce((acc, current) => {
            return (acc + current) / grades.length;
          });
      }
      return `${user.name} has a ${average}% in the class.`;
    });
};
// USING async-await
let getStatusUlt = async (userId) => {
  let user = await getUser(userId);
  let grades = await getGrades(user.schoolId);
  // console.log(user, grades);
  let average = 0;
  if (grades.length > 0) {
    average = grades
      .map((grade) => {
        return grade.grade;
      })
      .reduce((acc, current) => {
        return (acc + current) / grades.length;
      });
  }
  return `${user.name} has a ${average}% in the class.`;
};
getStatusUlt(1)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// getStatus(1)
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
