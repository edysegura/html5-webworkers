
function generateHash() {
    return "id" + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17)
}

function generateHashes() {
    const hashes = []
    for (let i = 0; i < 10000; i++) {
        hashes.push(generateHash())
    }
    return hashes
}

const button = document.querySelector('button')

button.addEventListener('click', () => {
    const hashes = generateHashes()
    document.querySelector('output').innerHTML = hashes.join('<br>')
})

