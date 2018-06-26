const viewAzkar = require('./viewAzkar');
const Counter = require('./Counter');
const prayerTimes = require('./prayerTimes');

module.exports = {
  data() {
    return {
      Counter : Counter,
      prayerTimes: prayerTimes,
      isLoading: false
    };
  },
  template: `
  <StackLayout orientation="vertical">
  <Button @tap="$navigateTo(Counter)" text="Tasbeeh" class="btn"/>
  <Button @tap="$navigateTo(prayerTimes)" text="prayer Times" class="btn"/>
    <Label text="Azkar list:" />
    <GridLayout :rows="isLoading ? '*' : '0'">
      <ActivityIndicator busy="true" />
      <Label text="Getting data ....." />
    </GridLayout>
    <ListView for="item in data.list" row="1" colSpan="1">
      <v-template>  
        <Button class="btn btn-primary" @tap="navigate(item)" :text="item.title"/>
      </v-template>
    </ListView>
    <Button id="update" @tap="updateList" text="Update list" class="btn btn-outline"/>
  </StackLayout>
`,//
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
        this.$navigateTo(viewAzkar,{
          context: {
              propsData: { 
                Azkar: this.$store.getters.getData[item.filename],
                  item: item
              }
          }
        });
        this.isLoading = false
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
  mounted() {
    this.isLoading = true;
    this.$store.dispatch('updateList').then(()=>{
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.getList();
    });
  }
};
