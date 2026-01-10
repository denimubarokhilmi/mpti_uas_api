const data = [
  {
    name: "egi",
    age: 12,
  },
  {
    name: "deni",
    age: 33,
  },
];

const finds = data.find((el) => el.name == "egi");

const exampledata = {
  status: true,
};
Object.assign(finds, exampledata);
console.log(finds);
console.log(data);
