const actionBar = require('./actionBar');

module.exports = {
    data() {
        return {
            count: 0
        }
    },
    template: `
    <Page class="page">
        <actionBar title="Tasbeeh Counter"/>
        <StackLayout class="stack">
            <Button id="update" @tap="count = 0" text="reset" class="btn btn-outline"/>
            <Label :text="count" id="count" @tap="count++" />
        </StackLayout>
    </Page>
    `,components: {
        actionBar
    }
}