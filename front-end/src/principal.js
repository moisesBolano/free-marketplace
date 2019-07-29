'Use strict'
import axios from 'axios';
var baseUrl = 'http://127.0.0.1:8080/';

function validateSession() {
    const session = new Promise((resolve, reject) => {
        var head = {headers: {'authorization': "token " + localStorage.getItem('TokenId')}};
        axios.post(baseUrl+'validateSession/', {}, head)
            .then(response => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err.response.data);
            })
    });
    return session;
}

export { validateSession, baseUrl}