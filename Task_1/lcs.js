function subString(arr) {
  if (arr.length < 1) {
    return "";
  }

  let first = arr[0];
  let result = "";

  for (let i = 0; i < first.length; i++) {
    for (let j = i + 1; j <= first.length; j++) {
      let stream = first.substring(i, j);
      let isCommon = true;

      for (let k = 1; k < arr.length; k++) {
        if (!arr[k].includes(stream)) {
          isCommon = false;
          break;
        }
      }

      if (isCommon && stream.length > result.length) {
        result = stream;
      }
    }
  }

  return result;
}

let arr = process.argv.slice(2);
let commonSubstring = subString(arr);

console.log(commonSubstring);
