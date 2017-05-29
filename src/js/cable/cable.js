import ActionCable from 'actioncable'
export const Cable = ActionCable.createConsumer(APP_CONFIG.WS_URL)
