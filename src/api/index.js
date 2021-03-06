import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8080';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
    router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data, isMultiPart) => {

    const headers = axios.defaults.headers;
    if (isMultiPart) {
        headers['Content-Type'] = 'multipart/form-data';
    }

    return axios({
            method,
            url: DOMAIN + url,
            data,
            headers
        })
        .then(result => result.data)
        .catch(result => {
            const { status } = result.response;

            if (status === UNAUTHORIZED)
                onUnauthorized();

            // 흐음.. 안타까운 코드구만..
            else if (status == '500' && result.response.data.message.includes('Token')) {
                delete localStorage.token;
                onUnauthorized();
            }

            throw result.response
        })
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : null;
}

export const coverletter = {
    fetch({ id, pageNo }) {
        return id ? request('get', `/coverletters/${id}`) : request('get', `/coverletters?page=${pageNo}&size=10`)
    },
    search({ companyName }) {
        return request('get', `/coverletters/search?companyName=${companyName}`)
    },
    create(data) {
        return request('post', '/coverletters/', data)
    },
    update(data) {
        return request('put', `/coverletters/${data.id}`, data)
    },
    delete(id) {
        return request('delete', `/coverletters/${id}`)
    }
}

export const question = {
    fetchByHashtags({ hashtags }) {
        return request('get', `/questions/search?hashtags=${hashtags}`)
    },
    fetch({ pageNo }) {
        return request('get', `/questions?page=${pageNo}&size=10`)
    }
}

export const hashtag = {
    fetch() {
        return request('get', `/hashtags`)
    }
}

export const member = {
    getMemberInfo() {
        return request('get', '/members/me')
    },
    signUp(data) {
        return request('post', '/members/signup', data)
    },
    signIn(data) {
        debugger;
        return request('post', '/login', data)
    },
    signInWithKakao() {
        return request('get', '/oauth2/authorization/kakao')
    },
    updateMemberInfo(data) {
        return request('put', '/members', data)
    },
    updateProfileImage(data) {
        return request('put', '/profile', data)
    },
    getProfileImage() {
        return request('get', '/profile');
    }
}

export const converter = {
    convert(files) {
        return request('post', '/converter', files);
    }
}

export const notification = {
    fetch() {
        return request('get', '/notifications')
    },
    check(id) {
        return request('put', `/notifications/${id}`)
    }
}