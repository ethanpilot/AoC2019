const Combinatorics = require('js-combinatorics');
const rawInput = [3,8,1001,8,10,8,105,1,0,0,21,34,55,68,93,106,187,268,349,430,99999,3,9,102,5,9,9,1001,9,2,9,4,9,99,3,9,1001,9,5,9,102,2,9,9,101,2,9,9,102,2,9,9,4,9,99,3,9,101,2,9,9,102,4,9,9,4,9,99,3,9,101,4,9,9,102,3,9,9,1001,9,2,9,102,4,9,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,1002,9,5,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99]


const calc = (inputVar, phase, startPos = 0, input = JSON.parse(JSON.stringify(rawInput))) => {
    let offset, parameter1, parameter2, parameter3, opcode, output;
    for (let i=startPos; i<input.length; i+=offset) {
        offset = 4;
        opcode = input[i]%100;
        //if (input[i]%10000 != input[i]) {
            parameter3 = input[i+3]
        //} else {
            // parameter3 = i+3
        //}
        if ((input[i]%10000)%1000 == input[i]%10000) {
            parameter2 = input[i+2]
        } else {
            parameter2 = i+2
        }
        if (((input[i]%10000)%1000)%100 == (input[i]%10000)%1000) {
            parameter1 = input[i+1]
        } else {
            parameter1 = i+1
        }

        if (opcode == 1) {
            input[parameter3] = input[parameter1] + input[parameter2];
        } else if (opcode == 2) {
            input[parameter3] = input[parameter1] * input[parameter2];
        } else if (opcode == 3) {
            offset = 2;
            if (i==0) {
                input[parameter1] = phase;
            } else {
                input[parameter1] = inputVar;
            }
        } else if (opcode == 4) {
            offset = 2;
            // console.log(input[parameter1]);
            output = input[parameter1]
            return {
                output: output,
                offset: i+2,
                input: input
            }
        } else if (opcode == 5) {
            if (input[parameter1]) {
                i = input[parameter2];
                offset = 0;
            } else {
                offset = 3;
            }
        } else if (opcode == 6) {
            if (!input[parameter1]) {
                i = input[parameter2];
                offset = 0;
            } else {
                offset = 3; 
            }
        } else if (opcode == 7) {
            if (input[parameter1]<input[parameter2]) {
                input[parameter3] = 1;
            } else {
                input[parameter3] = 0;
            }
        } else  if (opcode == 8) {
            if (input[parameter1]==input[parameter2]) {
                input[parameter3] = 1;
            } else {
                input[parameter3] = 0;
            }
        } else if (opcode == 99) {
            break;
        }
    }
    // return output;
    return;
};

const allPhases = Combinatorics.permutation([0, 1, 2, 3, 4]).toArray();
const calcPhases = phases => {
    let stage1 = calc(0, phases[0]);
    let stage2 = calc(stage1.output, phases[1]);
    let stage3 = calc(stage2.output, phases[2]);
    let stage4 = calc(stage3.output, phases[3]);
    let stage5 = calc(stage4.output, phases[4]);
    return stage5;

}
let max = 0;
allPhases.forEach(phases => {
    let res = calcPhases(phases);
    if (res.output > max) {
        max = res.output;
    }
})
console.log(max);

const p2Phases = Combinatorics.permutation([5,6,7,8,9]).toArray();
const calcPhases2 = phases => {
    let stage1 = {};
    let stage2 = {};
    let stage3 = {};
    let stage4 = {};
    let stage5 = {output: 0};
    while (true) {
        stage1 = calc(stage5.output, phases[0], stage1.offset, stage1.input);
        if (!stage1) break;
        stage2 = calc(stage1.output, phases[1], stage2.offset, stage2.input);
        stage3 = calc(stage2.output, phases[2], stage3.offset, stage3.input);
        stage4 = calc(stage3.output, phases[3], stage4.offset, stage4.input);
        stage5 = calc(stage4.output, phases[4], stage5.offset, stage5.input);
    }
    return stage5;
}
max = 0;
p2Phases.forEach(phases => {
    let res = calcPhases2(phases);
    if (res.output > max) {
        max = res.output;
    }
})
console.log(max);