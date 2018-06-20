module.exports = {
    data() {
        return {
            count: 0
        }
    },
    template: `
    <Page class="page">
        <ActionBar class="action-bar" title="Tasbeeh Counter"/>
        <StackLayout class="stack">
            <Button id="update" @tap="count = 0" text="reset" class="btn btn-outline"/>
            <Label :text="count" id="count" @tap="count++" />
        </StackLayout>
    </Page>
    `,
    methods: {

    }
}