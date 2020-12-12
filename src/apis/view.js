import req from './https'

const view = {
  contributors (params) {
    return req('post', '/project_view/github/contributors', params)
  }
}

export default view
