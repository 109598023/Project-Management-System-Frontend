<template>
  <b-container>
    <b-row class="ml-0 mr-0 p-1">
      <b-button v-b-modal.modal-center>Add Project</b-button>
    </b-row>
    <b-row class="ml-0 mr-0 row-cols-xxl-6" cols="2" cols-sm="2" cols-md="3" cols-lg="4" cols-xl="5" >
      <b-col class="p-1 d-flex flex-column" v-for="card in cards" v-bind:key="card.id">
        <b-card class="flex-grow-1">
          <img class="img" v-bind:src="card.imgUrl" />
          <b-card-text>
            {{ card.name }}
          </b-card-text>
        </b-card>
        <b-button :href="card.url" variant="primary">View</b-button>
      </b-col>
    </b-row>
    <b-modal
      id="modal-center"
      centered
      title="Add Project"
      okVariant="success"
      okTitle="Add"
      :hideHeaderClose="true"
      size="lg"
      scrollable
      @ok="addProject"
    >
      <b-card>
        <b-form-group
          label="Name: "
          label-for="project-name-input"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input id="project-name-input" v-model="newProjectData.name"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Image URL: "
          label-for="project-image-url-input"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input id="image-url-input" v-model="newProjectData.imgUrl" type="url"></b-form-input>
        </b-form-group>
      </b-card>
      <b-card header="Repositorys" no-body>
        <b-card-body class="p-2">
          <b-form inline  class="py-1" v-for="(item, index) in newProjectData.repositorys" :key="index">
            <b-row class="m-0">
              <label for="type" class="px-2">Type: </label>
              <b-form-select
                id="type"
                v-model="item.type"
                :options="projectTypeSelect.options"
              />
            </b-row>
            <b-row class="m-0 flex-grow-1 px-1">
              <label for="url" class="px-2">URL: </label>
              <b-form-input id="url" type="url" class="flex-grow-1" v-model="item.url"/>
            </b-row>
            <b-avatar v-if="newProjectData.repositorys.length == 1" disabled variant="danger" size="sm"><font-awesome-icon icon="minus" /></b-avatar>
            <b-avatar v-else  button variant="danger" size="sm" @click="removeRepository(index)"><font-awesome-icon icon="minus" /></b-avatar>
          </b-form>
          <b-row align-h="end" class="m-0">
            <b-button variant="primary" @click="addRepository">Add Repositorys</b-button>
          </b-row>
        </b-card-body>
      </b-card>
    </b-modal>
  </b-container>
</template>
<script>
export default {
  name: 'Cards',
  data () {
    return {
      cards: [
        {
          id: 0,
          imgUrl: require('../../assets/image-regular.svg'),
          name: 'Project Management System',
          url: '/10/contributors_total'
        }
      ],
      projectTypeSelect: {
        options: [
          { text: 'Github', value: 'github' },
          { text: 'SonaQube', value: 'sonaqube' }
        ]
      },
      newProjectData: {
        name: '123',
        imgUrl: '435',
        repositorys: [{
          type: 'github',
          url: '7'
        }, {
          type: 'github',
          url: '7'
        }]
      }
    }
  },
  methods: {
    addCard () {
      let id = this.cards.length
      this.cards.push({
        id: id,
        imgUrl: require('../../assets/image-regular.svg'),
        name: 'Project',
        url: '#'
      })
    },
    addRepository () {
      this.newProjectData.repositorys.push({
        type: 'github',
        url: this.newProjectData.repositorys.length
      })
    },
    removeRepository (index) {
      this.newProjectData.repositorys.splice(index, 1)
    },
    addProject () {
      console.log(this.newProjectData)
      console.log(this.$api.view.project)
      this.$api.view.addProject(this.newProjectData).then((response) => {
        console.log(response)
        const element = {}
        element.imgUrl = require('../../assets/image-regular.svg')
        element.name = response.data.name
        element.url = `/${response.data.id}/contributors_total`
        this.cards.push(element)
      })
    }
  },
  created () {
    this.$api.view.queryProjectList({'username': 'test'}).then((response) => {
      response.data.forEach(element => {
        element.imgUrl = require('../../assets/image-regular.svg')
        element.url = `/${element.id}/contributors_total`
        this.cards.push(element)
      })
    })
  }
}
</script>
<style scoped>
/* .col {
  border: 1px solid rgba(86,61,124,.2)
}
*/
.img {
  width: 100%;
}
@media (min-width: 1440px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl {
    max-width: 1380px;
  }

  .row-cols-xxl-6 > * {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
}
</style>
