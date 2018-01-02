

const button = document.querySelector('button')

button.addEventListener('click', () => {
    const hashes = generateHashes()
    document.querySelector('output').innerHTML = hashes.join('<br>')
})

