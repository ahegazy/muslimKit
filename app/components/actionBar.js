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
        <ActionItem @tap="shareApp"
        ios.systemIcon="9" ios.position="left"
        android.systemIcon="ic_menu_share" android.position="actionBar" />
    </ActionBar>
  `,methods: {
    checkforUpdate: function(){
      this.$store.dispatch('checkforUpdate').then((res)=>{
        this.AlertUpdate(res ? this.$store.getters.getNewestVer : res)
      }).catch(err => {
          alert(err);
      })  
    },
    AlertUpdate(info){
      if(info){
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
      }else {
          alert('You are on the latest version.');
      }
    },
    shareApp: function(){
      this.$SocialShare.shareUrl(this.$store.getters.getNewestVer.url || "https://ahegazy.github.io/muslimKit", "Muslim Kit, Provides mulsim with daily Azkar and prayerTimes.");
    }
  }
};
