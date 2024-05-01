import api from 'util/api';

const users = {
    usersGET: async () => {
        // Attempt to send API request
        try {
            const response = await api.get('/v1/statistics/users/get');
            return response;
        } 
        
        // In case of client or API error
        catch (error) {
            console.log("Statistics Users GET - Error: ", error)
        }
    }
}

module.exports = users;