const InitialState = {
  type: null, // success, error
  title: null,
  message: null,
  options: null,
  visible: false,

  autoHide : true,
  buttonText : false,
  buttonAction : false,
  updated : false,
  updatedReview: null,
  descriptionUpdatedGuest: null,
  updatedNote: null,
  updatePromoCode: null,
  enterMessageRoom: false,
  subscriptionAddressUpdated: false,
  subscriptionCancelledUpdated: false,
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        options: action.payload.options,

        autoHide: action.payload.autoHide,

        visible: true,

        buttonText : action.payload.buttonText,
        buttonAction : action.payload.buttonAction
      };
    case 'UPDATED_INSTRUCTIONS':
      return {
        ...state,
        updated: action.payload.instructions,
      };
    case 'UPDATED_ORDERNOTE':
      return {
        ...state,
        updatedNote: action.payload.notes,
      };
    case 'UPDATED_REVIEW':
      return {
        ...state,
        updatedReview: action.payload.review,
      };
      
    case 'UPDATED_PROMOCODE':
      return {
        ...state,
        updatePromoCode: action.payload.promocode,
      };
          
    case 'UPDATED_DESCRIPTIONGUEST':
      return {
        ...state,
        descriptionUpdatedGuest: action.payload.descriptionGuest,
      };

    case 'UPDATED_SUBSCRIPTIONADDRESS':
      return {
        ...state,
        subscriptionAddressUpdated : action.payload.subscriptionAddressUpdated,
      };
      
    case 'UPDATED_SUBSCRIPTIONCANCELLED':
      return {
        ...state,
        subscriptionCancelledUpdated : action.payload.subscriptionCancelledUpdated,
      };
       
    case 'ENTER_MESSAGEROOM':
      return {
        ...state,
        enterMessageRoom : action.payload.enterMessageRoom,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        type: null,
        title: null,
        message: null,
        options: null,

        autoHide: true,

        visible: false,
      };
  }

  return state;
};

export default reducer;
