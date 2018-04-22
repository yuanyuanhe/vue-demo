import home from './components/home'
import category from './components/category'
import cart from './components/cart'
import user from './components/user'
import login from './components/login'
import register from './components/register'
import hotgoods from './components/hotgoods'
import newgoods from './components/newgoods'
import disgoods from './components/disgoods'
import goodname from './components/goodname'
import product from './components/product'

var routes = [
    {
        path:'/home',
        component:home,
        children:[
            {path:'hotgoods',component:hotgoods},
            {path:'newgoods',component:newgoods},
            {path:'disgoods',component:disgoods},
            {path:'/',component:hotgoods}
            
        ]
    },
    {
        
        path:'/category',
        component:category,
        children:[
            {name:'goodname',path:'goodname/:uid',component:goodname},
            {path:"/",component:goodname}
        ]
    },
    {path:'/cart',component:cart},
    {path:'/user',component:user},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/',component:home},
    {name:'product',path:'/product',component:product}
    
    
]

export default {
    routes:routes,
    mode:'history'    
}