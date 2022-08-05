import { getOnlyKey } from '../utils'

const defaultCanvas = {
  // 页面样式
  style: {
    width: 320,
    height: 568,
    backgroundColor: '#ffffff00',
    backgroundImage: '',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'content-box',
  },
  // 组件
  cmps: [],
}

export default class Canvas {
  constructor(_canvas = defaultCanvas) {
    // 页面数据
    this.canvas = _canvas
    this.listeners = []
  }

  getCanvas = () => {
    return { ...this.canvas }
  }

  addCmp = (_cmp) => {
    // 更新画布数据
    const cmp = { key: getOnlyKey(), ..._cmp }
    this.canvas.cmps.push(_cmp)
    console.log(this.canvas.cmps)

    // 组件更新
    this.updateApp()
  }
  updateApp = () => {
    this.listeners.forEach((lis) => lis())
  }

  subscribe = (listener) => {
    this.listeners.push(listener)
    // 取消时间
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener)
    }
  }

  getCanvasCmps = () => {
    return [...this.canvas.cmps]
  }

  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas)
  }

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      subscribe: this.subscribe,
    }
    return obj
  }
}
