import { getOnlyKey } from '../utils'

const defaultCanvas = {
  // 页面样式
  style: {
    width: 320,
    height: 568,
    backgroundColor: '#ffffff',
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
    // 被选中的组件的下标
    this.selectedCmpIndex = null
    this.listeners = []
  }

  getCanvas = () => {
    return { ...this.canvas }
  }

  getCanvasCmps = () => {
    return [...this.canvas.cmps]
  }

  getSelectedCmpIndex = () => {
    return this.selectedCmpIndex
  }

  getSelectedCmp = () => {
    const cmps = this.getCanvasCmps()
    return cmps[this.selectedCmpIndex]
  }

  setSelectedCmpIndex = (index) => {
    if (this.selectedCmpIndex === index) return
    this.selectedCmpIndex = index
    this.updateApp()
  }

  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas)
    this.updateApp()
  }

  addCmp = (_cmp) => {
    // 更新画布数据
    const cmp = { key: getOnlyKey(), ..._cmp }
    // 选中新增的组件为选中组件
    this.selectedCmpIndex = this.canvas.cmps.length - 1
    this.canvas.cmps.push(cmp)
    console.log(this.canvas.cmps)
    // 组件更新
    this.updateApp()
  }

  updateSelectedCmp = (newStyle, newValue) => {
    const selectedCmp = this.getSelectedCmp()

    if (newStyle) {
      this.canvas.cmps[this.getSelectedCmpIndex()].style = {
        ...selectedCmp.style,
        ...newStyle,
      }
    }

    if (newValue !== undefined) {
      this.canvas.cmps[this.getSelectedCmpIndex()].value = newValue
    }

    //  更新组件
    this.updateApp()
  }

  updateCanvasStyle = (newStyle) => {
    this.canvas.style = {
      ...this.canvas.style,
      ...newStyle,
    }
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

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      getSelectedCmpIndex: this.getSelectedCmpIndex,
      getSelectedCmp: this.getSelectedCmp,
      setCanvas: this.setCanvas,
      setSelectedCmpIndex: this.setSelectedCmpIndex,
      updateSelectedCmp: this.updateSelectedCmp,
      subscribe: this.subscribe,
      updateCanvasStyle: this.updateCanvasStyle,
    }
    return obj
  }
}
