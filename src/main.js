async function af() {
  console.log("af start");
  await new Promise(() => {
    console.log("p");
  });
  console.log("af ok");
  return "af end";
}

console.log("start");
af().then((res) => {
  console.log(res);
});
console.log("end");
