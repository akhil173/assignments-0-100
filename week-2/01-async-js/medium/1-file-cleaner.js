const fs = require("fs");

function myreadFile(filename) {
  console.log(filename);
  return new Promise((resolve) => {
    fs.readFile(filename, "utf-8", function (err, data) {
      //   console.log(typeof data);
      const resolvedData = data.replace(/\s{2,}/g, " ").trim();
      resolve(resolvedData);
    });
  });
}

function myWriteFile(filename, data) {
  return new Promise((resolve) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Wrote "${data}" to file succesfully`);
      }
    });
  });
}

async function removeSpaces(filename) {
  let promise = await myreadFile(filename);
  //   console.log(promise);
  await myWriteFile(filename, promise);
}

removeSpaces("medium/a.txt");
