const input1 = 165432;
const input2 = 707912;

let nums = [];

outer:
for (let one = 1; one<=9; one++) {
    for (let two = one; two<= 9; two++) {
        for (let three = two; three<=9; three++) {
            for (let four = three; four<=9; four++) {
                for (let five = four; five<=9; five++) {
                    for (let six = five; six<=9; six++) {
                        let numArr = [one, two, three, four, five, six];
                        let numMap = {};
                        numArr.forEach(n => {
                            if (!numMap[n]) {
                                numMap[n] = 1;
                            } else {
                                numMap[n]++;
                            }
                        })
                        if (Object.values(numMap).includes(2)) {
                            let num = parseInt(numArr.join(''));
                            if (num > input2) {
                                break outer;
                            } else if (num > input1) {
                                nums.push(num);
                            }
                        }
                    }
                }
            }
        }
    }
}
console.log(nums.length);