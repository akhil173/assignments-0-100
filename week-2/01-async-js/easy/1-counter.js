let n = 0;
function counter() {
  counter_int = setInterval(function () {
    console.log(n);
    n++;
    if (n > 10) {
      clearInterval(counter_int);
    }
  }, 1000);
}
counter();
