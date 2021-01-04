import req from './https'

const view = {
  contributors (params) {
    return req('post', '/project_view/github/contributors', params)
  },
  contributorsTotal (params) {
    return req('post', '/project_view/github/contributors_total', params)
  },
  addProject (params) {
    return req('post', '/project_view/add_project', params)
  },
  queryProjectList (params) {
    return req('post', '/project_view/query_project_list', params)
  },
  queryProject (params) {
    return req('post', '/project_view/query_project', params)
  },
  updateProject (params) {
    return req('post', '/project_view/update_project', params)
  },
  checkPermission (params) {
    return req('post', '/project_view/check_permission', params)
  },
  queryProjectRoles (params) {
    return req('post', '/project_view/query_project_roles', params)
  },
  inviteMembers (params) {
    return req('post', '/project_view/invite_members', params)
  },
  queryMeasures (params) {
    return req('post', '/project_view/sonar_qube/query_measures', params)
  },
  queryPunchCard (params) {
    return req('post', '/project_view/github/punch_card', params)
  },
  validateProjectUrl (params) {
    return req('post', '/project_view/validate_project_url', params)
  },
  queryIssue (params) {
    return req('post', '/project_view/github/Issue', params)
  }
}

export default view
