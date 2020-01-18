export const setPredefinedMessages = (predefinedMessages) => ({
    type: 'SET_PREFINED_MESSAGES',
    predefinedMessages
})

export const setSavedTags = (savedTags) => ({
    type: 'SET_SAVED_TAGS',
    savedTags
})

export const addTag = (tag) => ({
    type: 'ADD_TAG',
    tag
})

export const selectCustomer = (customer) => ({
    type: 'SELECT_CUSTOMER',
    customer
})
