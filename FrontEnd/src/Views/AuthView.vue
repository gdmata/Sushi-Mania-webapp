<script setup>
import api from '@/services/api'
import axios from 'axios'
import { ref } from 'vue'

const hasAccount = ref(false)

const showLogin = () => {
  hasAccount.value = true
}
const showRegister = () => {
  hasAccount.value = false
}

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const loginForm = ref({
  email: '',
  password: '',
})

const handleRegister = async () => {
  const { name, email, password, confirmPassword, phone } = registerForm.value
  if (password !== confirmPassword) {
    console.log('senhas não coincidem')
    return
  }

  try {
    const register = await api.post(`/register`, {
      userName: name,
      email,
      userPhone: phone,
      password,
    })
    console.log(register)
  } catch (error) {
    console.log(error)
  }
}

const handleLogin = async () => {
  const { email, password } = loginForm.value
  try {
    const login = await axios.post('/login', {
      email,
      password,
    })
    const token = login.data.token
    localStorage.setItem('token', token)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="auth-section">
    <div class="auth-card">
      <span class="badge">SUSHI MANIA</span>
      <div v-if="!hasAccount" class="auth-content">
        <h2>Criar <span class="highlight">Conta</span></h2>
        <p class="subtitle">Cadastre-se para fazer seus pedidos!</p>
        <form @submit.prevent="handleRegister" class="auth-form">
          <input
            v-model="registerForm.name"
            type="text"
            name="FullName"
            placeholder="Nome Completo"
            required
            class="input-field"
          />
          <input
            v-model="registerForm.email"
            type="email"
            name="EmailAddress"
            placeholder="E-mail"
            required
            class="input-field"
          />
          <input
            v-model="registerForm.password"
            type="password"
            name="Password"
            placeholder="Password"
            required
            class="input-field"
          />
          <input
            v-model="registerForm.confirmPassword"
            type="password"
            name="ConfirmPassword"
            placeholder="Confirme a Senha"
            required
            class="input-field"
          />
          <input
            v-model="registerForm.phone"
            type="tel"
            name="PhoneNumber"
            placeholder="Telefone"
            required
            class="input-field"
          />
          <button type="submit" class="btn-submit">Cadastrar</button>
        </form>
        <p class="toggle-text">
          Já possui uma conta?
          <button @click="showLogin" class="toggle-link">Faça Login</button>
        </p>
      </div>
      <div v-else class="auth-content">
        <h2>Acessar <span class="highlight">Conta</span></h2>
        <p class="subtitle">Bem-vindo de volta! Entre com seus dados.</p>
        <form @submit.prevent="handleLogin" class="auth-form">
          <input
            v-model="loginForm.email"
            type="email"
            name="EmailAddress"
            placeholder="E-mail"
            required
            class="input-field"
          />
          <input
            v-model="loginForm.password"
            type="password"
            name="Password"
            placeholder="Password"
            required
            class="input-field"
          />
          <button type="submit" class="btn-submit">Entrar</button>
        </form>
        <p class="toggle-text">
          Ainda não possui conta?
          <button @click="showRegister" class="toggle-link">Cadastre-se</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-section {
  background-color: #141414;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5;
  color: #ffffff;
}
.auth-card {
  background-color: #1a1a1a;
  border-top: 3px solid #8b0000;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.badge {
  background-color: #8b0000;
  color: #ffffff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;
}
.auth-content h2 {
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
.highlight {
  color: #ff4d4d;
}
.subtitle {
  color: #aaaaaa;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input-field {
  background-color: #2a2a2a;
  color: #ffffff;
  border: 1px solid #3a3a3a;
  padding: 0.85rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}
.input-field :focus {
  border-color: #ff4d4d;
  outline: none;
}
.btn-submit {
  background-color: #8b0000;
  color: #ffffff;
  padding: 0.85rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}
.btn-submit:hover {
  background-color: #ff4d4d;
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
  transform: translateY(-2px);
}
.toggle-text {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #888888;
}
.toggle-link {
  background: none;
  border: none;
  color: #ff4d4d;
  font-weight: bold;
  cursor: pointer;
  margin-left: 0.3rem;
  transition: text-decoration 0.2s ease;
}
.toggle-link:hover {
  text-decoration: underline;
}
</style>
