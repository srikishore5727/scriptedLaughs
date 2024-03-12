const { TaskSchema, RegisterSchema } = require('../models/dataModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {validateRegistration} = require('../models/RegisterValidation')
// const router = require('../router');



const showAllRegisterInfo = async (req, res) => {
    try {
        const showDetails = await RegisterSchema.find({})
        res.status(200).json(showDetails)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const createRegisterInfo = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        validateRegistration(req, res, async () => {
            const emailExists = await RegisterSchema.findOne({ email });
            if(emailExists){
                return res.status(400).json("Email already exists");
            }
            const usernameExists = await RegisterSchema.findOne({ name });
            if (usernameExists) {
                return res.status(400).json({ message: "Username already exists" });
            }
            const hash = await bcrypt.hash(password, 10);
            const createRegisterInfo = await RegisterSchema.create({ name, email, password:hash});
            res.status(200).json(createRegisterInfo);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createLoginInfo = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await RegisterSchema.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }   

        const token = jwt.sign({ userId: user._id, email: user.email }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.userId = decoded.userId;
        next();
    });
};

const getSingleUserData = async(req,res)=>{
    const {token} = req.body
    jwt.verify(token, 'secret', async (err,data)=>{
        if(err){
            res.sendStatus(400)
            console.log(err.message )
        } else {
            try {
                if (data && data.userId) {
                    const userdata = await RegisterSchema.findOne({_id: data.userId});
                    console.log(userdata);
                    res.status(200).send(userdata);
                } else {
                    console.log('UserId not found in data:', data);
                    res.sendStatus(400);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                res.status(500).send(error.message);
            }
        }
    });
};


const getAllInfo = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err, data) => {
        if(err) {
            res.sendStatus(403);
        }
        else {
            const data = await RegisterSchema.find().select(['-password']);
            res.json(data)
        }
    })
};

// below details for crud operations


const getTask = async (req, res) => {
    res.send("pong");
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskSchema.find();
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
};

const getTaskById = async (req, res) => {
    try {
        const tasks = await TaskSchema.findById(req.params.id);
        if (!tasks) {
            res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createTask = async (req, res) => {
    const { username, title, description, category,email } = req.body;
    try {
        const tasks = await TaskSchema.create({username, title, description, category,email });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, description, category} = req.body
        const tasks = await TaskSchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!tasks) {
            return res.status(400).json({ message: "Task not found" });
        }
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
};

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await TaskSchema.findByIdAndDelete({ _id: id })
        if (!tasks) {
            return res.status(404).json({ message: "Task not found" })
        }
        res.json({ message: "Task deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAllTasks, getTaskById, updateTask, deleteTask, createTask, getTask, createRegisterInfo, showAllRegisterInfo, createLoginInfo, getAllInfo, getSingleUserData, verifyToken }
