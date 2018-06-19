const AzkarMain = require('./AzkarMain');

module.exports = {
  data() {
    return {
      surprise: false,
    };
  },
  template: `
    <Page class="page" >
  <ActionBar class="action-bar" title="Muslim Kit"/>

        <AzkarMain />
    </Page>
  `,
  components: {
    AzkarMain,
  },
};
