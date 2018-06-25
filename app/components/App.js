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
  }
};
