const rawInput = ["#.#.##..#.###...##.#....##....###",
"...#..#.#.##.....#..##.#...###..#",
"####...#..#.##...#.##..####..#.#.",
"..#.#..#...#..####.##....#..####.",
"....##...#.##...#.#.#...#.#..##..",
".#....#.##.#.##......#..#..#..#..",
".#.......#.....#.....#...###.....",
"#.#.#.##..#.#...###.#.###....#..#",
"#.#..........##..###.......#...##",
"#.#.........##...##.#.##..####..#",
"###.#..#####...#..#.#...#..#.#...",
".##.#.##.........####.#.#...##...",
"..##...#..###.....#.#...#.#..#.##",
".#...#.....#....##...##...###...#",
"###...#..#....#............#.....",
".#####.#......#.......#.#.##..#.#",
"#.#......#.#.#.#.......##..##..##",
".#.##...##..#..##...##...##.....#",
"#.#...#.#.#.#.#..#...#...##...#.#",
"##.#..#....#..##.#.#....#.##...##",
"...###.#.#.......#.#..#..#...#.##",
".....##......#.....#..###.....##.",
"........##..#.#........##.......#",
"#.##.##...##..###.#....#....###.#",
"..##.##....##.#..#.##..#.....#...",
".#.#....##..###.#...##.#.#.#..#..",
"..#..##.##.#.##....#...#.........",
"#...#.#.#....#.......#.#...#..#.#",
"...###.##.#...#..#...##...##....#",
"...#..#.#.#..#####...#.#...####.#",
"##.#...#..##..#..###.#..........#",
"..........#..##..#..###...#..#...",
".#.##...#....##.....#.#...##...##"];

const coords = {};
for (let y=0; y<rawInput.length; y++) {
    let thisLine = rawInput[y];
    for (let x=0; x<thisLine.length; x++) {
        let thisCoord = thisLine.substring(x, x+1);
        if (thisCoord == "#") {
            coords[x+','+y] = true;
        }
    }
}
const getQuadrant = (slopex, slopey) => {
    const quads = {
        'falsetrue': 'Q1',
        'truetrue': 'Q2',
        'truefalse': 'Q3',
        'falsefalse': 'Q4'
    };
    return quads[`${slopey>=0}${slopex>=0}`];
}
const countVisible = base => {
    const [basex, basey] = base.split(',');
    let slopes = {};
    Object.keys(coords).forEach(coord => {
        if (coord == base) return;
        const [coordx, coordy] = coord.split(',');
        const slopey = coordy - basey;
        const slopex = coordx - basex;
        const slope = slopey/slopex;
        const thisInd = `${getQuadrant(slopex, slopey)}${slope}`;
        if (!slopes[thisInd]) {
            slopes[thisInd] = [coord];
        } else {
            slopes[thisInd].push(coord);
        }
    })
    return slopes;
}

let max = 0;
let maxCoord;
let maxSlopes;
Object.keys(coords).forEach(c => {
    let slopes = countVisible(c);
    let count = Object.keys(slopes).length;
    if (count>max) {
        max = count;
        maxCoord = c;
        maxSlopes = slopes;
    }
})
console.log(max, maxCoord);

let destroyed = 0;
let q1keys = Object.keys(maxSlopes).filter(s => s.substring(0, 2)=='Q1');
const getSort = dir => {
    let mod = dir=='ASC'?1:-1;
    return (a, b) => {
        const slicedA = a.substring(2);
        const slicedB = b.substring(2);
        if (slicedA == 'Infinity') {
            return -1;
        }
        if (slicedB == 'Infinity') {
            return 1;
        }
        if (parseFloat(slicedA) < parseFloat(slicedB)) {
            return -1*mod;
        } else if (parseFloat(slicedA) > parseFloat(slicedB)) {
            return 1*mod;
        } else {
            return 0;
        }
    };
}
q1keys.sort(getSort('ASC'))
let q2keys = Object.keys(maxSlopes).filter(s => s.substring(0, 2)=='Q2');
q2keys.sort(getSort('DESC'))
let q3keys = Object.keys(maxSlopes).filter(s => s.substring(0, 2)=='Q3');
q3keys.sort(getSort('ASC'))
let q4keys = Object.keys(maxSlopes).filter(s => s.substring(0, 2)=='Q4');
q4keys.sort(getSort('ASC'))
const [centerx, centery] = maxCoord.split(',');
const distanceFromCenter = coord => {
    const [coordx, coordy] = coord.split(',');
    return Math.sqrt(Math.pow(coordy-centery, 2)+Math.pow(coordx-centerx, 2));
}
const distanceSort = (a, b) => {
    const da = distanceFromCenter(a);
    const db = distanceFromCenter(b);
    if (da < db) {
        return -1;
    } else if (da > db) {
        return 1;
    } else {
        return 0;
    }
}
Object.values(maxSlopes).forEach(s => s.sort(distanceSort));
const destroy = k => {
    let thisPoints = maxSlopes[k];
    if (thisPoints.length <1) return;
    destroyed++;
    console.log(destroyed, thisPoints[0]);
    maxSlopes[k] = maxSlopes[k].slice(1);
}
while (destroyed < 200) {
    q1keys.forEach(destroy)
    q2keys.forEach(destroy)
    q3keys.forEach(destroy)
    q4keys.forEach(destroy)
}