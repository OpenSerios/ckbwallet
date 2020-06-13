const COLOR_SUCCESS = '#20C305'
const COLOR_WARNING = '#c39043'
const COLOR_ERROR = '#f13939'
let notif_id = 0

const notification_module = {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {

  },
  actions: {
    add(store, data) {
      const id = notif_id++
      // let color = data.color || NOTIF_COLOR;
      const type = data.type || 'success'
      const duration = data.duration || 5000
      let color = COLOR_SUCCESS

      switch (type) {
        case 'success':
          color = COLOR_SUCCESS
          break
        case 'error':
          color = COLOR_ERROR
          break
        case 'warning':
          color = COLOR_WARNING
          break
      }

      const item = {
        id: id,
        title: data.title,
        message: data.message,
        color: color,
        duration: 5000
      }

      setTimeout(() => {
        for (var i = 0; i < store.state.items.length; i++) {
          const item = store.state.items[i]
          if (item.id === id) {
            store.state.items.splice(i, 1)
          }
        }
      }, duration)
      store.state.items.push(item)
    }
  },
  getters: {

  }
}

export default notification_module
