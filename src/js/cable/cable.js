import ActionCable from 'actioncable'
export const Cable = ActionCable.createConsumer("ws://localhost:3000/cable")
