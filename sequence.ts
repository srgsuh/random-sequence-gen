import {validateInputs} from "./utils.ts";
import {generateRandomSequence} from "./rand-sequence-gen.ts";
const DEFAULTS = [7, 1, 49];


const inParams = process.argv.slice(2, 5).map(x => +x);
const [n, min, max] = [...inParams, ...DEFAULTS.slice(inParams.length)];

const err = validateInputs([n, min, max]);
if (err)  {
    console.error("Error: ", err);
    process.exit(1);
}

const sequence = generateRandomSequence(n, min, max);
console.log(`Successfully generated ${n} random numbers between ${min} and ${max}:`, sequence);