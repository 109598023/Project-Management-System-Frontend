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
  name: 'ProjectView2',
  components: {
    SidebarMenu
  },
  data () {
    return {
      menu: [
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
              href: '/contributors',
              title: 'page'
            },
            {
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
        this.$refs['sidebar-menu'].$el.style['flex'] = '0 0 350px'
        this.$refs['page'].className = 'page'
      }
    }
  }
}
</script>
<style scoped>
.v-sidebar-menu {
  /* top: 4rem;
  height: calc(100vh - 4rem); */
  flex: 0 0 350px;
  position: relative;
}
.project-view-container {
  height: 100%;
  width: 100vw;
  position: relative;
}
.page {
  width: calc(100vw - 350px);
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
