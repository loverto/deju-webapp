import localforage from 'localforage'

const getters = {
  token: state => state.user.token,
  product: state => state.product.curProd,
  curProd: () => {
    return localforage.getItem('curProd')
  },
  applyInfo: state => state.product.applyInfo,
  personInfo: state => state.product.personInfo,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  user: state => state.user.user,
  orders: state => state.order.list
}

export default getters
