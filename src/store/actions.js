// Notification Actions

export const showNotification = ({ type, title, message, options, autoHide, buttonText, buttonAction }) => ({
  type: 'SHOW_NOTIFICATION',
  payload: {
    type: type || null,
    title: title || null,
    message: message || null,
    options: options || {},
    autoHide : typeof autoHide != 'undefined' ? autoHide : (type && (["success","error"].indexOf(type) > -1) ? false : true),
    buttonText : typeof buttonText != 'undefined' ? buttonText : false,
    buttonAction : typeof buttonAction != 'undefined' ? buttonAction : false,
  },
});

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION',
});

export const updatedInstructions = (instructions) => ({
  type: 'UPDATED_INSTRUCTIONS',
  payload: {
    instructions: instructions
  }
});

export const updatedNotes = (notes) => ({
  type: 'UPDATED_ORDERNOTE',
  payload: {
    notes: notes
  }
})

export const updatePromoCode = (promocode) => ({
  type: 'UPDATED_PROMOCODE',
  payload: {
    promocode: promocode
  }
})

export const subscriptionAddressUpdated = (subscriptionAddressUpdated) => ({
  type: 'UPDATED_SUBSCRIPTIONADDRESS',
  payload: {
    subscriptionAddressUpdated: subscriptionAddressUpdated
  }
})
export const subscriptionCancelled = (subscriptionCancelledUpdated) => ({
  type: 'UPDATED_SUBSCRIPTIONCANCELLED',
  payload: {
    subscriptionCancelledUpdated: subscriptionCancelledUpdated
  }
})

export const setAddedReview = (review) => ({
  type: 'UPDATED_REVIEW',
  payload: {
    review: review
  }
});

export const setDescriptionUpdatedGuest = (resetMode) => ({
  type: 'UPDATED_DESCRIPTIONGUEST',
  payload: {
    descriptionGuest: resetMode
  }
});

export const enterMessageRoom = (entered) => ({
  type: 'ENTER_MESSAGEROOM',
  payload: {
    enterMessageRoom: entered
  }
});
// Account

export const setPhone = (phone) => ({
  type: 'SET_PHONE',
  payload: {
    phone,
  },
});

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: {
    token,
  },
});

export const setGuestToken = (token) => ({
  type: 'SET_GUEST_TOKEN',
  payload: {
    token,
  },
});

export const setUserInfo = (userInfo) => ({
  type: 'SET_USERINFO',
  payload: {
    userInfo,
  },
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});
