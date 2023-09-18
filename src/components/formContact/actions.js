import api from '../../utils/service/api'

export const actionRegister = (data) => {
    return api({
        method: 'post',
        url: '/app-register/register',
        data
    })
}