function hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function createValOptoin( name, value, kind = "let") {
    let val = Object.create(null);
    val.name = name;
    val.kind = kind;
    val.value = value;
    return val;
}

export { hasOwnProperty, createValOptoin }