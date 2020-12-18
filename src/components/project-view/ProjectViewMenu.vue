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
          header: true,
          title: 'Project Repository',
          hiddenOnCollapse: true
        },
        {
          title: 'Github',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: ['fab', 'github']
            }
          },
          child: [
            {
              href: `/project/${this.$route.params.id}/contributors_total`,
              title: 'page'
            },
            {
              href: `/project/${this.$route.params.id}/contributors`,
              title: 'page2'
            },
            {
              title: 'page3'
            },
            {
              title: 'page4'
            }
          ]
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
    console.log(this.$route.params)
    this.onResize()
    window.addEventListener('resize', this.onResize)
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
