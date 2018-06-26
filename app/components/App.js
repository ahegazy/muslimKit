const AzkarMain = require('./AzkarMain');
const actionBar = require('./actionBar');

module.exports = {
  template: `
    <Page class="page" >    
      <actionBar title="Muslim Kit"/>
      <AzkarMain />
    </Page>
  `,
  components: {
    AzkarMain,actionBar
  },
  mounted(){
    this.$store.dispatch('checkIfnewest').then(res=>{
      if(res){
        let info = this.$store.getters.getNewestVer;
        confirm({
          title: "Update Available",
          message: "There is a new version available v"+ info.CurrentVersion +", Do you want to download it?",
          okButtonText: "Ok",
          cancelButtonText: "Not now"
        }).then(result => {
          if(result){
            this.$utility.openUrl(info.url);
          }
      });
    }
    });
  }
};
