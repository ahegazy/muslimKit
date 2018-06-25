const actionBar = require('./actionBar');

module.exports = {
  data() {
    return {
    };
  },
  props: ['item','Azkar'],
  computed: {
  },
  template: `
<Page>
  <actionBar :title="Azkar.title"/>
  <StackLayout orientation="vertical" class="stack">
    <Button id="update" @tap="resetRep" text="reset" class="btn btn-outline"/>
    <GridLayout>
      <ListView for="zekr in Azkar.content" @itemTap="countRep" row="1" colSpan="1">
        <v-template>  
          <Label class="list" textWrap="true">
            <FormattedString>
              <span :text="zekr.zekr"/>
              <span text="\n تكرار: "/>
              <span :text="zekr.repeat" fontWeight="Bold"/>
              <span text="\n"/>
              <span :text="zekr.bless" textDecoration="Underline"/>
              <span text="\n"/>
              </FormattedString>
          </Label>
        </v-template>
      </ListView>
    </GridLayout>
  </StackLayout>
</Page>
`,
  methods: {
    countRep: function(item){
      if (item.item.repeat > 0){ 
        this.Azkar.content[this.Azkar.content.indexOf(item.item)].repeat = item.item.repeat - 1;
      }
    },
    resetRep: function(){
      this.$store.dispatch('updateData',{
        fname : this.item.filename,
        url : this.item.url
      }).then(()=>{
        this.Azkar = this.$store.getters.getData[this.item.filename]
      })
    }
  },components: {
    actionBar
  }
};
