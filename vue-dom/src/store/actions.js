import * as types from './types'
export default {
    showNav:({commit,state})=>{commit(types.SHOW_NAV)},
    hideNav:({commit,state})=>{commit(types.HIDE_NAV)},
    showLogo:({commit,state})=>{commit(types.SHOW_LOGO)},
    hideLogo:({commit,state})=>{commit(types.HIDE_LOGO)},
    showLoading:({commit,state})=>{commit(types.SHOW_LOADING)},
    hideLoading:({commit,state})=>{commit(types.HIDE_LOADING)},
    toSave:({commit,state},payload)=>{
        console.log(commit)
        // let bool = false;
        //     for(var key in state.bu ycart){
        //         if(key==payload){
        //             state.buycart[key]++
        //             bool=true
        //         }
        //     }
        // if(!bool){
        //     state.buycart[payload]=1;
        // }
        state.buycart+=payload
        commit(types.TO_SAVE,state.buycart)  
    },
    toTip:({commit,state},payload)=>{
        state.buycart=payload
        commit(types.TO_SAVE,state.buycart)
    }
}