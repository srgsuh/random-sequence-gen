const DEFAULTS = [7, 1, 49];
const COUNT_TO_RANGE_RATIO = 0.1;

type numTuple = [number, number, number];
type testFun = (a: numTuple) => boolean;

const CHECKS:{test: testFun, message: string}[] = [
    {
        test: (nums)=> nums.some(v => !Number.isInteger(v)),
        message: "All arguments must be integer numbers"
    },
    {
        test: (nums)=> nums[0] < 1,
        message: "The first argument must be a positive integer"
    },
    {
        test: (nums)=> nums[1] > nums[2],
        message: "The second argument must not be greater than the third argument"
    },
    {
        test: (a)=> a[0] > a[2] - a[1] + 1,
        message: "The first argument must not exceed the difference between other arguments"
    }
];

const inParams = process.argv.slice(2, 5).map(x => +x);
const [n, min, max] = [...inParams, ...DEFAULTS.slice(inParams.length)];

const err = validateInputs([n, min, max]);
if (err)  {
    console.error("Error: ", err);
    process.exit(1);
}

const sequence = generateRandomSequence(n, min, max);
console.log(`Successfully generated ${n} random numbers between ${min} and ${max}:`, sequence);

function random(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function validateInputs(a: numTuple) {
    return CHECKS.find(check =>check.test(a))?.message || "";
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
    if (ratio < COUNT_TO_RANGE_RATIO) {
        return generateByMemoize(n, min, max);
    }
    return generateBySelect(n, min, max);
}