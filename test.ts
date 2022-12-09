
let paramBody = '{\n    "name":"nanas",\n    "email":"nasri@mail.com"\n}'
let obj = JSON.parse(paramBody);
console.log(obj);
const item = {
    username: obj.name,
    email: obj.email,
  };

  console.log(item);