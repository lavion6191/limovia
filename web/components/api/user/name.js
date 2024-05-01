import api from 'util/api';

const name = {
    // Get name for the user
    //? Requires userID
    nameGET: async (identifier) => {
        // Attempt to send API request
        try {
            const response = await api.get('/v1/user/name/get', { params: { ID: identifier }});
            return response;
        } 
        
        // In case of client or API error
        catch (error) {
            console.log("Name GET - Error: ", error)
        }
    }
}

module.exports = name;