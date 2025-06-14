async function fn() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("hh");
}

fn();
