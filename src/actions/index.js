export const pushRoute = (route) => ({
    type: 'CHANGE_ROUTE',
    route: route
})

export const launchModal = ({ modalType, data }) => ({
    type: 'MODAL_LAUNCH',
    modalType, data
})

export const closeModal = () => ({
    type: 'MODAL_CLOSE'
})
