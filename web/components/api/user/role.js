import api from 'util/api';

const role = {
    // Get avatar for the user
    //? Requires userID
    roleGET: async (ACT) => {
        // Attempt to send API request
        try {
            const response = await api.post('/v1/user/role/get', { ACT });
            return response;
        } 
        
        // In case of client or API error
        catch (error) {
            console.log("Role GET - Error: ", error)
        }
    }
}

module.exports = role;