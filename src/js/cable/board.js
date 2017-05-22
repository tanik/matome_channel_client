import { Cable } from './cable';

export default class BoardCable{
  constructor(board_id, dispatcher){
    this.board_id = board_id
    this.dispatcher = dispatcher
    this.subscribe()
  }

  subscribe(){
    let self = this
    this.cable = Cable.subscriptions.create("BoardChannel", {
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
    this.cable.perform("start_observe", {board_id: this.board_id})
  }
}
