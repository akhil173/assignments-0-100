function clock(format) {
  setTimeout(() => {
    const currentTime = new Date();
    if (format === "12") {
      console.log(currentTime.toLocaleTimeString());
    } else {
      console.log(currentTime.toTimeString().split(" ")[0]);
    }
    clock(format);
  }, 1000);
}

function printDate(dateString) {
  console.log(dateString);
}

clock("24");
