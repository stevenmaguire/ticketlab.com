(function (Vue, _) {

    new Vue({
        el: 'body',

        data: function () {
            return {
                isSuccess: false,
                errors: {
                    errors: {},
                    hasErrors: function () {
                        return ! _.isEmpty(this.errors);
                    },
                    has: function (field) {
                        return _.indexOf(_.keys(this.errors), field) > -1;
                    },
                    all: function () {
                        return this.errors;
                    },
                    flatten: function () {
                        return _.flatten(_.toArray(this.errors));
                    },
                    get: function (field) {
                        if (this.has(field)) {
                            return this.errors[field][0];
                        }
                    },
                    set: function (errors) {
                        if (typeof errors === 'object') {
                            this.errors = errors;
                        } else {
                            this.errors = {'field': ['Something went wrong. Please try again.']};
                        }
                    },
                    forget: function () {
                        this.errors = {};
                    },
                },
                form: {
                    email: '',
                    validate: {
                        'email':'required|email',
                    },
                }
            };
        },

        methods: {
            handle: function (event) {
                var self = this;
                event.preventDefault();
                this.isSuccess = false;
                this.errors.forget();
                this.$http.post('https://collector.stevil.co/api/properties/83b22cf8-4d71-4c5c-9d33-51087059c017/snapshots', this.form)
                    .then(function (response) {
                        self.isSuccess = true;
                    }, function(err) {
                        if (err.status == 422) {
                            self.errors.set(err.data);
                        } else {
                            console.log(err);
                        }
                    });
            }
        },

    })

})(Vue, _)
