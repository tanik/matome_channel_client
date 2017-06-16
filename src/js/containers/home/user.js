import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import {
  getMypageInfomationsAsync,
  addCommentOnTimeline,
  addCommentImageOnTimeline,
  addCommentWebsiteOnTimeline,
  changeFavoriteCommentOnTimeline,
  getMoreCommentsAsync,
} from '../../actions/home/user'
import UserHome from '../../components/home/user'

function mapStateToProps(state) {
  return state.user_home
}

function mapDispatchToProps(dispatch) {
  return {
    getMypageInfomations: () => {
      dispatch(getMypageInfomationsAsync())
    },
    addComment: (comment) => {
      dispatch(addCommentOnTimeline(comment))
    },
    addCommentImage: (comment_image) => {
      dispatch(addCommentImageOnTimeline(comment_image))
    },
    addCommentWebsite: (comment_website) => {
      dispatch(addCommentWebsiteOnTimeline(comment_website))
    },
    changeFavoriteComment: (favorite) => {
      dispatch(changeFavoriteCommentOnTimeline(favorite))
    },
    getMoreComments: (lt_id) => {
      dispatch(getMoreCommentsAsync(lt_id))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome))
