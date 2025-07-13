import mongoose from "mongoose";
import { Response } from "express";
import { NotFoundError, DataError, AuthenticationError } from "./errorHandler.js";

const { Schema } = mongoose;

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    balance: { type: Number, default: 1000000 }
});

const TransactionSchema = new Schema({
    userId: {type: String, required: true}, 
    amount : { type: Number, required: true },
    participantEmail: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

export async function addTransaction(id : string, amount : number, participantEmail : string) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const sender = await User.findOne({id: id})
        const receiver = await User.findOne({email: participantEmail});

        if (!receiver) {
            throw new NotFoundError('Receiver not found');
        } else if (!sender) {
            throw new NotFoundError('Sender not found');
        }

        if (sender.id === receiver.id) {
            throw new DataError('Cannot make a self transaction');
        }

        if (sender.balance < amount) {
            throw new DataError('Insufficient amount for transaction')
        }

        await addUserTransaction(Transaction, sender.id, receiver.email, amount * -1);
        await addUserTransaction(Transaction, receiver.id, sender.email, amount);
        
        await setBalance(User, sender.id, amount * -1);
        await setBalance(User, receiver.id, amount);
        await session.commitTransaction();

        const updatedSender = await User.findOne({id: id});

        return {
            code: 200,
            message: 'Transaction completed successfully',
            updatedBalance: updatedSender?.balance
        };
    } catch(error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

export async function addUser(id : string, email : number, password : string, 
    phoneNumber : string, balance : number, isVerified : boolean) {
    try {
        const isExists = await User.exists({ email });
        if (isExists) {
            throw new DataError(`email ${email} is taken`);
        }

        await User.create({
            id : id,
            email: email,
            hashedPassword: password,
            phoneNumber: phoneNumber,
            isVerified: isVerified,
            balance: balance || 1000000,
        });

        return {
            code: 201,
            message: 'User signed up successfully'
        }
    } catch(error) {
        throw error;
    }
}

export async function getUserBalance(id : string) {
    try {
        const user = await User.findOne(
            {id: id},
            {balance: 1, _id: 0}
        );

        if (!user) {
            throw new NotFoundError('User not found');
        } else {
            return {
                code: 200,
                balance: user.balance
            };
        }
    } catch(error) {
        throw error;
    }
}

export async function getUserTransactions(id : string, index : number) {
    try {
        const user = await User.findOne({ id: id });

        if (!user) {
            throw new NotFoundError('User not found');
        } else {
            const limit = 5;
            const skip = (index - 1) * limit;

            const totalTransactions = await Transaction.countDocuments({ userId: id });
            const totalPages = Math.ceil(totalTransactions / limit);

            const transactions = await Transaction.find({ userId: id })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit);

            return {
                code: 200,
                transactions: transactions,
                totalPages: totalPages
            };
        }
    } catch (error) {
        throw error;
    }
}

export async function validateUser(email : string, password : string) {
    try {
        const user = await User.findOne({
            email: email,
            hashedPassword: password
        });

        if (!user) {
            throw new AuthenticationError('Incorrect email or password');
        } else {
            return {
                code: 200,
                message: 'Login successful',
                id: user.id
            }
        }
    } catch(error) {
        throw error;
    }
}

export function responseFromDB(res : Response, code : number, json: unknown) {
    return res.status(code).json(json);
}

export async function connectDB() {
    try {
        const connectionString = process.env.CONNECTION_STRING;
        const databaseName = process.env.DATABASE_NAME;

        if (!connectionString || !databaseName) {
            throw new Error('Missing CONNECTION_STRING or DATABASE_NAME in environment variables');
        }

        await mongoose.connect(connectionString + databaseName);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export async function testCleanUp() {
    await User.deleteMany({email: { $regex: /^test/i }});
    await Transaction.deleteMany({participantEmail: { $regex: /^test/i }});

    await mongoose.connection.close();
}

async function addUserTransaction(Transaction: typeof mongoose.Model, userId: string, 
    participantEmail: string, amount: number) {
    const now = new Date();

    await Transaction.create({
        userId: userId,
        amount: amount,
        participantEmail: participantEmail,
        timestamp: now
    });
}

async function setBalance(User : typeof mongoose.Model, id : string, amount : number) {
    await User.updateOne(
        {id: id},
        {$inc: {balance: amount}}
    );
}