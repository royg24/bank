import {Router} from 'express';
import { randomUUID } from 'crypto';
import { addUser, responseFromDB } from '../database.js';
import * as utils from '../utils.js';

export default function signUp() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;

        const erroerMessage = validate(body, res);
        if (erroerMessage) {
            return res.status(400).json({ error : erroerMessage });
        }
        

        //TODO add SMS code verification
        // if invalid returns error code 401

        const queryResult = await addUser(randomUUID(), body.email, utils.hashPassword(body.password)
        , body.phoneNumber, 1000000, true);

        console.log(`user with email ${body.email} has signed up`)
        return responseFromDB(res, 201, queryResult, {message: queryResult.message});

    });

    return router;
};


function validate(body) {
    const requiredFieldsError = checkRequiredFields(body);
    if (requiredFieldsError) {
        return requiredFieldsError;
    }

    const emailError = utils.validateEmail(body.email);
    if (emailError) {
        return emailError;
    }

    const passwordError = utils.validatePassword(body.password);
    if (passwordError) {
        return passwordError;
    }

    const phoneNumberError = utils.validatePhoneNumber(body.phoneNumber);
    if (phoneNumberError) {
        return phoneNumberError;
    }

    return null;
}

function checkRequiredFields(body) {
    const isEmailEmpty = utils.checkRequiredFiled('email', body.email);
    if (isEmailEmpty) {
        return isEmailEmpty;
    }
    const isPasswordEmpty = utils.checkRequiredFiled('password', body.password);
    if (isPasswordEmpty) {
        return isPasswordEmpty;
    }
    const isPhoneNumberEmpty = utils.checkRequiredFiled('phone number', body.phoneNumber);
    if (isPhoneNumberEmpty) {
        return isPhoneNumberEmpty;
    }
    return null;
}

