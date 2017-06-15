import { Cable } from './cable';

export default class UserCable{
  constructor(user_id, dispatcher){
    this.user_id = user_id
    this.dispatcher = dispatcher
    this.subscribe()
  }

  subscribe(){
    let self = this
    this.cable = Cable.subscriptions.create("UserChannel", {
      connected() {
        self.startObserve()
      },

      disconnected() {
      },

      received(data) {
        self.dispatcher(data)
      },
    })
  }

  unsubscribe(){
    this.cable.unsubscribe()
  }

  startObserve(){
    this.cable.perform("start_observe", {user_id: this.user_id})
  }
}
