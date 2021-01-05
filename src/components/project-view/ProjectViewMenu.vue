<template>
  <div class="project-view-container d-flex">
    <sidebar-menu
      ref="sidebar-menu"
      :menu="menu"
      :collapsed="collapsed"
      :theme="selectedTheme"
      :show-one-child="true"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <span slot="toggle-icon"><font-awesome-icon icon="arrows-alt-h"/></span>
      <div slot="dropdown-icon"><font-awesome-icon icon="angle-right"/></div>
    </sidebar-menu>
    <div ref="page" class="flex-grow-1">
      <router-view />
    </div>
  </div>
</template>
<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  name: 'ProjectView',
  components: {
    SidebarMenu
  },
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Project',
          hiddenOnCollapse: true
        },
        {
          title: 'Profile',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: ['fas', 'file-alt']
            }
          },
          href: `/project/${this.$route.params.id}/profile`
        },
        {
          title: 'Edit Profile',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: ['fas', 'edit']
            }
          },
          href: `/project/${this.$route.params.id}/edit_profile`
        },
        {
          title: 'Members',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: ['fas', 'users']
            }
          },
          href: `/project/${this.$route.params.id}/members`
        }
      ],
      collapsed: false,
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: 'Default-theme',
      isOnMobile: false
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    this.$api.view.queryProject({
      'id': this.$route.params.id,
      'username': this.$store.state.auth.username
    }).then((response) => {
      this.addRepositoryMenu(response.data.repositories)
    })
  },
  methods: {
    onToggleCollapse (collapsed) {
      this.collapsed = collapsed
    },
    onItemClick (event, item, node) {
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    },
    addRepositoryMenu (repositories) {
      const containGithubType = repositories.some((r) => {
        return r.type === 'Github'
      })
      const containSonarQubeType = repositories.some((r) => {
        return r.type === 'SonarQube'
      })
      const repositoriesMenu = {
        title: 'Repositories',
        icon: {
          element: 'font-awesome-icon',
          attributes: {
            icon: ['fas', 'folder']
          }
        }
      }
      const child = []
      if (containGithubType) {
        child.push(this.addGithubMenuChild(repositories))
      }
      if (containSonarQubeType) {
        if (containGithubType) {
          child.push({ component: separator })
        }
        child.push(this.addSonarQubeMenuChild(repositories))
      }
      repositoriesMenu.child = child
      this.menu.push(repositoriesMenu)
    },
    addGithubMenuChild (repositories) {
      const child = []
      const githubMenuChild = {
        title: 'Github',
        child: child
      }
      repositories.forEach((r) => {
        if (r.type === 'Github') {
          child.push({
            title: r.name,
            child: [
              {
                title: 'Contributors Total',
                href: `/project/${this.$route.params.id}/github/${r.repositoryId}/contributors_total`
              },
              {
                title: 'Contributors',
                href: `/project/${this.$route.params.id}/github/${r.repositoryId}/contributors`,
                alias: /\/project\/\d+\/github\/\d+\/contributors#\d+/
              },
              {
                title: 'Punch Card',
                href: `/project/${this.$route.params.id}/github/${r.repositoryId}/punch_card`
              },
              {
                title: 'Issue',
                href: `/project/${this.$route.params.id}/github/${r.repositoryId}/issue`
              }
            ]
          })
        }
      })
      return githubMenuChild
    },
    addSonarQubeMenuChild (repositories) {
      const child = []
      const sonarQubeMenuChild = {
        title: 'SonarQube',
        child: child
      }
      repositories.forEach((r) => {
        if (r.type === 'SonarQube') {
          child.push({
            title: r.name,
            href: `/project/${this.$route.params.id}/sonarqube/${r.repositoryId}/measures`
          })
        }
      })
      return sonarQubeMenuChild
    }
  },
  watch: {
    collapsed: function (newCollapsed, oldCollapsed) {
      if (newCollapsed) {
        this.$refs['sidebar-menu'].$el.style['flex'] = '0 0 50px'
        this.$refs['page'].className = 'page2'
      } else {
        this.$refs['sidebar-menu'].$el.style['flex'] = '0 0 250px'
        this.$refs['page'].className = 'page'
      }
    }
  }
}
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 2px;">`
}
</script>
<style scoped>
.v-sidebar-menu {
  flex: 0 0 250px;
  position: relative;
}
.project-view-container {
  height: 100%;
  width: 100vw;
  position: relative;
}
.page {
  width: calc(100vw - 250px);
}
.page2 {
  width: calc(100vw - 50px);
}
@media (max-width: 768px) {
  .page, .page2 {
    width: calc(100vw - 50px);
  }
}
</style>
