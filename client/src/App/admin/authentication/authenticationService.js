import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password, redirect) {
    axios.post(`/user/authenticate`, { email:email, password:password })
    .then(handleResponse)
    .then(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (response.token){
            localStorage.setItem('currentUser', JSON.stringify(response.token));
            currentUserSubject.next(response);
            redirect();     
        }
        return response;
    }).catch(err => {       
        alert("Login info is incorrect!");
        return {};
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    this.props.history.push('/');
    alert("Logged out");
}

function handleResponse(response) {   
    const data = response.data;

    // if (!response.ok) {

    //     if ([401, 403].indexOf(response.status) !== -1) {
    //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //         logout();
    //         // location.reload(true);
    //     }

    //     const error = (data && data.message) || response.statusText;
    //     return Promise.reject(error);
    // }

    return data;

}