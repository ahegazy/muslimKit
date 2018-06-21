
module.exports = {
    data() {
        return {
            timezone: '',
            timings: {},
            isLoading: false,
            today: ''
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
                let data = this.PrayerTimes;
                this.timings = data.timings;
                this.today = data.date.gregorian.weekday.en + ' ' + data.date.readable + ' | ' + data.date.hijri.weekday.ar +' '+ data.date.hijri.day + ' ' + data.date.hijri.month.ar + ' ' + data.date.hijri.year;
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
                let data = this.PrayerTimes;
                this.timings = data.timings;
                this.today = data.date.readable;
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
        PrayerTimes: function(){
          return this.$store.getters.getPrayerTimes;
        }
      },
}
