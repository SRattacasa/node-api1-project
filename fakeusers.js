let users = [
	{ id: "1", name: "Jane Doe", bio: "Jane is relatively unknown" },
	{ id: "2", name: "John Doe", bio: "John is relatively unknown" },
	{ id: "3", name: "Jack Doe", bio: "Jack had a beanstalk" },
]

const getUsers = () => {
    return users
}

const newUser = data => { 
    const payload = {
        id: String(users.length + 1),
        ...data
    }

    users.push(payload)
    return payload
}

const getUserById = id => {
	return users.find(u => u.id === id)
}

const deleteUser = (id) => {
	users = users.filter(u => u.id != id)
}

const updateUser = (id, data) => { 
    const index = users.findIndex(u => u.id === id)
    users[index] = {
        ...users[index],
        ...data,
    }

    return users[index]
}

module.exports = {
    getUsers,
    newUser,
	getUserById,
	updateUser,
	deleteUser,
}