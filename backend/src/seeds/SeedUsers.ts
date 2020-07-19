import axios from 'axios'

axios.post('http://localhost:3003/users/signup', {
    login: 'admin',
    nickname: 'admin',
    password: 'admin'
}, {
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuaWNrbmFtZSI6ImJyZW5vIiwibG9naW4iOiJicmVubyIsInBhc3N3b3JkIjoiJDJiJDEwJHdDRWtlREZhb3Y4QWJkTksyWlIwZWVSSzF2aWZrOUpOelJNaXZLZGo1ZnpVcGlGa0xNNjRXIn0sImlhdCI6MTU5NTE5NDEyMX0.qeIiVyekvZ986hFOLcrfSqj7dmGm0le50P-b7pNdlx8'
    }
}).then(resp => {
    console.log('SEED COMPLETED!')
}).catch(err => {
    
})