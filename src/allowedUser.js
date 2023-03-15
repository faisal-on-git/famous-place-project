export const allowedUser = [

    {
        username: "admin",
        password: "admin"
    },
    {
        username: "user",
        password: "user"
    },
    {
        username: "faisal",
        password: "faisal"
    },
    {
        username:'guest',
        password:'guest'
    }
]

export const addUser=(user)=>{
    allowedUser.push(user)
}
