import axios from 'axios';

//const backendUri = import.meta.env.VITE_BACKEND_URI;
const backendUri = 'http://localhost:3000/api';

export const access = async (route: string, data: any, type: string) => {
    try {
        const response = await axios.post(`${backendUri}/auth/${route}`, {data, type});

        if (response.status >= 200 && response.status < 300) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response.data.error };
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: 'Unknown error' };
        }
    }
};

export const sendCode = async(body: {email: string}) => {
    const route = 'auth/sign-up/send';

    try {
        const response = await axios.post(`${backendUri}/${route}`, body);

        if (response.status === 200) {
            return { success: true, message: response.data.message};
        } else {
            return { success: false, error: response.data.error};
        }
    } catch(error: any) {
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: 'Unknown error' };
        }
    }
};

export const validateCode = async (body: {email: string, code: number}) => {
    const route = 'auth/sign-up/validate';

    try {
        const response = await axios.post(`${backendUri}/${route}`, body);

        if (response.status === 200) {
            return { success: true, message: response.data.message};
        } else {
            return { success: false, error: response.data.error};
        }
    } catch(error: any) {
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: 'Unknown error' };
        }
    }
}

export const getBalance = async (token: string) => {
    const route = 'balances';
    try {
        const response = await axios.get(`${backendUri}/${route}`, {
            headers: {
                Authorization: token
            }
        });

        if (response.status === 200) {
            return { success: true, balance: response.data.balance };
        } else {
            return { success: false, error: response.data.error };
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: 'Unknown error' };
        }
    }
};

export const getTransactions = async (token: string, param: {index: number}) => {
    const route = 'transactions';

    try {
        const response = await axios.get(`${backendUri}/${route}`, {
            params: param,
            headers: {Authorization: token}
        });

        if (response.status === 200) {
            return { 
                success: true,
                transactions: response.data.transactions,
                totalPages:  response.data.totalPages
            };
        } else {
            return { success: false, error: response.data.error };
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: 'Unknown error' };
        }
    }
}

export const transferMoney = async (
    token: string,
    body: { receiverEmail: string; amount: string } 
    ) => {
        const route = 'transactions';
        try {
            const response = await axios.post(`${backendUri}/${route}`, body, {
                headers: { Authorization: token }
            });

            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                return { success: false, error: response.data.error };
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                return { success: false, error: error.response.data.error };
            } else {
                return { success: false, error: 'Unknown error' };
            }
        }
    };

export const logout = async(token: string | null) =>{
    const route = 'logout';
    try {
        const response = await axios.post(`${backendUri}/${route}`, null,
            {headers: { Authorization: token }}
        );

        if (response.status === 200) {
            return {success: true};
        } else {
            return { success: false, error: response.data.error };
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: 'Unknown error' };
        }
    }
};