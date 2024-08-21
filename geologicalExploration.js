const table = `Family		CH	Si	Fe	Ti	La	Pref
Форховиц		2	1	5	5	6	113
Фортейн		2	2	3	3	6	131
Форволынкин		1	1	2	4	5	133
Фордариан		2	2	4	6	4	112
Форпински		2	1	4	3	3	114
Фортала		3	2	6	5	6	141
Форсмит		2	1	6	6	7	142
Форхалас		2	2	6	5	5	144
Форкосиган		2	1	4	4	5	411
Форбреттен		2	2	6	6	7	232
Форлакиал		2	1	4	8	6	234
Формюир		2	2	5	6	5	421
Форратьер		2	1	5	7	6	441
Форпатрил		2	2	6	8	4	224
Форобио		2	1	8	7	5	242`
  .split("\n")
  .map((str) => str.split(/\t+/));

const tableHeader = table[0];
const tableBody = table.slice(1);

console.log(table, tableHeader, tableBody);

const out1 = {};
const out2 = {};

for (let i = 1; i < 6; ++i) {
  const resource = tableHeader[i];
  out1[resource] = [];
  out2[resource] = [];
  tableBody.forEach((line) => {
    const family = line[0];
    const prefix = line[6];
    const resourceCount = Number(line[i]);
    for (let j = 0; j < resourceCount; ++j) {
      let suffix = `${Math.floor(Math.random() * 1000)}`;
      while (suffix.length < 3) {
        suffix = "0" + suffix;
      }

      out1[resource].push(`${prefix}${suffix}`);
      out2[resource].push(`${prefix}${suffix} ${family}`);
    }
  });
}

const arr1 = objectToLineArray(out1);
const arr2 = objectToLineArray(out2);

console.log(arr1.join("\n"));
console.log(arr2.join("\n"));

function objectToLineArray(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push(key);
    value.forEach((coordLine) => acc.push("  " + coordLine));
    return acc;
  }, []);
}
