document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const email = this.email.value
  const password = this.password.value

  if (password !== confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  let users = JSON.parse(localStorage.getItem("users")) || []

  if (users.find((user) => user.email === email)) {
    alert("Email already exists!")
    return
  }

  users.push({ email, password })
  localStorage.setItem("users", JSON.stringify(users))

  sessionStorage.setItem("currentUser", JSON.stringify({ name, email }))

  alert("Registration successful!")
  window.location.href = "index.html"
})

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const email = this.email.value
  const password = this.password.value

  let users = JSON.parse(localStorage.getItem("users")) || []
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    const { name, email } = user
    sessionStorage.setItem("currentUser", JSON.stringify({ name, email }))
    alert("Login successful!")
    window.location.href = "index.html"
  } else {
    alert("Invalid email or password!")
  }
})
