const DEFAULTS = [7, 1, 49];

const inParams = process.argv.slice(2, 5).map(x => +x);
const params = [...inParams, ...DEFAULTS.slice(inParams.length)];
const err = validateNumbers(params);
if (err) {
    console.error("Error: ", err);
    process.exit(1);
}
const [n, min, max] = params;
console.log(`Successfully generated ${n} random numbers between ${min} and ${max}:`);
console.log(generateRandomSequence(n, min, max));

function random(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function validateNumbers(nums: number[]):string {
    const error = nums.map((value, index)=>{
        if (!Number.isInteger(value)) {
            return `Argument number ${index + 1} must be an integer number`;
        }
        return "";
    }).filter(x=>x).join("\n");
    if (error) {
        return error;
    }
    const [n, min, max] = nums;
    if (n < 1) {
        return `Argument number 1 must be a positive integer`;
    }
    if (min > max) {
        return `Argument number 2 must be less than or equal to the argument number 3`;
    }
    if (n > max - min + 1) {
        return `Argument number 1 must be less than or equal to the difference between the arguments 3 and 2`;
    }
    return "";
}

function generateBySelect(n: number, min: number, max: number): number[] {
    const length = max - min + 1;
    const numbers = Array.from({length})
        .map((_, i)=>min + i);
    for (let i = 0; i < n; i++) {
        const randomIndex = random(i, length - 1);
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]]; // all chosen numbers in the beginning
    }
    return numbers.slice(0, n);
}

function generateByMemoize(n: number, min: number, max: number): number[] {
    const nums = new Set<number>();
    while (nums.size < n) {
        const randomNumber = random(min, max);
        if (!nums.has(randomNumber)) {
            nums.add(randomNumber);
        }
    }
    return Array.from(nums.values());
}

function generateRandomSequence(n: number, min: number, max: number): number[] {
    const ratio = n / (max - min + 1);
    if (ratio < 0.2) {
        return generateByMemoize(n, min, max);
    }
    return generateBySelect(n, min, max);
}