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

export function validateInputs(inputs: numTuple) {
    return CHECKS.find(check =>check.test(inputs))?.message || "";
}