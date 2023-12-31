let passwordLength = 16
const inputEl = document.querySelector("#password")

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEL = document.querySelector("#security-indicator-bar")

function generatePassword() {
    let chars = "abcdefghjklmnpqrstuvwxyz"
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }
    if (numberCheckEl.checked) {
        chars += numberChars
    }
    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = ""
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    // console.log(password)
    inputEl.value = password

    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round((passwordLength / 64) * 25
        + (upperCaseCheckEl.checked ? 15 : 0))
        + (numberCheckEl.checked ? 25 : 0)
        + (symbolCheckEl.checked ? 35 : 0)

    // console.log(percent)
    securityIndicatorBarEL.style.width = `${percent}%`

    if (percent > 69) {
        securityIndicatorBarEL.classList.remove("critical")
        securityIndicatorBarEL.classList.remove("warning")
        securityIndicatorBarEL.classList.add("safe")
    } else if (percent > 50) {
        securityIndicatorBarEL.classList.remove("critical")
        securityIndicatorBarEL.classList.add("warning")
        securityIndicatorBarEL.classList.remove("safe")
    } else {
        securityIndicatorBarEL.classList.add("critical")
        securityIndicatorBarEL.classList.remove("warning")
        securityIndicatorBarEL.classList.remove("safe")
    }

    if (percent >= 100) {
        securityIndicatorBarEL.classList.add("completed")
    } else {
        securityIndicatorBarEL.classList.remove("completed")
    }
}

function calculateFontSize() {
    if (passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if (passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", () => {
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    // console.log(passwordLength)
    generatePassword()
})

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

generatePassword()