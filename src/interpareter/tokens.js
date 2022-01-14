const rx_unicode_escapement = /\\  u \{ ( [ 0-9 A-F ]{4, 6} ) \} /g;

const line = / \n | \r \n? /g;

const left = / \{ | \(  /g;

const right = / \} | \) | \; /g;