import * as types from './types';
export default {
    [types.SHOW_NAV]:(state)=>{state.bNav=true},
    [types.HIDE_NAV]:(state)=>{state.bNav=false},
    [types.SHOW_LOGO]:(state)=>{state.bLogo=true},
    [types.HIDE_LOGO]:(state)=>{state.bLogo=false},
    [types.SHOW_LOADING]:(state)=>{state.bLoading=true},
    [types.HIDE_LOADING]:(state)=>{state.bLoading=false},
    [types.TO_SAVE]:(state,payload)=>{
        state.buycart=payload;
    },
    [types.TO_TIP]:(state,payload)=>{
        state.buycart=payload;
    },
}