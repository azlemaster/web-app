import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  updateAccount (user) {
    return Api().put(`profil/${user.id}`, user)
  }
}
