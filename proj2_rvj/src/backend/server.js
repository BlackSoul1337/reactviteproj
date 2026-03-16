import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    username: String,
    phone: String,
    isActivated: { type: Boolean, default: false },
    activationLink: String
})
const User = mongoose.model('User', userSchema)

const eventSchema = new mongoose.Schema({
    title: String,
    category: String,
    date: String,
    price: Number,
    image: String,
    description: String
})
const Event = mongoose.model('Event', eventSchema)

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'no token' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'invalid token' })
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async (to, link) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Активация аккаунта',
        text: `Ссылка для активации: ${link}`,
        html: `<div><h1>Сюда жать:</h1><a href="${link}">${link}</a></div>`
    })
}

app.post('/api/users/register', async (req, res) => {
    try {
        const { email, password, username, phone } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'user exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const activationLink = uuidv4()
        const newUser = new User({ email, password: hashedPassword, username, phone, activationLink })
        await newUser.save()

        const link = `http://localhost:${process.env.PORT}/api/users/activate/${activationLink}`
        try {
            await sendEmail(email, link)
        } catch (emailError) {
            console.error('mail is not send:', emailError.message)
            console.log('Activation link:', link)
        }

        res.status(201).json({ message: 'registered' })
    } catch (error) {
        console.error('Ошибка регистрации:', error)
        res.status(500).json({ message: 'reg error' })
    }
})

app.get('/api/users/activate/:link', async (req, res) => {
    try {
        const { link } = req.params
        const user = await User.findOne({ activationLink: link })
        if (!user) {
            return res.status(400).json({ message: 'invalid link' })
        }
        user.isActivated = true
        await user.save()
        res.json({ message: 'activated' })
    } catch (error) {
        res.status(500).json({ message: 'activation error' })
    }
})

app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'password error' })
        }
        if (!user.isActivated) {
            return res.status(400).json({ message: 'not activated' })
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token, user: { email: user.email, username: user.username, phone: user.phone } })
    } catch (error) {
        res.status(500).json({ message: 'login error' })
    }
})

app.get('/api/users/profile', authMiddleware, (req, res) => {
    res.json({ message: 'profile', user: req.user })
})

//для вайба
app.post('/api/events', authMiddleware, async (req, res) => {
    try {
        const { title, category, date, price, image, description } = req.body
        const newEvent = await Event.create({ title, category, date, price, image, description })
        res.status(201).json(newEvent)
    } catch (error) {
        res.status(500).json({ message: 'event creation error' })
    }
})

app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (error) {
        res.status(500).json({ message: 'events fetching error' })
    }
})

app.get('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)
        if (!event) {
            return res.status(404).json({ message: 'event not found' })
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({ message: 'event fetching error' })
    }
})

app.put('/api/events/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { title, category, date, price, image, description } = req.body
        const updatedEvent = await Event.findByIdAndUpdate(id, { title, category, date, price, image, description }, { new: true })
        if (!updatedEvent) {
            return res.status(404).json({ message: 'event not found' })
        }
        res.json(updatedEvent)
    } catch (error) {
        res.status(500).json({ message: 'event updating error' })
    }
})

app.delete('/api/events/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const deletedEvent = await Event.findByIdAndDelete(id)
        if (!deletedEvent) {
            return res.status(404).json({ message: 'event not found' })
        }
        res.json(deletedEvent)
    } catch (error) {
        res.status(500).json({ message: 'event deletion error' })
    }
})



const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB подключен')
        app.listen(process.env.PORT, () => {
            console.log(`Сервер на порту ${process.env.PORT}`)
        })
    } catch (error) {
        console.error('Ошибка запуска:', error)
        process.exit(1)
    }
}

start()