// import { type User } from '@/lib/model/user'
// import { type Job } from '@/lib/model/job'
import { match } from 'assert'
import mongoose,{ Schema,model } from 'mongoose'


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        length: [3, 255],
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address',
        ],
        trim: true,
        length: [5, 255],
        index: true,
    },
    password: {
        type: String,
        required: true,
        // select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: String,
    bio: String,
},{
    timestamps: true,
})

const jobSchema = new Schema({
    title: String,
    description: String,
    budget: {
        currency: String,
        amount: Number,
        max: Number,
        min: Number,
    },
    source: String,
    skill: [String],
    url: {
        type: String,
        index: true,
    },
    rating: Number,
    matchScore: Number,
    // postedBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true,
})








const User = model('User', userSchema)
const Job = model('Job', jobSchema)

export { User, Job }

