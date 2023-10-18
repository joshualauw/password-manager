export function validate(val: string) {
    if (val == "") return "value must be provided";
    return true;
}
