module.exports = {
  data() {
    return {
    };
  },props: ['title'],
  template: `    
    <ActionBar :title="title">
      <ActionItem @tap="checkforUpdate(false)"
        ios.systemIcon="16" ios.position="right"
        text="check For updates" android.position="popup" />
    </ActionBar>
  `,methods: {
    checkforUpdate: function(){
      this.$store.dispatch('checkforUpdate').then((res)=>{
        if(res){
          confirm({
            title: "Update Available",
            message: "There is a new version available v"+ res.CurrentVersion +", Do you want to download it?",
            okButtonText: "Ok",
            cancelButtonText: "Not now"
          }).then(result => {
            console.log(result);
            if(result){
              this.$utility.openUrl(res.url);
            }
          });
        }else {
            alert('You are on the latest version.');
        }
      }).catch(err => {
          alert(err);
      })  
    }
  }
};
