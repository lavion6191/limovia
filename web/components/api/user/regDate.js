import api from 'util/api';

const regDate = {
    // Get registration date for the user
    //? Requires userID
    regDateGET: async (userID) => {
        // Attempt to send API request
        try {
            const response = await api.get('/v1/user/reg_date/get', { params: { ID: userID }});
            return response;
        } 
        
        // In case of client or API error
        catch (error) {
            console.log("RegDate GET - Error: ", error)
        }
    }
}

module.exports = regDate;