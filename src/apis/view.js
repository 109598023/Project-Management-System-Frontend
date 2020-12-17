import req from './https'

const view = {
  contributors (params) {
    return req('post', '/project_view/github/contributors', params)
  },
  addProject (params) {
    return req('post', '/project_view/add_project', params)
  },
  queryProjectList (params) {
    return req('post', '/project_view/query_project_list', params)
  },
  queryProject (params) {
    return req('post', '/project_view/query_project', params)
  }
}

export default view
