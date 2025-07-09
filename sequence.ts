import {validate, generate} from "./utils";

const DEFAULTS = [7, 1, 49];

const params = process.argv.slice(2, 5).map(Number);
console.log(params);
const fullParams = (params.length === DEFAULTS.length)?
                params:
                [...params, ...DEFAULTS.slice(params.length)];
console.log(fullParams);
const errors = validate(...fullParams);

if (errors.length > 0) {
    console.error(errors);
    process.exit(1);
}

console.log(...generate(...fullParams));