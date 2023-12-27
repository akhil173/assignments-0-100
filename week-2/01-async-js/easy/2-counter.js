let n = 0;
function counter() {
  console.log(n);
  setTimeout(function () {
    n++;
    if (n < 10) {
      counter();
    }
  }, 1000);
}
counter();
