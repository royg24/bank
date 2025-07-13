import mongoose from "mongoose";
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

const errorResponse = {
    code: 500,
    error: 'Internal server error'
};

export async function addTransaction(id, amount, participantEmail) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const sender = await User.findOne({id: id})
        const receiver = await User.findOne({email: participantEmail});

        if (!receiver) {
            return {
                code: 404,
                error: 'Receiver not found'
            }
        } else if (!sender) {
            return {
                code: 404,
                error: 'Sender not found'
            }
        }

        if (sender.id === receiver.id) {
            return {
                code: 409,
                error: 'Cannot make a self transaction'
            }
        }

        if (sender.balance < amount) {
            return {
                code: 409,
                error: 'Insufficient amount for transaction'
            }
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
            updatedBalance: updatedSender.balance
        };
    } catch(error) {
        await session.abortTransaction();
        return errorResponse;
    } finally {
        session.endSession();
    }
}

export async function addUser(id, email, password, phoneNumber, balance, isVerified) {
    try {
        const isExists = await User.exists({ email });
        if (isExists) {
            return {
                code: 409,
                error: `email ${email} is taken`
            };
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
        return errorResponse;
    }
}

export async function getUserBalance(id) {
    try {
        const user = await User.findOne(
            {id: id},
            {balance: 1, _id: 0}
        );

        if (!user) {
            return {
                code: 404,
                error: 'User not found'
            };
        } else {
            return {
                code: 200,
                balance: user.balance
            };
        }
    } catch(error) {
        return errorResponse;
    }
}

export async function getUserTransactions(id, index) {
    try {
        const user = await User.findOne({ id: id });

        if (!user) {
            return {
                code: 404,
                error: 'User not found'
            };
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
        return {
            code: 500,
            error: 'Internal Server Error',
            details: error.message
        };
    }
}

export async function validateUser(email, password) {
    try {
        const user = await User.findOne({
            email: email,
            hashedPassword: password
        });

        if (!user) {
            return {
                code: 401,
                error: 'Incorrect email or password'
            };
        } else {
            return {
                code: 200,
                message: 'Login successful',
                id: user.id
            }
        }
    } catch(error) {
        return errorResponse;
    }
}

export function responseFromDB(res, correctCode, response, json) {
    if (response.code === correctCode) {
        return res.status(correctCode).json(json);
    } else {
        return res.status(response.code).json({error: response.error});
    }
}

export async function connectDB() {
    try {
        await mongoose.connect(
            process.env.CONNECTION_STRING + process.env.DATABASE_NAME
        );
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

async function addUserTransaction(Transaction, userId, participantEmail, amount) {
    const now = new Date();

    await Transaction.create({
        userId: userId,
        amount: amount,
        participantEmail: participantEmail,
        timestamp: now
    });
}

async function setBalance(User, id, amount) {
    await User.updateOne(
        {id: id},
        {$inc: {balance: amount}}
    );
}