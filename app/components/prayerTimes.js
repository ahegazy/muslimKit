
module.exports = {
    data() {
        return {
            isLoading: false,
        }
    },
    template: `
    <Page class="page">
        <ActionBar class="action-bar" title="Prayer Times"/>
        <StackLayout class="stack">
        <GridLayout :rows="isLoading ? '*' : '0'">
            <ActivityIndicator busy="true" />
            <Label text="Getting data ....." />
        </GridLayout>  
        <Button @tap="updatePrayerTime" text="update prayer times" class="btn btn-outline"/>
        <Label :text="today"/>
        <GridLayout :rows="(Object.keys(timings).length === 0) ? '0' : '*'">
            <Label class="list" textWrap="true">
            <FormattedString>
              <span text="Fajr: "/>
              <span :text="timings.Fajr"/>
              <span text="\n"/>
              <span text="Dhuhr: "/>
              <span :text="timings.Dhuhr"/>
              <span text="\n"/>
              <span text="Asr: "/>
              <span :text="timings.Asr"/>
              <span text="\n"/>
              <span text="Maghrib: "/>
              <span :text="timings.Maghrib"/>
              <span text="\n"/>
              <span text="Isha: "/>
              <span :text="timings.Isha"/>
              <span text="\n"/>
              </FormattedString>
          </Label>
         </GridLayout>  
        </StackLayout>
    </Page>
    `,
    methods: {
        getPrayersTime: function(){
            this.isLoading = true;
            this.$store
            .dispatch("getPrayerTimes")
            .then(() => {
                this.isLoading = false;
              })
            .catch(err => {
              this.isLoading = false
              alert(err)
            });
          },
          updatePrayerTime(){
            this.isLoading = true;
            this.$store.dispatch('updatePrayerTime').then((res) => {
                this.isLoading = false;
                alert(res)
            }).catch((err) => {
                this.isLoading = false;
                alert(err);
            });

          }
    },
    created () {
        this.getPrayersTime();
    },
    computed:{
        timings: function(){
            let data = this.$store.getters.getPrayerTimes;
            return (Object.keys(this.$store.getters.getPrayerTimes).length != 0) ? data.timings : {};
        },
        today: function(){
            let data = this.$store.getters.getPrayerTimes;
            return (Object.keys(this.$store.getters.getPrayerTimes).length != 0) ? data.date.gregorian.weekday.en + ' ' + data.date.readable + ' | ' + data.date.hijri.weekday.ar +' '+ data.date.hijri.day + ' ' + data.date.hijri.month.ar + ' ' + data.date.hijri.year : '';
        }
      },
}
