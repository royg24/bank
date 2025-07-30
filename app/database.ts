import mongoose, {HydratedDocument, Model} from "mongoose";
import { Response } from "express";
import { NotFoundError, DataError, AuthenticationError } from "./errorHandler.js";
import { normalizeEmail } from "./utils/utils.js";

const { Schema } = mongoose;

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    balance: { type: String, default: '1000000' },
    verified: {type: Boolean, default: false}
});

const TransactionSchema = new Schema({
    userId: {type: String, required: true}, 
    amount : { type: String, required: true },
    participantEmail: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

interface IUser {
  id: string;
  email: string;
  hashedPassword: string;
  phoneNumber?: string;
  balance: string;
  verified: boolean;
}

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

export async function addTransaction(id : string, amount : number, participantEmail : string) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const sender = await User.findOne({id: id}).session(session);
        const receiver = await User.findOne({
            email: normalizeEmail(participantEmail)
        }).session(session);;

        if (!receiver) {
            throw new NotFoundError('Receiver not found');
        } else if (!sender) {
            throw new NotFoundError('Sender not found');
        }

        if (sender.id === receiver.id) {
            throw new DataError('Cannot make a self transaction');
        }

        if (Number(sender.balance) < amount) {
            throw new DataError('Insufficient amount for transaction')
        }

        await addUserTransaction(Transaction, sender.id, receiver.email, (amount * -1).toString(), session);
        await addUserTransaction(Transaction, receiver.id, sender.email, amount.toString(), session);
        
        await setBalance(sender, amount * -1, session);
        await setBalance(receiver, amount, session);
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

export async function addUser(id : string, email : string, type: string,
    password? : string, phoneNumber? : string) {
    try {
        const isExists = await User.exists({ email });
        if (isExists) {
            throw new DataError(`email ${email} is taken`);
        }

        if (type === 'form') {
            await User.create({
                id : id,
                email: email,
                hashedPassword: password,
                phoneNumber: phoneNumber,
            });
        } else if (type === 'google') {
            await User.create({
                id: id,
                email: email,
                verified: true
            });
        } else {
            throw new DataError('Invalid type');
        }

        return {
            code: 201,
            message: 'Sign up was successful'
        }
    } catch(error) {
        throw error;
    }
}

export async function deleteUser(email: string) {
    const isVerified = await isUserVerified(email);

    if (!isVerified) {
        console.log(`User with email ${email} is not verified, was deleted`);
        await User.deleteOne({email: email});
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

export async function validateUser(email : string, type: string, password? : string) {
    try {

        let user;

        if (type === 'form') {
            user = await User.findOne({
                email: email,
                hashedPassword: password
            });
        } else if (type === 'google') {
            user = await User.findOne({
                email: email
            });
        } else {
            throw new DataError('Invalid type');
        }

        if (!user || !user.verified) {
            throw new AuthenticationError('Incorrect email or password');
        } else {
            return {
                code: 200,
                message: 'Login was successful',
                id: user.id
            }
        }
    } catch(error) {
        throw error;
    }
}

export async function isUserVerified(email: string): Promise<boolean> {
    try {
        const user = await User.findOne({email: email});
        if (user) {
            return user.verified;
        } else {
            return false;
        }
    } catch(error) {
        return false;
    }
}

export async function approveUser(email: string) {
    try {
        const result = await User.findOneAndUpdate(
            { email },
            { verified: true },
            { new: true }
        );

        if (!result) {
            throw new NotFoundError('User not found');
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

        await mongoose.connect(connectionString + databaseName, {tls: true});
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
    participantEmail: string, amount: string, session: mongoose.ClientSession) {
    const now = new Date();

    await Transaction.create([{
        userId: userId,
        amount: amount,
        participantEmail: normalizeEmail(participantEmail),
        timestamp: now
    }], { session });
}

async function setBalance(user: HydratedDocument<IUser>, amount : number, session: mongoose.ClientSession) {
    const current = Number(user.balance);
    const updated = current + amount;

    await user.updateOne({ $set: { balance: updated.toString() } }, { session });
}