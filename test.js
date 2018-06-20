async function test() {
  let a = await Promise.resolve(1);
  console.log(a);
}

test();

