const viewAzkar = require('./viewAzkar');
const Vue = require('nativescript-vue');

module.exports = {
  data() {
    return {
 //       data: {},
        isLoading: false
    };
  },
  template: `
  <StackLayout orientation="vertical">
    <GridLayout :rows="isLoading ? '*' : '0'">
      <ActivityIndicator busy="true" />
      <Label text="Getting data ....." />
    </GridLayout>
    <ListView for="item in data.list" row="1" colSpan="1">
      <v-template>  
        <Button class="btn btn-primary" @tap="navigate(item)" :text="item.title"/>
      </v-template>
    </ListView>
    <Button id="update" @tap="updateList" text="Update" class="btn btn-outline"/>
  </StackLayout>
`,
  methods: {
    getList: function (){
      this.isLoading = true;
      this.$store
      .dispatch("getList")
      .then(() => {
         this.isLoading = false;
        })
      .catch(err => {
        this.isLoading = false
        alert(err)
      });
    },
    navigate: function(item){
      this.isLoading = true
      this.$store.dispatch('updateData',{
        fname : item.filename,
        url : item.url
      }).then(()=>{
        this.isLoading = false
        this.$navigateTo(viewAzkar,{
          context: {
              propsData: { 
                Azkar: this.$store.getters.getData[item.filename],
                  item: item
              }
          }
        });
      }).catch((err) => {
        this.isLoading = false
        alert(err)
      })
    },
    updateList: function(){
      this.isLoading = true;
      this.$store.dispatch('updateList').then(()=>{
        this.isLoading = false;
        alert('updated');
      }).catch(err => {
        this.isLoading = false;
        alert(err)
      });

    }

  },
  computed:{
    data: function(){
      return this.$store.getters.getData;
    }
  },
  components: {

  },
  mounted() {
    this.getList();
  }
};
