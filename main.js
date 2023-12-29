let passwordLenght = 16
const inputEl = document.querySelector("#password")
document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)

function generatePassword() {
    const chars = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]"
    let password = ""
    for (let i = 0; i < passwordLenght; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    // console.log(password)
    inputEl.value = password
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLenghtEl = document.querySelector("#password-lenght")
passwordLenghtEl.addEventListener("input", () => {
    passwordLenght = passwordLenghtEl.value
    // console.log(passwordLenght)
    generatePassword()
})

generatePassword()