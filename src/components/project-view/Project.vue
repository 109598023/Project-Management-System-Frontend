<template>
  <b-container>
    <b-row class="ml-0 mr-0 p-1">
      <b-button v-b-modal.modal-center @click="setDefaultProjectData">Add Project</b-button>
    </b-row>
    <b-row class="ml-0 mr-0 row-cols-xxl-6" cols="2" cols-sm="2" cols-md="3" cols-lg="4" cols-xl="5" >
      <b-col class="p-1 d-flex flex-column" v-for="card in cards" v-bind:key="card.id">
        <b-card class="flex-grow-1">
          <img v-if="card.imgUrl!=''" class="img" v-bind:src="card.imgUrl" alt="" />
          <font-awesome-icon v-else class="img" :icon="['far', 'image']" />
          <b-card-text>
            {{ card.name }}
          </b-card-text>
        </b-card>
        <b-button :to="card.url" variant="primary">View</b-button>
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
      :ok-disabled="addProjectOkDisabled"
      @ok="addProject"
    >
      <b-card>
        <b-form-group
          label="Name: "
          label-for="project-name-input"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input id="project-name-input" v-model="newProjectData.name" :state="nameInputState" @update="nameInput"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Image URL: "
          label-for="project-image-url-input"
          label-cols-sm="3"
          label-align-sm="right"
          v-show="false"
        >
          <b-form-input id="image-url-input" v-model="newProjectData.imgUrl" type="url"></b-form-input>
        </b-form-group>
      </b-card>
      <b-card header="Repositories" no-body>
        <b-card-body class="p-2">
          <b-form inline  class="py-1" v-for="(item, index) in newProjectData.repositories" :key="index">
            <b-row class="m-0 flex-grow-1 px-1">
              <label for="url" class="px-2">URL: </label>
              <b-form-input id="url" type="url" class="flex-grow-1" v-model="item.url" :state="item.state" @update="isValidRepository(item)"/>
            </b-row>
            <b-avatar v-if="newProjectData.repositories.length == 1" disabled variant="danger" size="sm"><font-awesome-icon icon="minus" /></b-avatar>
            <b-avatar v-else  button variant="danger" size="sm" @click="removeRepository(index)"><font-awesome-icon icon="minus" /></b-avatar>
          </b-form>
          <b-row align-h="end" class="m-0">
            <b-button variant="primary" @click="addRepository">Add Repositories</b-button>
          </b-row>
        </b-card-body>
      </b-card>
    </b-modal>
  </b-container>
</template>
<script>
export default {
  name: 'Project',
  data () {
    return {
      cards: [
      ],
      nameInputState: false,
      newProjectData: {
        name: '',
        imgUrl: '',
        repositories: [{
          url: '',
          state: false
        }]
      },
      addProjectOkDisabled: true
    }
  },
  methods: {
    nameInput () {
      this.nameInputState = this.newProjectData.name !== ''
      this.changeOkDisabled()
    },
    setDefaultProjectData () {
      this.nameInputState = false
      this.newProjectData = {
        name: '',
        imgUrl: '',
        repositories: [{
          url: '',
          state: false
        }]
      }
    },
    addCard () {
      let id = this.cards.length
      this.cards.push({
        id: id,
        imgUrl: '',
        name: 'Project',
        url: '#'
      })
    },
    addRepository () {
      this.newProjectData.repositories.push({
        url: '',
        state: false
      })
      this.changeOkDisabled()
    },
    removeRepository (index) {
      this.newProjectData.repositories.splice(index, 1)
      this.changeOkDisabled()
    },
    addProject () {
      this.$api.view.addProject({
        'name': this.newProjectData.name,
        'imgUrl': this.newProjectData.imgUrl,
        'repositories': this.newProjectData.repositories,
        'username': this.$store.state.auth.username
      }).then((response) => {
        const element = {}
        element.imgUrl = ''
        element.name = response.data.name
        element.url = `/project/${response.data.id}/contributors_total`
        this.cards.push(element)
      })
    },
    isValidRepository (repository) {
      console.log(repository)
      this.$api.view.validateProjectUrl({
        'url': repository.url
      }).then((response) => {
        repository.state = response.data
        this.changeOkDisabled()
      })
    },
    changeOkDisabled () {
      let invalid = this.newProjectData.repositories.some((r) => {
        return !r.state
      })
      this.addProjectOkDisabled = invalid || !this.nameInputState
    }
  },
  created () {
    this.$api.view.queryProjectList({
      'username': this.$store.state.auth.username
    }).then((response) => {
      response.data.forEach(element => {
        element.imgUrl = ''
        element.url = `/project/${element.id}/profile`
        this.cards.push(element)
      })
    })
  }
}
</script>
<style scoped>
.img {
  width: 100%;
  height: auto;
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
