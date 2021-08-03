var CoinKey = require('coinkey')
const fetch = require(`node-fetch`)

function checkKeyBinary(privateKey) {
    const length = privateKey.length
    return (length === 256)
}

function toKeyHex(privateKeyBinary) {


}

function checkKeyHex(privateKey) {
    const lenght = privateKey.length
    return (lenght === 64)
}

function checkWIF(WIF) {
    try {
        (CoinKey.fromWif(WIF))
        return true
    } catch {
        return false
    }
}

function toWIF(privateKey) {
    var key = new CoinKey(new Buffer(privateKey, 'hex'))
    key.compressed = true
    return key.privateWif
}

var uncompressed = false

function fromWIF(WIF) {

    var ck = CoinKey.fromWif(WIF);
    if (WIF[0] == 5) {
        uncompressed = true
        console.log("Uncompressed WIF detectected")


    }
    return ck.privateKey.toString('hex')

}


function toAdress(privateKey) {
    var key = new CoinKey(new Buffer(privateKey, 'hex'))
    if (uncompressed) {
        key.compressed = false
        uncompressed = false
    }
    return key.publicAddress

}


async function getBalance(adress) {

    try {
        const req = await fetch("https://blockchain.info/rawaddr/" + adress)
        const response = await req.json()
        return (response['final_balance']) / (Math.pow(10, 8))
    } catch (err) {
        console.log(err)
    }

}


module.exports = {
    checkWIF: checkWIF,
    checkKeyBinary: checkKeyBinary,
    checkKeyHex: checkKeyHex,
    toAdress: toAdress,
    getBalance: getBalance,
    fromWIF: fromWIF

};
