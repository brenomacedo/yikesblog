import bcrypt from 'bcrypt'

async function genAdminPassword() {
    return await bcrypt.hash("admin", 10)
}

export default [
    {
        login: "admin",
        nickname: "admin",
        password: genAdminPassword()
    }
]