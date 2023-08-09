function print_success(msg) {
    console.log(`[+] ${msg}`);
}

function print_error(msg) {
    console.log(`[-] ${msg}`);
}

function print_process(msg) {
    console.log(`[*] ${msg}`);
}

module.exports = {print_success, print_error, print_process};