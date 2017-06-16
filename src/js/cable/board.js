import { Cable } from './cable';

export default class BoardCable{
  constructor(params, dispatcher){
    this.params = params
    this.dispatcher = dispatcher
    this.subscribe()
  }

  subscribe(){
    let self = this
    this.cable = Cable.subscriptions.create("BoardChannel", {
      connected() {
        if(self.params.board_id){
          self.startObserve()
        }else if(self.params.user_id){
          self.startObserveFavorites()
        }
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
    this.cable.perform("start_observe", {board_id: this.params.board_id})
  }

  startObserveFavorites(){
    this.cable.perform("start_observe_favorites", {user_id: this.params.user_id})
  }
}
