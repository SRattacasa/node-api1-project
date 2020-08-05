const express = require("express")
const server = express()
const db = require("./fakeusers")

server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "Hello, World" })
})


server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.get("/api/users/:id", (req, res) => {
	const id = req.params.id
	const user = db.getUserById(id)

	if (user) {
		res.json(user)
	} else {
		res.status(404).json({ message: "User not here" })
	}
})

server.post("/api/users", (req, res) => {
    const addUser = db.newUser({
        name: req.body.name
    })
    if (!req.body.name || !req.body.bio) { 
        res.status(400).json({message: "Please provide name and bio for the user."})
    } else

    res.status(201).json(addUser)
})



server.put("/api/users/:id", (req, res) => { 
    const id = req.params.id
    const data = req.body
    const updateUser = db.updateUser(id)

    if (!updateUser) {
        res.status(404).json({message: "The user with the ID you provided doesn't exist, you moron."})
    } else if (!data.name || !data.bio) {
        res.status(400).json({errorMessage: "Please proivde name and bio for the user"})
    } else {
        res.status(200).json(updateUser)
    }
})



server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    

    if (user) {
        db.deleteUser(id)
        res.status(204).end()
    } else { 
        res.status(404).json({message: "Ain't no one here at that number"})
    }

})


server.listen(5000, () => {
    console.log("Server on port 5000")
}) 