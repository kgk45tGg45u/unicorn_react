export const userReducer = (state, action) => {
  const {type, payload} = action;

  switch(type){

      case "RECORD_USER_DATA":
          return {...state, userData: payload.userData}

      // case "REMOVE_FROM_CART":
      //     return {...state, cartList: payload.products}

      // case "UPDATE_TOTAL":
      //     return {...state, total: payload.total}

      default:
          throw new Error("No Case Found In userReducer")
  }
}
