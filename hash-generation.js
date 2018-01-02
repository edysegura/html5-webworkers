function generateHash() {
    return "id" + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17)
}

function generateHashes() {
    const hashes = []
    for (let i = 0; i < 100000; i++) {
        hashes.push(generateHash())
    }
    return hashes
}