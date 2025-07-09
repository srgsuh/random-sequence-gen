import _ from "lodash";
export function validate(n, min, max):string[] {
    const errors = [];
    if (!isFinite(n)) {
        errors.push('First argument must be a finite number');
    }
    //TODO: complete other checks
    return errors;
}

export function generate(n, min, max) {
    const length = max - min + 1;
    const numbers = Array.from({length})
        .map((_, i)=>min + i);
    for (let i = 0; i < n; i++) {
        const randomIndex = _.random(i, length - 1);
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]]; // all chosen numbers in the beginning
    }
    return numbers.slice(0, n);
}